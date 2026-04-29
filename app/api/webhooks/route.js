// app/api/webhooks/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // 1. Shopify jo data bhejega, hum use read kar rahe hain
    const body = await request.json();
    
    // 2. Terminal mein print kar ke dekhenge ke kya data aaya hai
    console.log("🔔 DING DING! WEBHOOK RECEIVED!");
    console.log("✅ Payment successful for Order ID:", body.id);
    console.log("💰 Total Amount Paid:", body.total_price);

    // 3. 🌟 ASAL BACKEND LOGIC YAHAN AATI HAI 🌟
    // Yahan hum aam tor par apni database (MongoDB / SQL) mein ja kar 
    // is user ke order ka status "Pending" se "Paid" kar dete hain.
    // For Demo: Hum isay simply server console mein print kar rahe hain.

    // 4. Shopify ko batana ke "Bhai humein message mil gaya hai, shukriya!"
    // Agar hum 200 OK wapis nahi bhejenge, to Shopify bar bar webhook bhejta rahega.
    return NextResponse.json(
      { message: "Webhook received successfully" }, 
      { status: 200 }
    );

  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}