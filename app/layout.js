import Link from 'next/link';
import './globals.css'; // Ye line zaroori hai styling ke liye

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        
        {/* Ye Hamara Navbar Hai */}
        <nav className="bg-blue-600 text-white text-center shadow-md p-5 flex gap-6 font-semibold">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/products">Products</Link>
        </nav>

        {/* Ye {children} wo jagah hai jahan aapke alag alag pages (Home, About) fit honge */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Ye Footer Hai */}
        <footer className="bg-gray-800 text-white text-center p-4 mt-10">
          <p>© 2026 Meri Next.js Website</p>
        </footer>

      </body>
    </html>
  );
}