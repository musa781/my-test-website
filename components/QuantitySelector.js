"use client";

import { useState } from 'react';

export default function QuantitySelector() {
  // State for item quantity
  const [quantity, setQuantity] = useState(1);

  // Helper functions
  const increase = () => setQuantity(prev => prev + 1);
  const decrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1)); // 1 se neeche nahi jane dena

  return (
    <div className="flex items-center gap-4 mt-4 mb-2">
      <span className="text-sm text-gray-400 font-medium">Quantity:</span>
      <div className="flex items-center bg-white/5 border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm">
        
        {/* Minus Button */}
        <button 
          onClick={decrease}
          className="px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-rose-400 transition-colors disabled:opacity-50"
          disabled={quantity === 1}
        >
          −
        </button>
        
        {/* Quantity Display */}
        <div className="px-4 py-2 text-white font-bold min-w-[3rem] text-center bg-white/5">
          {quantity}
        </div>
        
        {/* Plus Button */}
        <button 
          onClick={increase}
          className="px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-teal-400 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}