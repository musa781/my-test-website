// app/products/page.js

import ProductSearch from "@/components/ProductSearch";
import NewsletterForm from "@/components/NewsletterForm";
import connectToDatabase from "@/lib/mongodb"; // 👈 Naya Import: MongoDB Connection
import Pledge from "@/models/Pledge"; // 👈 Naya Import: Pledge Model

export default async function ShopifyProducts() {
  // 1. GraphQL Query: Hum Next.js ko bata rahe hain ke humein kya kya chahiye
  // 🌟 NAYA CODE: GraphQL Query mein "addOns" ka izafa kiya gaya hai 🌟
  const query = `
    {
      products(first: 9) {
        edges {
          node {
            id
            title
            description
            variants(first: 3) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
      addOns: products(first: 3, query: "tag:addon") {
        edges {
          node {
            id
            title
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  // 2. Fetch Request: Shopify API ko call lagana
  const res = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
    {
      method: "POST", // GraphQL requests hamesha POST hoti hain
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query }), // Query ko body mein bhej diya
      next: { revalidate: 60 }, // Next.js is data ko 60 seconds tak cache karega
    },
  );

  // 3. Response ko JSON mein convert karna
  const json = await res.json();
  // 🛑 DEBUGGING: Agar Shopify ne data ke bajaye error bheja hai
  if (!json.data || json.errors) {
    return (
      <div className="p-20 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Shopify API Error 🛑
        </h1>
        <p className="mb-4">
          Shopify ne products bhejney se inkaar kar diya. Wajah ye hai:
        </p>
        <pre className="bg-red-50 p-6 rounded-lg border border-red-200 text-red-800 overflow-x-auto">
          {JSON.stringify(json, null, 2)}
        </pre>
      </div>
    );
  }

  const products = json.data.products.edges;
  const addOnsList = json.data.addOns ? json.data.addOns.edges : []; // 👈 YEH LINE ADD KAREIN

  // 🌟 NAYA CODE: MONGODB SE PLEDGES COUNT KARNA 🌟
  await connectToDatabase();

  // Aggregate use kar ke har product ke total pledges nikal rahe hain
  const pledgeData = await Pledge.aggregate([
    { $group: { _id: "$productTitle", count: { $sum: 1 } } },
  ]);

  // Data ko asaan format mein convert kar rahe hain (e.g., { "The Draft Snowboard": 5 })
  const pledgeCounts = {};
  pledgeData.forEach((item) => {
    // Webhook mein naam "Pledge Deposit: The Draft Snowboard" tha,
    // hum "Pledge Deposit: " hata rahe hain taake Shopify product title se exactly match ho jaye.
    const cleanTitle = item._id.replace("Pledge Deposit: ", "").trim();
    pledgeCounts[cleanTitle] = item.count;
  });
  // 🌟 ---------------------------------------- 🌟

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-sans text-gray-100 py-20 px-6 sm:px-12">
      {/* Animated Background Blobs for that "Impressive Mesh Gradient" look */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full bg-purple-600/40 blur-[120px] pointer-events-none animate-pulse"></div>
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] rounded-full bg-rose-600/40 blur-[120px] pointer-events-none animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-[20%] right-[10%] w-80 h-80 rounded-full bg-amber-500/30 blur-[120px] pointer-events-none animate-pulse"
        style={{ animationDelay: "4s" }}
      ></div>
      <div
        className="absolute bottom-[20%] left-[10%] w-72 h-72 rounded-full bg-teal-500/30 blur-[120px] pointer-events-none animate-pulse"
        style={{ animationDelay: "6s" }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent mb-8 text-sm font-medium text-rose-300">
            <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping absolute"></span>
            <span className="flex h-2.5 w-2.5 rounded-full bg-rose-400 relative"></span>
            Live from Shopify
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-400 to-fuchsia-600 mb-8 tracking-tighter drop-shadow-lg">
            My Live Shopify Store{" "}
            <span className="inline-block hover:scale-110 hover:rotate-12 transition-transform duration-300">
              🛍️
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            Experience our premium collection with a breathtaking new design.
            Powered by Next.js and the Shopify Storefront API.
          </p>
        </div>

        {/* 🌟 YAHAN HUMNE NAYA 'pledgeCounts' PROP PASS KIYA HAI 🌟 */}
        <ProductSearch
          initialProducts={products}
          pledgeCounts={pledgeCounts}
          addOnsList={addOnsList}
        />

        <NewsletterForm />
      </div>
    </div>
  );
}
