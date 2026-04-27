// app/products/page.js

export default async function ShopifyProducts() {
  
  // 1. GraphQL Query: Hum Next.js ko bata rahe hain ke humein kya kya chahiye
  const query = `
    {
      products(first: 6) {
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
    }
  `;
  

  // 2. Fetch Request: Shopify API ko call lagana
  const res = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`, {
    method: 'POST', // GraphQL requests hamesha POST hoti hain
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query }), // Query ko body mein bhej diya
    next: { revalidate: 60 } // Next.js is data ko 60 seconds tak cache karega
  });

  // 3. Response ko JSON mein convert karna
  const json = await res.json();
  // 🛑 DEBUGGING: Agar Shopify ne data ke bajaye error bheja hai
  if (!json.data || json.errors) {
    return (
      <div className="p-20 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Shopify API Error 🛑</h1>
        <p className="mb-4">Shopify ne products bhejney se inkaar kar diya. Wajah ye hai:</p>
        <pre className="bg-red-50 p-6 rounded-lg border border-red-200 text-red-800 overflow-x-auto">
          {JSON.stringify(json, null, 2)}
        </pre>
      </div>
    );
  }


  const products = json.data.products.edges;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-sans text-gray-100 py-20 px-6 sm:px-12">
      {/* Animated Background Blobs for that "Impressive Mesh Gradient" look */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full bg-purple-600/40 blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] rounded-full bg-rose-600/40 blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[20%] right-[10%] w-80 h-80 rounded-full bg-amber-500/30 blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '4s' }}></div>
      <div className="absolute bottom-[20%] left-[10%] w-72 h-72 rounded-full bg-teal-500/30 blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '6s' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-transparent mb-8 text-sm font-medium text-rose-300">
            <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping absolute"></span>
            <span className="flex h-2.5 w-2.5 rounded-full bg-rose-400 relative"></span>
            Live from Shopify
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-400 to-fuchsia-600 mb-8 tracking-tighter drop-shadow-lg">
            My Shopify Store <span className="inline-block hover:scale-110 hover:rotate-12 transition-transform duration-300">🛍️</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            Experience our premium collection with a breathtaking new design. Powered by Next.js and the Shopify Storefront API.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Products ko map kar rahe hain */}
          {products.map(({ node: product }) => (
            <div 
              key={product.id} 
              className="group relative bg-transparent p-8 rounded-[2rem] hover:bg-white/5 transition-all duration-500 hover:-translate-y-3 overflow-hidden flex flex-col justify-between"
            >
              {/* Glossy overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-rose-300 transition-colors duration-300 drop-shadow-sm">
                  {product.title}
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed mb-8 line-clamp-3 font-light">
                  {product.description}
                </p>
              </div>
              
              <div className="mt-auto relative z-10">
                <h3 className="text-xs font-semibold text-rose-200 uppercase tracking-[0.25em] mb-5">
                  Available Variants
                </h3>
                <div className="flex flex-col gap-3">
                  {/* Har product ke Variants (Sizes/Colors) ko map kar rahe hain */}
                  {product.variants.edges.map(({ node: variant }) => (
                    <div 
                      key={variant.id} 
                      className="bg-transparent p-4 rounded-2xl flex justify-between items-center hover:bg-white/5 transition-all duration-300 cursor-default group/variant"
                    >
                      <span className="text-sm font-medium text-gray-200 group-hover/variant:text-white transition-colors">
                        {variant.title}
                      </span>
                      <div className="flex items-baseline gap-1.5 bg-gradient-to-r from-rose-500/20 to-fuchsia-500/20 px-4 py-2 rounded-xl shadow-inner">
                        <span className="text-xs text-rose-300 font-bold">{variant.price.currencyCode}</span>
                        <span className="text-base font-extrabold text-white">{variant.price.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}