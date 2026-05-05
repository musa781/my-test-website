// app/api/webhooks/paid/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Pledge from '@/models/Pledge';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("💰 DING DING! PAYMENT WEBHOOK TRIGGERED FOR ORDER:", body.id);

    // Shopify ke tags check karein
    const tags = body.tags || "";
    
    // Check karein ke kya yeh hamara pledge wala invoice pay hua hai?
    if (tags.includes("REMAINING-BALANCE-INVOICE")) {
      
      // Tags mein se apna Original Order ID nikalain (Jo humne Step 1 mein daala tha)
      const match = tags.match(/OriginalOrderId:(\d+)/);
      
      if (match && match[1]) {
        const originalOrderId = match[1];
        console.log("🔍 Found Original Pledge Order ID:", originalOrderId);
        
        await connectToDatabase();
        
        // MongoDB mein ja kar us order ka status "Completed" kar dein
        const updatedPledge = await Pledge.findOneAndUpdate(
          { shopifyOrderId: originalOrderId },
          { status: 'Completed' },
          { returnDocument: 'after' } // Yeh return mein updated data dega
        );

        if (updatedPledge) {
          console.log("✅ SUCCESS! Pledge Status Updated to 'Completed' in MongoDB!");
        } else {
          console.log("⚠️ Order found in tags, but no matching record in MongoDB.");
        }
      }
    }

    return NextResponse.json({ message: "Payment processed successfully" }, { status: 200 });

  } catch (error) {
    console.error("Payment Webhook Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}