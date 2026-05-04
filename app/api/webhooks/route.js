// app/api/webhooks/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("🔔 DING DING! WEBHOOK RECEIVED FOR ORDER:", body.id);

    // 1. Order ke har item ko check karein
    for (const item of body.line_items) {
      
      // Shopify mein customAttributes 'properties' ban jate hain
      const isPledgeProp = item.properties?.find(p => p.name === "_isPledge" && p.value === "true");
      const variantIdProp = item.properties?.find(p => p.name === "_originalVariantId");

      if (isPledgeProp && variantIdProp) {
        console.log(`🎯 Pledge Item Found: ${item.title}`);
        console.log(`⏳ Creating Remaining Balance Invoice...`);

        const originalVariantId = variantIdProp.value;
        const customerEmail = body.email || body.contact_email;

        // 2. Naya Draft Order Banane ki Query
        const draftQuery = `
          mutation draftOrderCreate($input: DraftOrderInput!) {
            draftOrderCreate(input: $input) {
              draftOrder {
                id
                invoiceUrl
              }
              userErrors {
                field
                message
              }
            }
          }
        `;

        // 3. Asli Product add karo aur $2 discount laga do (Deposit minus)
        const draftVariables = {
          input: {
            email: customerEmail,
            lineItems: [
              {
                variantId: originalVariantId,
                quantity: item.quantity,
                // $2.00 ka discount (Kyunke user pehle hi de chuka hai)
                appliedDiscount: {
                  description: "Pledge Deposit Paid",
                  value: 2.00,
                  valueType: "FIXED_AMOUNT"
                }
              }
            ],
            tags: ["REMAINING-BALANCE-INVOICE"]
          }
        };

        // 4. Shopify Admin API ko Request bhej do
        const adminRes = await fetch(
          `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/graphql.json`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_ACCESS_TOKEN, 
            },
            body: JSON.stringify({ query: draftQuery, variables: draftVariables }),
          }
        );

        const adminJson = await adminRes.json();

        if (adminJson.data?.draftOrderCreate?.draftOrder) {
           console.log("✅ BOOM! Remaining Balance Invoice Created!");
           console.log("🔗 Invoice URL:", adminJson.data.draftOrderCreate.draftOrder.invoiceUrl);
           // Yahan aap is URL ko apne Database mein bhi save kar sakte hain
        } else {
           console.error("❌ Failed to create invoice:", JSON.stringify(adminJson.data?.draftOrderCreate?.userErrors));
        }
      }
    }

    return NextResponse.json({ message: "Webhook processed successfully" }, { status: 200 });

  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}