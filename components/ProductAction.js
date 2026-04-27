"use client"; 

import { useState, useEffect } from 'react';

export default function ProductAction({ priceAmount, currency }) {
  const [selectedMode, setSelectedMode] = useState('Full Price');

  const numericPrice = parseFloat(priceAmount);
  const pledgeAdvance = (numericPrice * 0.20).toFixed(2);

  useEffect(() => {
    console.log(`Lifecycle Hook Triggered: User switched to [${selectedMode}] mode.`);
  }, [selectedMode]);

  return (
    <div className="mt-4 pt-4 border-t border-white/10">
      <div className="flex flex-wrap gap-3 mb-5">
        {/* Full Price Button */}
        <button 
          onClick={() => setSelectedMode('Full Price')}
          className={`px-5 py-2 text-sm rounded-full transition-all duration-300 ${
            selectedMode === 'Full Price' 
              ? 'bg-gradient-to-r from-amber-400 to-rose-500 text-black font-extrabold shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:scale-105' 
              : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
          }`}
        >
          Full Price
        </button>

        {/* Pledge Button */}
        <button 
          onClick={() => setSelectedMode('Pledge Mode')}
          className={`px-5 py-2 text-sm rounded-full transition-all duration-300 ${
            selectedMode === 'Pledge Mode' 
              ? 'bg-gradient-to-r from-teal-400 to-emerald-500 text-black font-extrabold shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-105' 
              : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
          }`}
        >
          Pledge Mode (20%)
        </button>
      </div>

      {/* Dynamic Price Render */}
      <div className="p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
        {selectedMode === 'Full Price' ? (
          <p className="text-gray-300 flex items-center">
            Total Payable: <span className="font-black text-rose-400 text-xl ml-2">{currency} {numericPrice}</span>
          </p>
        ) : (
          <div className="text-gray-300 flex flex-col sm:flex-row sm:items-center gap-2">
            <span>Advance: <span className="font-black text-teal-400 text-xl ml-1">{currency} {pledgeAdvance}</span></span>
            <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-md border border-white/5 w-fit">80% remaining on delivery</span>
          </div>
        )}
      </div>
    </div>
  );
}