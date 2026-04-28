"use client";
import { useCart } from '@/app/CartContext';

export default function CartDrawer() {
  const { isCartOpen, closeCart, cartCount } = useCart();

  return (
    <>
      {/* 1. Black Overlay (Background ko thora dark karna jab drawer khule) */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={closeCart} // Bahar click karne se band ho jaye
        ></div>
      )}

      {/* 2. Asal Drawer (Right side se slide ho kar aayega) */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-5 h-full flex flex-col">
          
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-bold text-gray-800">Your Cart 🛒</h2>
            <button onClick={closeCart} className="text-gray-500 hover:text-red-500 text-2xl font-bold">
              ×
            </button>
          </div>

          {/* Body (Items) */}
          <div className="flex-1 overflow-y-auto py-6">
            {cartCount === 0 ? (
              <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-800">Demo Item (PledgePop)</p>
                <p className="text-sm text-gray-500">Qty: {cartCount}</p>
                <p className="text-blue-600 font-bold mt-2">Advance: $20.00</p>
              </div>
            )}
          </div>

          {/* Footer (Checkout Button) */}
          <div className="border-t pt-4">
            <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>

        </div>
      </div>
    </>
  );
}