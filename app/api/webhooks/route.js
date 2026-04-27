// app/api/webhooks/route.js
import { NextResponse } from 'next/server';

// Webhooks hamesha POST request bhejte hain
export async function POST(request) {
  try {
    // 1. Webhook ka payload (data) receive karein
    const payload = await request.json();

    // 2. Check karein ke event kaunsa hai
    if (payload.event === 'pledge.successful') {
      const { customerId, amount, mode } = payload.data;
      
      console.log(`🎉 New Pledge Received!`);
      console.log(`Customer: ${customerId}, Amount: ${amount}, Mode: ${mode}`);

      // Yahan hum apna database update karenge...
      // E.g., await db.campaign.updateStatus(customerId, 'pledged');

      // 3. Sender ko wapis 200 OK bhejein taake usay pata chale humne data receive kar liya hai
      return NextResponse.json({ message: 'Webhook received successfully' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Event ignored' }, { status: 200 });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}