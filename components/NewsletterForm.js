// components/NewsletterForm.js
"use client";

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault(); // Page ko reload hone se rokna
    setStatus('loading');
    setMessage('');

    try {
      // Hamari apni Next.js API ko call karna!
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }), // Email ko JSON bana kar bhej rahe hain
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message);
        setEmail(''); // Input box ko khali kar dena
      } else {
        setStatus('error');
        setMessage(data.error);
      }
    } catch (err) {
      setStatus('error');
      setMessage("Kuch ghalat ho gaya. Dobara try karein.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden group">
      
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="relative z-10 text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Join Our Newsletter 💌</h3>
        <p className="text-gray-400 text-sm mb-6 font-light">
          Get the latest updates on our premium Shopify products.
        </p>

        <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="w-full bg-black/50 border border-white/20 text-white placeholder-gray-500 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
          </button>
        </form>

        {/* Dynamic Message Box */}
        {message && (
          <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${
            status === 'success' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}