// app/CartContext.js
"use client";

import { createContext, useContext, useState } from "react";

// 1. Context Create Karna
const CartContext = createContext();

// 2. Provider Component (Jo poori app ko wrap karega)
export function CartProvider({ children }) {
  // 1. Ab hamari memory ek Array [] hai, number 0 nahi.
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 2. Naya addToCart function jo poora 'product' ka object receive karega
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Check karte hain ke kya ye item pehle se cart mein hai?
      const existingItem = prevItems.find(
        (item) => item.id === product.id && item.mode === product.mode,
      );

      if (existingItem) {
        // Agar hai, to sirf uski quantity (qty) barha do
        return prevItems.map((item) =>
          item.id === product.id && item.mode === product.mode
            ? { ...item, qty: item.qty + 1 }
            : item,
        );
      }
      // Agar nahi hai, to naya item list mein add kar do (qty: 1 ke sath)
      return [...prevItems, { ...product, qty: 1 }];
    });

    setIsCartOpen(true); // Drawer khol do
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // 3. Cart Icon ke number ke liye total items calculate karna
  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 3. Custom Hook (Taake data asani se use ho sake)
export function useCart() {
  return useContext(CartContext);
}
