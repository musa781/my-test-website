"use client";
import { useCart } from '@/app/CartContext';
import { useState } from 'react';

export default function CartDrawer() {
  const { isCartOpen, closeCart, cartItems } = useCart(); // Ab humne cartItems utha liye
  const [isLoading, setIsLoading] = useState(false);

  // Total Bill Calculate Karna
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.qty), 0);
  
  // Ye naya function Shopify Checkout trigger karega
  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems })
      });

      const data = await res.json();

      if (data.checkoutUrl) {
        // User ko browser se seedha Shopify ke payment page par bhej dena
        window.open(data.checkoutUrl, '_blank');
      } else {
        alert("Checkout link generate karne mein masla aaya.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={closeCart}></div>
      )}

      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="p-5 h-full flex flex-col">
          
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-bold text-gray-800">Your Cart 🛒</h2>
            <button onClick={closeCart} className="text-gray-500 hover:text-red-500 text-2xl font-bold">×</button>
          </div>

          <div className="flex-1 overflow-y-auto py-6">
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {/* 🌟 Asal Magic Yahan Hai! Loop laga kar items dikhana */}
                {cartItems.map((item, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm relative">
                    {/* Item Mode Badge (Pledge ya Full) */}
                    <span className="absolute top-2 right-2 text-[10px] uppercase font-bold text-white bg-blue-600 px-2 py-1 rounded">
                      {item.mode}
                    </span>
                    
                    <p className="font-semibold text-gray-800 pr-12">{item.title}</p>
                    <p className="text-sm text-gray-500 mt-1">Qty: {item.qty}</p>
                    <p className="text-blue-600 font-bold mt-1">
                      {item.currency} {item.price}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4 font-bold text-lg text-gray-800">
              <span>Total:</span>
              <span>USD {cartTotal.toFixed(2)}</span>
            </div>
            {/* Naya Button Loading State ke sath */}
            <button 
              onClick={handleCheckout}
              disabled={isLoading || cartItems.length === 0}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50 flex justify-center items-center"
            >
              {isLoading ? "Generating Secure Link..." : "Proceed to Checkout"}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}