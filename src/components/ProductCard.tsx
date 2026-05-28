"use client";

import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const badgeColor = {
    bestseller: "bg-amber-500",
    nowość: "bg-emerald-500",
    promocja: "bg-red-500",
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col">
      <div className="relative aspect-square bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex items-center justify-center overflow-hidden">
        <div className="text-7xl group-hover:scale-110 transition-transform duration-300">
          {product.category === "uchwyty" && "🎣"}
          {product.category === "organizery" && "📦"}
          {product.category === "sygnalizatory" && "🔔"}
          {product.category === "podporki" && "🏗️"}
          {product.category === "narzedzia" && "🔧"}
          {product.category === "akcesoria" && "⚙️"}
        </div>
        {product.badge && (
          <span
            className={`absolute top-3 left-3 ${badgeColor[product.badge]} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide`}
          >
            {product.badge}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-amber-400" : "text-slate-200"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-slate-400 ml-1">({product.reviewCount})</span>
        </div>

        <Link href={`/produkty/${product.slug}`}>
          <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2 mb-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-slate-500 line-clamp-2 mb-3 flex-1">
          {product.shortDescription}
        </p>

        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
            {product.material}
          </span>
          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
            {product.weight}
          </span>
        </div>

        <div className="flex items-end justify-between mt-3 pt-3 border-t border-slate-100">
          <div>
            <span className="text-2xl font-bold text-slate-900">
              {product.price.toFixed(2)}
            </span>
            <span className="text-sm text-slate-500 ml-1">zł</span>
            {product.originalPrice && (
              <span className="text-sm text-slate-400 line-through ml-2">
                {product.originalPrice.toFixed(2)} zł
              </span>
            )}
          </div>
          <button
            onClick={() => addItem(product)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white p-2.5 rounded-xl transition-colors shadow-sm hover:shadow-md active:scale-95"
            title="Dodaj do koszyka"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
