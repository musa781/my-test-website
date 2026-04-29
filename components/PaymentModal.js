// components/PaymentModal.js
"use client";
import { useState, useEffect } from 'react';
import { useCart } from '@/app/CartContext';  //  <---Yeh hook Import zaruri hai

export default function PaymentModal({ isOpen, onClose }) {
  const [paymentStatus, setPaymentStatus] = useState('waiting'); // 'waiting', 'success'
  const { clearCart } = useCart(); //  <--- Yeh destructure kiya

  useEffect(() => {
    let pollInterval;

    if (isOpen) {
      setPaymentStatus('waiting');
      
      // 🔄 POLLING LOGIC: Har 3 second baad API ko call karna
      pollInterval = setInterval(async () => {
        try {
          console.log("🔄 Checking payment status from backend...");
          const res = await fetch('/api/check-payment');
          const data = await res.json();

          if (data.status === 'paid') {
            setPaymentStatus('success');
            
            clearCart();   // Payment milte hi cart khali kar do!
            clearInterval(pollInterval); // Payment mil gayi, ab baar baar poochna band karo!
          }
        } catch (error) {
          console.error("Polling error:", error);
        }
      }, 3000); // 3000 milliseconds = 3 seconds
    }

    // Cleanup function: Agar user popup band kar de to background polling rok do
    return () => clearInterval(pollInterval);
  }, [isOpen, clearCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex justify-center items-center">
      <div className="bg-[#0f172a] border border-white/10 p-8 rounded-3xl shadow-2xl max-w-md w-full text-center transform transition-all scale-100">
        
        {paymentStatus === 'waiting' ? (
          <div className="flex flex-col items-center">
            {/* Loading Spinner */}
            <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-6"></div>
            <h2 className="text-2xl font-bold text-white mb-2">Awaiting Payment...</h2>
            <p className="text-gray-400 font-light">
              Please complete the payment in the Shopify tab. We are securely monitoring the transaction.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-4xl mb-6 shadow-[0_0_20px_rgba(34,197,94,0.3)] border border-green-500/30">
              ✓
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-2">Payment Successful!</h2>
            <p className="text-gray-400 font-light mb-8">
              Thank you for your order. Your PledgePop items are now confirmed.
            </p>
            <button 
              onClick={onClose}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 rounded-xl transition-all"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}