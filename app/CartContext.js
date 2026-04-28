// app/CartContext.js
"use client";

import { createContext, useContext, useState } from 'react';

// 1. Context Create Karna
const CartContext = createContext();

// 2. Provider Component (Jo poori app ko wrap karega)
export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  // Function jo cart mein izafa karega
  const addToCart = () => {
    setCartCount(prev => prev + 1);
    console.log("🛒 Item added! Global count is now:", cartCount + 1);
  };

  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

// 3. Custom Hook (Taake data asani se use ho sake)
export function useCart() {
  return useContext(CartContext);
}