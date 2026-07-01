/**
 * Resuelve la ruta completa de una imagen considerando el BASE_URL de Vite.
 * En desarrollo (Vite dev server) BASE_URL es "/", en producción (GitHub Pages) es "/Portfolio/".
 */
export function imagePath(src: string): string {
  const base = import.meta.env.BASE_URL; // "/" en dev, "/Portfolio/" en prod
  // Si la ruta ya es absoluta y empieza con /, anteponemos el base
  if (src.startsWith("/")) {
    // base ya termina en /, así que quitamos la / inicial de src para evitar duplicación
    return `${base}${src.slice(1)}`;
  }
  return src;
}
