// app/api/newsletter/route.js
import { NextResponse } from 'next/server';

// POST request ko handle karne ka function
export async function POST(request) {
  try {
    // Frontend se aane wala data (body) read kar rahe hain
    const body = await request.json();
    const { email } = body;

    // 1. Validation (Check karna ke email theek hai ya nahi)
    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { error: "Bhai, sahi email to likho! 😅" },
        { status: 400 } // 400 ka matlab hai "Bad Request" (User ki ghalti)
      );
    }

    // 2. Database Integration (Abhi ke liye hum sirf console mein print karenge)
    // Asal project mein yahan hum MongoDB ya PostgreSQL mein email save karte hain.
    console.log("✅ New Subscriber Added to Database:", email);

    // 3. Success Response bhejna
    return NextResponse.json(
      { message: "Zabardast! Aap successfully subscribe ho gaye hain. 🎉" },
      { status: 200 } // 200 ka matlab hai "OK / Success"
    );

  } catch (error) {
    // Agar server mein koi masla aa jaye
    console.error("Newsletter API Error:", error);
    return NextResponse.json(
      { error: "Server mein koi masla hai, thori der baad try karein." },
      { status: 500 } // 500 ka matlab hai "Internal Server Error"
    );
  }
}