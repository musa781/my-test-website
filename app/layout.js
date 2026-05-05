import Link from "next/link";
import "./globals.css"; // Ye line zaroori hai styling ke liye
import { CartProvider } from "./CartContext";
import CartIcon from "@/components/CartIcon";
import CartDrawer from "@/components/CartDrawer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <CartProvider>
          {/* Ye Hamara Navbar Hai */}
          {/* Main nav mein flex aur items-center laga diya */}
          <nav className="bg-blue-600 text-white shadow-md p-5 flex items-center font-semibold">
            
            {/* Left Side: Pages ke Links */}
            <div className="flex gap-6">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/products">Products</Link>
              <Link href="/dashboard">Dashboard</Link>
            </div>

            {/* Right Side: Cart Icon */}
            {/* 'ml-auto' (margin-left: auto) lagane se ye bilkul right pe push ho jayega */}
            <div className="ml-auto">
              <CartIcon />
            </div>
            
          </nav>

          {/* Ye {children} wo jagah hai jahan aapke alag alag pages (Home, About) fit honge */}
          <main className="min-h-screen">{children}</main>

          {/* Ye Footer Hai */}
          <footer className="bg-gray-800 text-white text-center p-4 mt-10">
            <p>© 2026 Meri Next.js Website</p>
          </footer>

          {/* Ye Drawer Ab Har Page Pe Automatically Nazar Aayega */} 
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}