"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/app/CartContext";

export default function ProductAction({ priceAmount, currency, variantId, title }) {
  const [selectedMode, setSelectedMode] = useState("Full Price");
  
  // Nayi State: Quantity ab yahan manage hogi taake Cart ko exact items mil sakein
  const [quantity, setQuantity] = useState(1);
  
  const { addToCart } = useCart();

  const numericPrice = parseFloat(priceAmount);
  
  // Senior Requirement: Fixed $2 Deposit (Pledge Advance)
  const pledgeAdvance = 2.00; 
  
  // Remaining balance calculate kiya taake UI mein dikha sakein
  const remainingBalance = (numericPrice - pledgeAdvance).toFixed(2);

  useEffect(() => {
    console.log(
      `Lifecycle Hook Triggered: User switched to [${selectedMode}] mode.`,
    );
  }, [selectedMode]);

  const handleAddClick = () => {
    // BUG FIX: Exact string "Pledge Mode" use ki hai
    const finalPrice = selectedMode === "Pledge Mode" ? pledgeAdvance : numericPrice;

    const itemData = {
      id: variantId, 
      title: title || "Premium Product", 
      price: finalPrice,
      mode: selectedMode,
      currency: currency,
      quantity: quantity // Quantity cart mein add kar di gayi
    };

    addToCart(itemData);
  };

  return (
    <div className="mt-4 pt-4 border-t border-white/10">
      
      {/* Mode Selector Buttons */}
      <div className="flex flex-wrap gap-3 mb-5">
        <button
          onClick={() => setSelectedMode("Full Price")}
          className={`px-5 py-2 text-sm rounded-full transition-all duration-300 ${
            selectedMode === "Full Price"
              ? "bg-gradient-to-r from-amber-400 to-rose-500 text-black font-extrabold shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:scale-105"
              : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
          }`}
        >
          Full Price
        </button>

        <button
          onClick={() => setSelectedMode("Pledge Mode")}
          className={`px-5 py-2 text-sm rounded-full transition-all duration-300 ${
            selectedMode === "Pledge Mode"
              ? "bg-gradient-to-r from-teal-400 to-emerald-500 text-black font-extrabold shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-105"
              : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
          }`}
        >
          Pledge Mode ($2 Deposit)
        </button>
      </div>

      {/* Integrated Quantity Selector UI */}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-gray-300 text-sm">Quantity:</span>
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-3 py-1">
          <button 
            className="text-gray-300 hover:text-white text-xl font-bold px-2 disabled:opacity-50 transition"
            onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}
            disabled={quantity === 1}
          >
            -
          </button>
          <span className="text-white font-bold min-w-[20px] text-center">{quantity}</span>
          <button 
            className="text-gray-300 hover:text-white text-xl font-bold px-2 transition"
            onClick={() => setQuantity(prev => prev + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* Dynamic Price Render */}
      <div className="p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
        {selectedMode === "Full Price" ? (
          <p className="text-gray-300 flex items-center">
            Total Payable:{" "}
            <span className="font-black text-rose-400 text-xl ml-2">
              {currency} {numericPrice.toFixed(2)}
            </span>
          </p>
        ) : (
          <div className="text-gray-300 flex flex-col sm:flex-row sm:items-center gap-2">
            <span>
              Advance:{" "}
              <span className="font-black text-teal-400 text-xl ml-1">
                {currency} {pledgeAdvance.toFixed(2)}
              </span>
            </span>
            <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-md border border-white/5 w-fit">
              {currency} {remainingBalance} remaining on delivery
            </span>
          </div>
        )}
        <button
          onClick={handleAddClick}
          className="w-full mt-4 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md"
        >
          Add to Cart 🛍️
        </button>
      </div>
      
    </div>
  );
}