import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎣</span>
              <span className="font-bold text-lg text-white">
                <span className="text-emerald-400">3D</span>Fish
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Projektujemy i drukujemy najlepsze akcesoria wędkarskie na drukarkach 3D.
              Każdy produkt to efekt pasji do wędkarstwa i nowoczesnych technologii.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Sklep</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/produkty" className="hover:text-emerald-400 transition-colors">Wszystkie produkty</Link></li>
              <li><Link href="/produkty?kategoria=uchwyty" className="hover:text-emerald-400 transition-colors">Uchwyty na wędki</Link></li>
              <li><Link href="/produkty?kategoria=organizery" className="hover:text-emerald-400 transition-colors">Organizery</Link></li>
              <li><Link href="/produkty?kategoria=sygnalizatory" className="hover:text-emerald-400 transition-colors">Sygnalizatory</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Informacje</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/o-nas" className="hover:text-emerald-400 transition-colors">O nas</Link></li>
              <li><Link href="/kontakt" className="hover:text-emerald-400 transition-colors">Kontakt</Link></li>
              <li><span className="cursor-default">Regulamin</span></li>
              <li><span className="cursor-default">Polityka prywatności</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                kontakt@3dfish.pl
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                +48 123 456 789
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Warszawa, Polska
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} 3DFish. Wszystkie prawa zastrzeżone.</p>
          <p className="mt-1 text-slate-500">Drukowane z pasją na drukarkach 3D 🖨️</p>
        </div>
      </div>
    </footer>
  );
}
