// app/api/checkout/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { items } = body; // items array received from frontend

    // 1. Check karein ke cart mein koi Pledge Mode ka item hai ya nahi?
    const hasPledgeItems = items.some(item => item.mode === "Pledge Mode");

    // ==========================================================
    // FLOW A: PLEDGE MODE (Uses Admin API -> Draft Order)
    // ==========================================================
    if (hasPledgeItems) {
      const draftLineItems = items.map((item) => {
        const isPledge = item.mode === "Pledge Mode";
        
        if (isPledge) {
          // BUG FIX: variantId hata diya taake Shopify price ko override na kare
          return {
            title: `Pledge Deposit: ${item.title}`, // Checkout par naam show hoga
            originalUnitPrice: "2.00",             // Ab exact $2 hi charge hoga!
            quantity: item.quantity,
            customAttributes: [
              { key: "_isPledge", value: "true" },
              { key: "_originalVariantId", value: item.id } // Webhook ke liye chupke se ID bhej di
            ]
          };
        } else {
          // Agar ghalti se koi full price item bhi sath hua toh wo normally jayega
          return {
            variantId: item.id,
            quantity: item.quantity
          };
        }
      });

      const draftQuery = `
        mutation draftOrderCreate($input: DraftOrderInput!) {
          draftOrderCreate(input: $input) {
            draftOrder {
              invoiceUrl
              id
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const draftVariables = {
        input: {
          lineItems: draftLineItems,
          tags: ["PLEDGE-ORDER"], // Future reference/Webhooks ke liye tag
        }
      };

      const adminRes = await fetch(
        `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/graphql.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // WARNING: Storefront token yahan kaam nahi karega, Admin token chahiye!
            "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_ACCESS_TOKEN, 
          },
          body: JSON.stringify({ query: draftQuery, variables: draftVariables }),
        }
      );

      const adminJson = await adminRes.json();

      // 1. NAYA CHECK: Top-Level Errors (Agar Token masla kare ya ID format ghalat ho)
      if (adminJson.errors) {
        console.error("🚨 SHOPIFY TOP-LEVEL ERROR:", JSON.stringify(adminJson.errors, null, 2));
        return NextResponse.json({ error: "Shopify rejected the request (Check Terminal)" }, { status: 400 });
      }

      // 2. PURANA CHECK: User Errors (Agar quantity waghera ka masla ho)
      if (adminJson.data?.draftOrderCreate?.userErrors?.length > 0) {
        console.error("🚨 DRAFT ORDER USER ERRORS:", JSON.stringify(adminJson.data.draftOrderCreate.userErrors, null, 2));
        return NextResponse.json({ error: "Draft Order create nahi ho saka" }, { status: 400 });
      }

      // 3. NAYA CHECK: Agar kisi aur wajah se draftOrder null ho jaye
      if (!adminJson.data?.draftOrderCreate?.draftOrder) {
         console.error("🚨 UNKNOWN ERROR: Draft order is null.", JSON.stringify(adminJson, null, 2));
         return NextResponse.json({ error: "Draft order null return hua" }, { status: 400 });
      }

      // Success: User ko payment invoice ka secure link bhej do
      const checkoutUrl = adminJson.data.draftOrderCreate.draftOrder.invoiceUrl;
      return NextResponse.json({ checkoutUrl }, { status: 200 });
    }

    // ==========================================================
    // FLOW B: FULL PRICE MODE (Uses Storefront API)
    // ==========================================================
    else {
      const lineItems = items.map((item) => ({
        merchandiseId: item.id,
        quantity: item.quantity, // BUG FIX
      }));

      const storefrontQuery = `
        mutation cartCreate($input: CartInput) {
          cartCreate(input: $input) {
            cart {
              checkoutUrl
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const storefrontVariables = {
        input: {
          lines: lineItems,
        }
      };

      const storefrontRes = await fetch(
        `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
          },
          body: JSON.stringify({ query: storefrontQuery, variables: storefrontVariables }),
        }
      );

      const storefrontJson = await storefrontRes.json();

      if (storefrontJson.data?.cartCreate?.userErrors?.length > 0) {
        console.error("Shopify Errors:", storefrontJson.data.cartCreate.userErrors);
        return NextResponse.json({ error: "Checkout create nahi ho saka" }, { status: 400 });
      }

      const checkoutUrl = storefrontJson.data.cartCreate.cart.checkoutUrl;
      return NextResponse.json({ checkoutUrl }, { status: 200 });
    }

  } catch (error) {
    console.error("Checkout API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}