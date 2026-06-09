"use client";

import { useState } from "react";
import { products, categories } from "@/data/products";
import { printInfoMap } from "@/data/printInfo";
import { Category } from "@/types";

export default function AdminProductsPage() {
  const [filterCategory, setFilterCategory] = useState<Category | "all">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = filterCategory === "all"
    ? products
    : products.filter((p) => p.category === filterCategory);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-slate-900">Produkty i druk 3D</h1>
        <div className="text-sm text-slate-500">{products.length} produktów</div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilterCategory("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterCategory === "all"
              ? "bg-emerald-500 text-white"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          Wszystkie
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilterCategory(cat.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterCategory === cat.id
                ? "bg-emerald-500 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((product) => {
          const printInfo = printInfoMap[product.id];
          const isExpanded = expandedId === product.id;

          return (
            <div
              key={product.id}
              id={`product-${product.id}`}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : product.id)}
                className="w-full text-left p-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-lg shrink-0">
                    {categories.find((c) => c.id === product.category)?.icon || "📦"}
                  </div>
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-slate-500">
                      {product.material} · {product.printTime} · {product.price.toFixed(2)} zł
                      {!product.inStock && (
                        <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Niedostępny</span>
                      )}
                    </div>
                  </div>
                </div>
                <span className={`text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </button>

              {isExpanded && printInfo && (
                <div className="border-t border-slate-100 p-5 bg-slate-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold text-sm text-slate-700 mb-3 flex items-center gap-2">
                        <span>📐</span> Źródło modelu 3D
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="text-slate-500 shrink-0 w-24">Projekt:</span>
                          <span className="font-medium">{printInfo.stlSource}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-slate-500 shrink-0 w-24">Plik:</span>
                          <span className="font-mono text-xs bg-slate-200 px-2 py-1 rounded">{printInfo.stlFileName}</span>
                        </div>
                        {product.makerWorldUrl && (
                          <div className="flex items-start gap-2">
                            <span className="text-slate-500 shrink-0 w-24">MakerWorld:</span>
                            <a href={product.makerWorldUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-medium">
                              Pobierz plik 3D (#{product.makerWorldModelId})
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm text-slate-700 mb-3 flex items-center gap-2">
                        <span>🎯</span> Filament
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="text-slate-500 shrink-0 w-24">Typ:</span>
                          <span className="font-medium">{printInfo.filamentType}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-slate-500 shrink-0 w-24">Marka:</span>
                          <span className="font-medium">{printInfo.filamentBrand}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm text-slate-700 mb-3 flex items-center gap-2">
                        <span>⚙️</span> Ustawienia druku
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="text-slate-500 shrink-0 w-24">Profil:</span>
                          <span className="font-medium">{printInfo.slicerProfile}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-slate-500 shrink-0 w-24">Temperatura:</span>
                          <span className="font-medium">Dysza {printInfo.nozzleTemp}°C / Stół {printInfo.bedTemp}°C</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-slate-500 shrink-0 w-24">Wypełnienie:</span>
                          <span className="font-medium">{printInfo.infill}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-slate-500 shrink-0 w-24">Podpory:</span>
                          <span className={`font-medium ${printInfo.supports ? "text-amber-600" : "text-emerald-600"}`}>
                            {printInfo.supports ? "Wymagane" : "Nie potrzebne"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm text-slate-700 mb-3 flex items-center gap-2">
                        <span>⏱️</span> Parametry produktu
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="text-slate-500 shrink-0 w-24">Czas druku:</span>
                          <span className="font-medium">{printInfo.estimatedTime}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-slate-500 shrink-0 w-24">Waga:</span>
                          <span className="font-medium">{product.weight}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-slate-500 shrink-0 w-24">Wymiary:</span>
                          <span className="font-medium">{product.dimensions}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {printInfo.notes && (
                    <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800">
                      <span className="font-bold">Uwagi produkcyjne: </span>{printInfo.notes}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
