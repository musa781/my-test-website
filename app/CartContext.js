// app/CartContext.js
"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Add-ons ki list ko string mein convert kar rahe hain taake asani se match kar sakein
      const addonsString = JSON.stringify(product.addons || []);

      // Check karte hain ke kya exact same product, same mode aur SAME Add-ons ke sath pehle se cart mein hai?
      const existingItem = prevItems.find(
        (item) =>
          item.id === product.id &&
          item.mode === product.mode &&
          JSON.stringify(item.addons || []) === addonsString,
      );

      // ProductAction component se aane wali quantity ko use kar rahe hain (default 1)
      const qtyToAdd = product.quantity || 1;

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id &&
          item.mode === product.mode &&
          JSON.stringify(item.addons || []) === addonsString
            ? { ...item, qty: item.qty + qtyToAdd }
            : item,
        );
      }
      return [...prevItems, { ...product, qty: qtyToAdd }];
    });

    setIsCartOpen(true);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);

  // 🌟 NAYA FUNCTION: Checkout URL Banane ke liye 🌟
  const generateCheckoutUrl = () => {
    let urlParts = [];

    cartItems.forEach((item) => {
      // 1. Main Product Variant ID (e.g., 'gid://shopify/ProductVariant/123456' se sirf '123456' nikalna)
      const mainVariantId = item.id.includes("/")
        ? item.id.split("/").pop()
        : item.id;
      urlParts.push(`${mainVariantId}:${item.qty}`);

      // 2. Agar is item ke sath Add-ons hain, toh unhe bhi URL mein add karna
      if (item.addons && item.addons.length > 0) {
        item.addons.forEach((addonId) => {
          const cleanAddonId = addonId.includes("/")
            ? addonId.split("/").pop()
            : addonId;
          urlParts.push(`${cleanAddonId}:${item.qty}`);
        });
      }
    });

    // Aapke .env file se Shopify Store Domain uthana
    const domain =
      process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ||
      process.env.SHOPIFY_STORE_DOMAIN;

    // Agar domain variable mein mojood nahi hai toh safety ke liye
    if (!domain) {
      console.error(
        "Shopify Store Domain is missing in environment variables!",
      );
    }

    return `https://${domain}/cart/${urlParts.join(",")}`;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        isCartOpen,
        openCart,
        closeCart,
        clearCart,
        generateCheckoutUrl, // 👈 Naya function context mein expose kar diya
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
