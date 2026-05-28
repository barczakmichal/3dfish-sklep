"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { Suspense } from "react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("kategoria") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "rating">("default");

  let filtered = activeCategory === "all"
    ? products
    : products.filter((p) => p.category === activeCategory);

  if (sortBy === "price-asc") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Produkty</h1>
        <p className="text-slate-500">
          Przeglądaj naszą kolekcję akcesoriów wędkarskich drukowanych 3D
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex flex-wrap gap-2 flex-1">
          <FilterButton
            active={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
          >
            Wszystkie
          </FilterButton>
          {categories.map((cat) => (
            <FilterButton
              key={cat.id}
              active={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.icon} {cat.name}
            </FilterButton>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        >
          <option value="default">Sortuj: domyślnie</option>
          <option value="price-asc">Cena: rosnąco</option>
          <option value="price-desc">Cena: malejąco</option>
          <option value="rating">Ocena: najwyższa</option>
        </select>
      </div>

      <p className="text-sm text-slate-400 mb-6">
        Znaleziono {filtered.length} {filtered.length === 1 ? "produkt" : filtered.length < 5 ? "produkty" : "produktów"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">🔍</p>
          <p className="text-lg font-medium text-slate-600">Brak produktów w tej kategorii</p>
          <p className="text-slate-400 mt-1">Spróbuj wybrać inną kategorię</p>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 sm:px-6 py-8"><p>Ładowanie...</p></div>}>
      <ProductsContent />
    </Suspense>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        active
          ? "bg-emerald-500 text-white shadow-sm"
          : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
      }`}
    >
      {children}
    </button>
  );
}
