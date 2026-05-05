// app/api/webhooks/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectToDatabase from '@/lib/mongodb'; // 👈 DB Connection Import
import Pledge from '@/models/Pledge';          // 👈 Model Import

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("🔔 DING DING! WEBHOOK RECEIVED FOR ORDER:", body.id);

    for (const item of body.line_items) {
      const isPledgeProp = item.properties?.find(p => p.name === "_isPledge" && p.value === "true");
      const variantIdProp = item.properties?.find(p => p.name === "_originalVariantId");

      if (isPledgeProp && variantIdProp) {
        console.log(`🎯 Pledge Item Found: ${item.title}`);
        
        const originalVariantId = variantIdProp.value;
        const customerEmail = body.email || body.contact_email;

        const draftQuery = `
          mutation draftOrderCreate($input: DraftOrderInput!) {
            draftOrderCreate(input: $input) {
              draftOrder { id invoiceUrl }
            }
          }
        `;

        const draftVariables = {
          input: {
            email: customerEmail,
            lineItems: [{
                variantId: originalVariantId,
                quantity: item.quantity,
                appliedDiscount: { description: "Pledge Deposit Paid", value: 2.00, valueType: "FIXED_AMOUNT" }
            }],
            tags: ["REMAINING-BALANCE-INVOICE",`OriginalOrderId:${body.id}`]
          }
        };

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
           const invoiceUrl = adminJson.data.draftOrderCreate.draftOrder.invoiceUrl;
           console.log("✅ BOOM! Remaining Balance Invoice Created!");

           // --- EMAIL CODE ---
           if (customerEmail) {
             const transporter = nodemailer.createTransport({
               service: 'gmail',
               auth: {
                 user: process.env.EMAIL_USER,
                 pass: process.env.EMAIL_PASS,
               },
             });

             const mailOptions = {
               from: `"PledgePop Campaigns" <${process.env.EMAIL_USER}>`,
               to: customerEmail,
               subject: 'Action Required: Your PledgePop Remaining Balance Invoice',
               html: `
                 <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaeb; border-radius: 10px;">
                   <h2 style="color: #333;">Thank you for your Pledge! 🎉</h2>
                   <p style="color: #555; font-size: 16px;">
                     Your <strong>$2.00 deposit</strong> for <strong>${item.title}</strong> has been successfully received.
                   </p>
                   <p style="color: #555; font-size: 16px;">
                     As promised, here is the secure invoice for your remaining balance. Your item is secured!
                   </p>
                   <div style="text-align: center; margin: 30px 0;">
                     <a href="${invoiceUrl}" style="background-color: #000; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">View & Pay Remaining Balance</a>
                   </div>
                   <p style="color: #999; font-size: 14px;">If you have any questions, simply reply to this email.</p>
                 </div>
               `,
             };

             await transporter.sendMail(mailOptions);
             console.log("✉️ Success! Invoice Email sent to:", customerEmail);
           }

           // 🌟 --------------------------------------------------------- 🌟
           // 🌟 NAYA DATABASE CODE 🌟
           // 🌟 --------------------------------------------------------- 🌟
           try {
             await connectToDatabase(); // DB se connect karo
             
             // Naya record banao
             const newPledge = new Pledge({
               shopifyOrderId: body.id.toString(),
               customerEmail: customerEmail || "No Email",
               productTitle: item.title,
               invoiceUrl: invoiceUrl,
               // depositPaid aur status default use ho jayenge jo Schema mein define kiye hain
             });

             await newPledge.save(); // MongoDB mein save kar do
             console.log("💾 SUCCESS! Data MongoDB mein save ho gaya!");
           } catch (dbError) {
             console.error("⚠️ MongoDB Save Error:", dbError);
           }
           // 🌟 --------------------------------------------------------- 🌟

        }
      }
    }

    return NextResponse.json({ message: "Webhook processed successfully" }, { status: 200 });

  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}