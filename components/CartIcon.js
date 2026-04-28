"use client";
import { useCart } from '@/app/CartContext';

export default function CartIcon() {
  const { cartCount, openCart } = useCart();

  return (

    <div onClick={openCart} className="relative p-2 bg-white/5 border border-white/10 rounded-full px-5 flex items-center gap-2 cursor-pointer hover:bg-white/10 transition-all">
      <span className="text-sm font-medium text-gray-200">Cart 🛒</span>
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[11px] font-bold h-5 w-5 flex items-center justify-center rounded-full animate-bounce shadow-lg">
          {cartCount}
        </span>
      )}
    </div>
  );
}