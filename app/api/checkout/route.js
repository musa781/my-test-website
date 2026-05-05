// app/api/checkout/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { items } = body;

    const hasPledgeItems = items.some((item) => item.mode === "Pledge Mode");

    // ==========================================================
    // FLOW A: PLEDGE MODE (Uses Admin API -> Draft Order)
    // ==========================================================
    if (hasPledgeItems) {
      const draftLineItems = [];

      items.forEach((item) => {
        // 1. Main Product ko list mein daalein
        if (item.mode === "Pledge Mode") {
          draftLineItems.push({
            title: `Pledge Deposit: ${item.title}`,
            originalUnitPrice: "2.00", // 👈 $2 yahan strictly enforce ho raha hai!
            quantity: item.qty || 1,
            customAttributes: [
              { key: "_isPledge", value: "true" },
              { key: "_originalVariantId", value: item.id },
            ],
          });
        } else {
          draftLineItems.push({
            variantId: item.id,
            quantity: item.qty || 1,
          });
        }

        // 2. 🌟 NAYA CODE: Agar is item ke Add-ons hain, toh unhe bhi list mein alag se daalein
        if (item.addons && item.addons.length > 0) {
          item.addons.forEach((addonId) => {
            draftLineItems.push({
              variantId: addonId,
              quantity: item.qty || 1, // Add-on ki quantity main product ke barabar hogi
            });
          });
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
          tags: ["PLEDGE-ORDER"],
        },
      };

      const adminRes = await fetch(
        `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/graphql.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
          },
          body: JSON.stringify({
            query: draftQuery,
            variables: draftVariables,
          }),
        },
      );

      const adminJson = await adminRes.json();

      if (
        adminJson.errors ||
        adminJson.data?.draftOrderCreate?.userErrors?.length > 0 ||
        !adminJson.data?.draftOrderCreate?.draftOrder
      ) {
        return NextResponse.json(
          { error: "Draft Order create nahi ho saka" },
          { status: 400 },
        );
      }

      const checkoutUrl = adminJson.data.draftOrderCreate.draftOrder.invoiceUrl;
      return NextResponse.json({ checkoutUrl }, { status: 200 });
    }

    // ==========================================================
    // FLOW B: FULL PRICE MODE (Uses Storefront API)
    // ==========================================================
    else {
      const lineItems = [];

      items.forEach((item) => {
        // 1. Main Product
        lineItems.push({
          merchandiseId: item.id,
          quantity: item.qty || 1,
        });

        // 2. 🌟 NAYA CODE: Add-ons
        if (item.addons && item.addons.length > 0) {
          item.addons.forEach((addonId) => {
            lineItems.push({
              merchandiseId: addonId,
              quantity: item.qty || 1,
            });
          });
        }
      });

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

      const storefrontVariables = { input: { lines: lineItems } };

      const storefrontRes = await fetch(
        `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token":
              process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
          },
          body: JSON.stringify({
            query: storefrontQuery,
            variables: storefrontVariables,
          }),
        },
      );

      const storefrontJson = await storefrontRes.json();
      const checkoutUrl = storefrontJson.data.cartCreate.cart.checkoutUrl;
      return NextResponse.json({ checkoutUrl }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
