// app/api/checkout/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { items } = body;

    // 1. Frontend ke items ko Shopify ke format (merchandiseId) mein badalna
    const lineItems = items.map((item) => ({
      merchandiseId: item.id,
      quantity: item.qty,
    }));

    // 2. The GraphQL Mutation (cartCreate)
    const query = `
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

    const variables = {
      input: {
        lines: lineItems,
      }
    };

    // 3. Shopify Storefront API ko Request Bhejna
    const shopifyRes = await fetch(
      `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        },
        body: JSON.stringify({ query, variables }),
      }
    );

    const json = await shopifyRes.json();

    if (json.data.cartCreate.userErrors.length > 0) {
      console.error("Shopify Errors:", json.data.cartCreate.userErrors);
      return NextResponse.json({ error: "Checkout create nahi ho saka" }, { status: 400 });
    }

    // 4. Success: Shopify ne jo secure URL diya hai, wo frontend ko wapis bhej do
    const checkoutUrl = json.data.cartCreate.cart.checkoutUrl;
    return NextResponse.json({ checkoutUrl }, { status: 200 });

  } catch (error) {
    console.error("Checkout API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}