// next.config.ts ustawia basePath na "/3dfish-sklep" w produkcji (GitHub Pages,
// sklep stoi pod subpath). basePath Next.js prefiksuje TYLKO next/image, next/link
// i zasoby _next — NIE dotyka surowych <img src="/..."> wskazujących na pliki w public/.
// Dlatego absolutne ścieżki obrazków (np. "/products/foo.jpg") trzeba ręcznie
// prefiksować tym samym basePath, inaczej pod subpath dają 404 (urwane zdjęcia).
const BASE_PATH = process.env.NODE_ENV === "production" ? "/3dfish-sklep" : "";

/** Dokleja basePath do absolutnej ścieżki publicznego assetu. Ścieżki względne/zewnętrzne zwraca bez zmian. */
export function assetPath(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}
