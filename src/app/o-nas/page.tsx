import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 to-emerald-900 rounded-2xl p-8 md:p-16 text-white mb-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">O nas</h1>
        <p className="text-lg text-slate-300 max-w-2xl">
          Jesteśmy zespołem pasjonatów wędkarstwa i druku 3D. Łączymy obie pasje,
          tworząc unikalne akcesoria, które naprawdę rozwiązują problemy wędkarzy.
        </p>
      </div>

      {/* Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Nasza historia</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              3DFish powstało w 2024 roku z prostej obserwacji: wędkarze często potrzebują
              niestandardowych rozwiązań, których nie ma w tradycyjnych sklepach wędkarskich.
            </p>
            <p>
              Zaczęliśmy od drukowania drobnych uchwytów i organizerów na własne potrzeby.
              Gdy koledzy z łowiska zaczęli prosić o te same gadżety, wiedzieliśmy że
              trafiamy w potrzebę rynku.
            </p>
            <p>
              Dziś projektujemy i drukujemy ponad 50 różnych akcesoriów wędkarskich,
              używając najwyższej jakości filamentów odpornych na UV, wodę i temperaturę.
              Każdy produkt przechodzi testy w realnych warunkach — nad wodą.
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-slate-50 rounded-2xl p-12 flex items-center justify-center">
          <div className="text-center">
            <div className="text-8xl mb-4">🖨️🎣</div>
            <p className="text-slate-500 font-medium">Druk 3D + Wędkarstwo = 3DFish</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <StatCard number="2000+" label="Zadowolonych klientów" />
        <StatCard number="50+" label="Unikatowych produktów" />
        <StatCard number="8" label="Drukarek 3D" />
        <StatCard number="98%" label="Pozytywnych opinii" />
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Nasze wartości</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ValueCard
            icon="🎯"
            title="Precyzja"
            description="Każdy produkt jest projektowany z dokładnością do 0.1mm i testowany przed wprowadzeniem do sprzedaży."
          />
          <ValueCard
            icon="♻️"
            title="Ekologia"
            description="Używamy biodegradowalnych filamentów PLA gdzie to możliwe. Minimalizujemy odpady produkcyjne."
          />
          <ValueCard
            icon="🤝"
            title="Społeczność"
            description="Słuchamy wędkarzy. Wiele naszych produktów powstało na podstawie sugestii klientów."
          />
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white rounded-2xl p-8 md:p-12 text-center border border-slate-100 shadow-sm">
        <h2 className="text-2xl font-bold mb-3">Masz pomysł na produkt?</h2>
        <p className="text-slate-500 mb-6 max-w-lg mx-auto">
          Chętnie realizujemy projekty na zamówienie. Napisz do nas z pomysłem, a
          wycenimy realizację i czas druku.
        </p>
        <Link
          href="/kontakt"
          className="inline-flex bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          Skontaktuj się
        </Link>
      </div>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-white rounded-xl p-6 text-center border border-slate-100 shadow-sm">
      <div className="text-3xl font-bold text-emerald-600 mb-1">{number}</div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  );
}

function ValueCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}
