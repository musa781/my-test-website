// app/api/check-payment/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // 🌟 ASAL PROJECT KI LOGIC:
    // const orderId = request.nextUrl.searchParams.get('orderId');
    // const order = await Database.findOrder(orderId);
    // return NextResponse.json({ status: order.status }); // 'pending' ya 'paid'

    // 🛠️ DEMO KE LIYE: 
    // Hum assume kar rahe hain ke Webhook ne aakar database ko update kar diya hai
    // aur payment "success" ho gayi hai.
    
    return NextResponse.json({ status: 'paid' }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}