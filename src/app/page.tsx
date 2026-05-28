"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts, categories } from "@/data/products";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-9xl">🎣</div>
          <div className="absolute bottom-10 right-20 text-8xl">🖨️</div>
          <div className="absolute top-40 right-40 text-7xl">🐟</div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32 relative">
          <div className="max-w-3xl">
            <span className="inline-block bg-emerald-500/20 text-emerald-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-emerald-500/30">
              Drukowane z pasją na drukarkach 3D
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Akcesoria wędkarskie
              <br />
              <span className="text-emerald-400">nowej generacji</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl">
              Projektujemy i drukujemy unikalne akcesoria wędkarskie, których nie znajdziesz
              nigdzie indziej. Precyzja druku 3D spotyka pasję do wędkarstwa.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/produkty"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25 active:scale-95"
              >
                Zobacz produkty
              </Link>
              <Link
                href="/o-nas"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl transition-all border border-white/20"
              >
                Poznaj nas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Zalety */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
              title="Gwarancja jakości"
              description="Każdy produkt przechodzi kontrolę jakości. 30 dni na zwrot bez pytań."
            />
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="Szybka dostawa"
              description="Wysyłka w 24h. Darmowa dostawa przy zamówieniach powyżej 150 zł."
            />
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              }
              title="Zaprojektowane z pasją"
              description="Każdy produkt to efekt lat doświadczenia wędkarskiego i inżynierii 3D."
            />
          </div>
        </div>
      </section>

      {/* Kategorie */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Kategorie produktów</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Znajdź idealny sprzęt do swojego stylu wędkowania
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/produkty?kategoria=${cat.id}`}
                className="bg-white rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-slate-100"
              >
                <span className="text-4xl block mb-3">{cat.icon}</span>
                <span className="font-medium text-sm text-slate-700">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Polecane produkty */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Polecane produkty</h2>
              <p className="text-slate-500">Bestsellery i nowości w naszym sklepie</p>
            </div>
            <Link
              href="/produkty"
              className="hidden sm:inline-flex items-center gap-1 text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
            >
              Zobacz wszystkie
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link
              href="/produkty"
              className="inline-flex items-center gap-1 text-emerald-600 font-medium"
            >
              Zobacz wszystkie produkty
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Darmowa dostawa od 150 zł
            </h2>
            <p className="text-emerald-100 mb-6 max-w-lg mx-auto">
              Zamów swoje ulubione akcesoria wędkarskie drukowane 3D i ciesz się
              darmową dostawą na terenie całej Polski.
            </p>
            <Link
              href="/produkty"
              className="inline-flex bg-white text-emerald-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-emerald-50 transition-colors active:scale-95"
            >
              Przeglądaj produkty
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-slate-500 text-sm">{description}</p>
    </div>
  );
}
