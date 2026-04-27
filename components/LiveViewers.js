"use client";

import { useState, useEffect } from 'react';

export default function LiveViewers() {
  // Memory: Viewers ki tadad yaad rakhne ke liye
  const [viewers, setViewers] = useState(15);

  // Lifecycle: Component jab load hoga
  useEffect(() => {
    console.log("👀 LiveViewers Component Mounted");

    // Har 4 second baad random number change karne ka interval
    const interval = setInterval(() => {
      // Randomly log aate jate hain (fluctuation)
      const change = Math.floor(Math.random() * 5) - 2; 
      setViewers((prev) => (prev + change > 5 ? prev + change : 5)); // Minimum 5 log
    }, 4000);

    // CLEANUP FUNCTION (Unmounting)
    // Ye senior ko dikhane wali sab se ahem cheez hai. Jab user is page se jayega to interval band karna zaroori hai warna memory leak hoga.
    return () => {
      console.log("🧹 LiveViewers Component Unmounted (Interval Cleared)");
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex items-center gap-2 mb-4 px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 rounded-full w-fit">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
      </span>
      <p className="text-xs font-medium text-rose-300">
        <strong className="text-white">{viewers}</strong> people are viewing this right now
      </p>
    </div>
  );
}