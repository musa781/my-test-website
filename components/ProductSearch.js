"use client";

import { useState, useMemo } from 'react';
import ProductAction from './ProductAction';
import LiveViewers from './LiveViewers';

export default function ProductSearch({ initialProducts }) {
  // 1. Search text ke liye state (memory)
  const [searchTerm, setSearchTerm] = useState('');

  // 2. The Superpower Hook: useMemo
  // Yeh function sirf tab chalega jab searchTerm ya initialProducts change honge
  const filteredProducts = useMemo(() => {
    console.log("🔍 Filtering Products... (useMemo in action)");
    
    if (!searchTerm) return initialProducts; // Agar search khali hai to saare products dikhao

    return initialProducts.filter(({ node: product }) => {
      // Product ke title ya description mein search term dhoondhna
      const titleMatch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const descMatch = product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return titleMatch || descMatch;
    });
  }, [searchTerm, initialProducts]); // Yeh 'Dependency Array' hai.

  return (
    <div className="w-full">
      
      {/* 3. The Search Bar UI (Glassmorphism Theme) */}
      <div className="mb-10 max-w-2xl mx-auto">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search products by name or description..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/20 text-white placeholder-gray-400 rounded-full py-4 px-6 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-md"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
        <p className="text-gray-400 text-sm mt-3 text-center">
          Showing {filteredProducts.length} result{filteredProducts.length !== 1 && 's'}
        </p>
      </div>

      {/* 4. Products Grid (Sirf Filtered Products Dikhayega) */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-2xl mb-2">No products found 😢</p>
          <p>Try searching for something else.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map(({ node: product }) => (
            <div key={product.id} className="group relative bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 backdrop-blur-md overflow-hidden flex flex-col justify-between">
              
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10">
                <LiveViewers />
                <h2 className="text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-purple-300 transition-colors duration-300 drop-shadow-sm">
                  {product.title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3 font-light">
                  {product.description}
                </p>
              </div>

              <div className="mt-auto relative z-10">
                <h3 className="text-xs font-semibold text-purple-200 uppercase tracking-[0.25em] mb-5">Available Variants</h3>
                <div className="flex flex-col gap-3">
                  {product.variants.edges.map(({ node: variant }) => (
                    <div key={variant.id} className="bg-white/5 backdrop-blur-md p-5 rounded-2xl flex flex-col border border-white/10 mt-3 hover:border-white/20 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-lg text-white">{variant.title}</span>
                        <span className="font-bold text-green-400">{variant.price.currencyCode} {variant.price.amount}</span>
                      </div>
                      <ProductAction priceAmount={variant.price.amount} currency={variant.price.currencyCode} variantId={variant.id} title={product.title} />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}