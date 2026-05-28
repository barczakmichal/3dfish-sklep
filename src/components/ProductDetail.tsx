"use client";

import Link from "next/link";
import { Product } from "@/types";
import { getProductsByCategory, getCategory } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";

export default function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const categoryInfo = getCategory(product.category);
  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-emerald-600 transition-colors">Strona główna</Link>
        <span>/</span>
        <Link href="/produkty" className="hover:text-emerald-600 transition-colors">Produkty</Link>
        <span>/</span>
        {categoryInfo && (
          <>
            <Link href={`/produkty?kategoria=${product.category}`} className="hover:text-emerald-600 transition-colors">
              {categoryInfo.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-slate-900 font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-12 flex items-center justify-center aspect-square border border-slate-100">
          <div className="text-[10rem]">
            {product.category === "uchwyty" && "🎣"}
            {product.category === "organizery" && "📦"}
            {product.category === "sygnalizatory" && "🔔"}
            {product.category === "podporki" && "🏗️"}
            {product.category === "narzedzia" && "🔧"}
            {product.category === "akcesoria" && "⚙️"}
          </div>
        </div>

        <div>
          {product.badge && (
            <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4 ${
              product.badge === "bestseller" ? "bg-amber-100 text-amber-700" :
              product.badge === "nowość" ? "bg-emerald-100 text-emerald-700" :
              "bg-red-100 text-red-700"
            }`}>
              {product.badge}
            </span>
          )}

          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-amber-400" : "text-slate-200"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-slate-500">
              {product.rating} ({product.reviewCount} opinii)
            </span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-bold text-slate-900">{product.price.toFixed(2)} zł</span>
            {product.originalPrice && (
              <span className="text-xl text-slate-400 line-through">{product.originalPrice.toFixed(2)} zł</span>
            )}
          </div>

          <p className="text-slate-600 leading-relaxed mb-6">{product.description}</p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-slate-50 rounded-lg p-3">
              <span className="text-xs text-slate-400 block">Materiał</span>
              <span className="font-medium text-sm">{product.material}</span>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <span className="text-xs text-slate-400 block">Waga</span>
              <span className="font-medium text-sm">{product.weight}</span>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <span className="text-xs text-slate-400 block">Wymiary</span>
              <span className="font-medium text-sm">{product.dimensions}</span>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <span className="text-xs text-slate-400 block">Czas druku</span>
              <span className="font-medium text-sm">{product.printTime}</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold mb-3">Cechy produktu</h3>
            <ul className="space-y-2">
              {product.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-3 hover:bg-slate-50 transition-colors text-slate-600 font-medium"
              >
                -
              </button>
              <span className="px-4 py-3 font-semibold min-w-[3rem] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-3 hover:bg-slate-50 transition-colors text-slate-600 font-medium"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className={`flex-1 font-semibold py-3.5 px-8 rounded-xl transition-all active:scale-95 ${
                added
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-emerald-500/25"
              }`}
            >
              {added ? "Dodano do koszyka ✓" : "Dodaj do koszyka"}
            </button>
          </div>

          <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <div className="flex items-center gap-2 text-sm text-emerald-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Wysyłka w 24h</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-700 mt-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Darmowa dostawa od 150 zł</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-700 mt-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>30 dni na zwrot</span>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Podobne produkty</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
