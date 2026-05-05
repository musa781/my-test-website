"use client";

import { useState, useMemo } from "react";
import ProductAction from "./ProductAction";
import LiveViewers from "./LiveViewers";

export default function ProductSearch({
  initialProducts,
  pledgeCounts = {},
  addOnsList = [],
}) {
  const [searchTerm, setSearchTerm] = useState("");

  // 🌟 NAYA: Selected Add-ons ko track karne ke liye state 🌟
  // Format: { "productId": ["variantId1", "variantId2"] }
  const [selectedAddons, setSelectedAddons] = useState({});

  // Checkbox par click karne par yeh function chalega
  const handleAddonToggle = (productId, addonVariantId) => {
    setSelectedAddons((prev) => {
      const currentAddons = prev[productId] || [];
      if (currentAddons.includes(addonVariantId)) {
        // Agar pehle se selected hai toh hata do (uncheck)
        return {
          ...prev,
          [productId]: currentAddons.filter((id) => id !== addonVariantId),
        };
      } else {
        // Agar selected nahi hai toh list mein daal do (check)
        return { ...prev, [productId]: [...currentAddons, addonVariantId] };
      }
    });
  };

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return initialProducts;

    return initialProducts.filter(({ node: product }) => {
      const titleMatch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const descMatch = product.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return titleMatch || descMatch;
    });
  }, [searchTerm, initialProducts]);

  return (
    <div className="w-full">
      {/* Search Bar UI */}
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
              onClick={() => setSearchTerm("")}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
        <p className="text-gray-400 text-sm mt-3 text-center">
          Showing {filteredProducts.length} result
          {filteredProducts.length !== 1 && "s"}
        </p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-2xl mb-2">No products found 😢</p>
          <p>Try searching for something else.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map(({ node: product }) => {
            // Progress Bar & Milestone Logic
            const currentPledges = pledgeCounts[product.title] || 0;
            const targetPledges = 1; // Milestone Target (e.g., 50 pledges)
            const percentage = Math.min(
              Math.round((currentPledges / targetPledges) * 100),
              100,
            );
            const isMilestoneReached = currentPledges >= targetPledges;
            const pledgesNeeded = targetPledges - currentPledges;

            // 🌟 YEH LINE ADD KAREIN 🌟
            // Is makhsoos product ke liye kon kon se addons selected hain
            const productSelectedAddons = selectedAddons[product.id] || [];

            return (
              <div
                key={product.id}
                className="group relative bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 backdrop-blur-md overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative z-10">
                  <LiveViewers />
                  <h2 className="text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-purple-300 transition-colors duration-300 drop-shadow-sm">
                    {product.title}
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 font-light">
                    {product.description}
                  </p>

                  {/* Campaign Status (Progress Bar) */}
                  <div className="mb-4 bg-black/40 p-4 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-semibold text-rose-300 uppercase tracking-wider">
                        Campaign Status
                      </span>
                      <span className="text-sm font-bold text-white">
                        {currentPledges} / {targetPledges} Pledges
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-rose-500 via-amber-500 to-fuchsia-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* 🌟 NAYA CODE: MILESTONE UI BOX 🌟 */}
                  <div
                    className={`mb-8 p-4 rounded-2xl border backdrop-blur-sm transition-all duration-500 ${
                      isMilestoneReached
                        ? "bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]"
                        : "bg-white/5 border-white/10 border-dashed"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl mt-1 animate-pulse">
                        {isMilestoneReached ? "🔓" : "🔒"}
                      </div>
                      <div>
                        <h4
                          className={`text-sm font-bold uppercase tracking-wider ${
                            isMilestoneReached
                              ? "text-yellow-400"
                              : "text-gray-400"
                          }`}
                        >
                          {isMilestoneReached
                            ? "Stretch Goal Unlocked!"
                            : "Locked Milestone"}
                        </h4>
                        <p
                          className={`text-xs mt-1.5 leading-relaxed ${
                            isMilestoneReached
                              ? "text-yellow-100/80"
                              : "text-gray-500"
                          }`}
                        >
                          {isMilestoneReached
                            ? "Special Edition Carbon Fiber finish is now included for ALL backers! 🎉"
                            : `Unlock the "Special Edition Carbon Fiber" finish. Only ${pledgesNeeded} more ${pledgesNeeded === 1 ? "pledge" : "pledges"} needed!`}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 🌟 NAYA CODE: ADD-ONS UI 🌟 */}
                  {addOnsList && addOnsList.length > 0 && (
                    <div className="mb-6 p-5 rounded-2xl bg-white/5 border border-white/10">
                      <h4 className="text-xs font-semibold text-purple-200 uppercase tracking-wider mb-3">
                        Level Up Your Pledge (Add-ons)
                      </h4>
                      <div className="flex flex-col gap-2">
                        {addOnsList.map(({ node: addon }) => {
                          const addonVariant = addon.variants.edges[0].node;
                          const isSelected = productSelectedAddons.includes(
                            addonVariant.id,
                          );

                          return (
                            <label
                              key={addon.id}
                              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border transition-all ${
                                isSelected
                                  ? "bg-purple-500/20 border-purple-500/50"
                                  : "bg-black/20 border-white/5 hover:bg-white/5"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() =>
                                    handleAddonToggle(
                                      product.id,
                                      addonVariant.id,
                                    )
                                  }
                                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600 bg-black/50"
                                />
                                <span className="text-sm text-gray-200 font-medium">
                                  {addon.title}
                                </span>
                              </div>
                              <span className="text-sm font-bold text-green-400">
                                +{addonVariant.price.currencyCode}{" "}
                                {addonVariant.price.amount}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {/* 🌟 ------------------------ 🌟 */}
                </div>

                <div className="mt-auto relative z-10">
                  <h3 className="text-xs font-semibold text-purple-200 uppercase tracking-[0.25em] mb-5">
                    Available Variants
                  </h3>
                  <div className="flex flex-col gap-3">
                    {product.variants.edges.map(({ node: variant }) => (
                      <div
                        key={variant.id}
                        className="bg-white/5 backdrop-blur-md p-5 rounded-2xl flex flex-col border border-white/10 mt-3 hover:border-white/20 transition-colors"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-lg text-white">
                            {variant.title}
                          </span>
                          <span className="font-bold text-green-400">
                            {variant.price.currencyCode} {variant.price.amount}
                          </span>
                        </div>
                        <ProductAction
                          priceAmount={variant.price.amount}
                          currency={variant.price.currencyCode}
                          variantId={variant.id}
                          title={product.title}
                          selectedAddons={productSelectedAddons}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
