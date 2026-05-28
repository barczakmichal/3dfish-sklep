import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
      <p className="text-6xl mb-4">🔍</p>
      <h1 className="text-3xl font-bold mb-3">Strona nie znaleziona</h1>
      <p className="text-slate-500 mb-6">
        Szukana strona nie istnieje lub została przeniesiona.
      </p>
      <Link
        href="/"
        className="inline-flex bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
      >
        Wróć na stronę główną
      </Link>
    </div>
  );
}
