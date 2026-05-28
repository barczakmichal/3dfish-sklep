"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  const deliveryCost = totalPrice >= 150 ? 0 : 14.99;
  const finalTotal = totalPrice + deliveryCost;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <p className="text-6xl mb-4">🛒</p>
        <h1 className="text-2xl font-bold mb-2">Koszyk jest pusty</h1>
        <p className="text-slate-500 mb-6">Dodaj produkty do koszyka, aby kontynuować zakupy.</p>
        <Link
          href="/produkty"
          className="inline-flex bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          Przeglądaj produkty
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Koszyk</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-100 flex gap-4 items-start"
            >
              <div className="w-20 h-20 bg-slate-50 rounded-lg flex items-center justify-center text-4xl shrink-0">
                {item.product.category === "uchwyty" && "🎣"}
                {item.product.category === "organizery" && "📦"}
                {item.product.category === "sygnalizatory" && "🔔"}
                {item.product.category === "podporki" && "🏗️"}
                {item.product.category === "narzedzia" && "🔧"}
                {item.product.category === "akcesoria" && "⚙️"}
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/produkty/${item.product.slug}`}
                  className="font-semibold text-slate-900 hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  {item.product.name}
                </Link>
                <p className="text-sm text-slate-500 mt-0.5">{item.product.material} / {item.product.weight}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="px-3 py-1.5 hover:bg-slate-50 transition-colors text-slate-600 text-sm"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-sm font-medium min-w-[2.5rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-3 py-1.5 hover:bg-slate-50 transition-colors text-slate-600 text-sm"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-slate-900">
                      {(item.product.price * item.quantity).toFixed(2)} zł
                    </span>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-1"
                      title="Usuń"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 sticky top-24">
            <h2 className="text-lg font-bold mb-4">Podsumowanie</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Produkty ({items.reduce((s, i) => s + i.quantity, 0)} szt.)</span>
                <span className="font-medium">{totalPrice.toFixed(2)} zł</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Dostawa</span>
                <span className={`font-medium ${deliveryCost === 0 ? "text-emerald-600" : ""}`}>
                  {deliveryCost === 0 ? "Gratis" : `${deliveryCost.toFixed(2)} zł`}
                </span>
              </div>
              {totalPrice < 150 && (
                <p className="text-xs text-emerald-600 bg-emerald-50 p-2 rounded-lg">
                  Dodaj jeszcze za {(150 - totalPrice).toFixed(2)} zł, aby uzyskać darmową dostawę
                </p>
              )}
              <div className="border-t border-slate-100 pt-3 flex justify-between">
                <span className="font-bold text-base">Razem</span>
                <span className="font-bold text-xl">{finalTotal.toFixed(2)} zł</span>
              </div>
            </div>
            <Link
              href="/zamowienie"
              className="mt-6 block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3.5 px-6 rounded-xl transition-colors text-center shadow-lg hover:shadow-emerald-500/25 active:scale-95"
            >
              Przejdź do zamówienia
            </Link>
            <Link
              href="/produkty"
              className="mt-3 block w-full text-center text-sm text-slate-500 hover:text-emerald-600 transition-colors"
            >
              Kontynuuj zakupy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
