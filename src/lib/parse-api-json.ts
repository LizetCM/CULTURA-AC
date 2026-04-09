/** Vercel (y similares) suelen limitar el cuerpo HTTP a ~4.5 MB; la respuesta a veces no es JSON. */
export function parseApiJsonBody<T>(raw: string, status: number): { ok: true; data: T } | { ok: false; message: string } {
  const trimmed = raw.trim();
  if (!trimmed) {
    return {
      ok: false,
      message:
        status === 413
          ? "El archivo supera el límite del alojamiento (~4 MB). Usa un PDF más ligero o comprímelo."
          : `El servidor no respondió con datos útiles (${status}).`,
    };
  }
  try {
    return { ok: true, data: JSON.parse(trimmed) as T };
  } catch {
    return {
      ok: false,
      message:
        status === 413 || status >= 500
          ? "La petición pudo ser demasiado grande o el servidor falló. Prueba con un CV en PDF de menos de 4 MB."
          : `Respuesta inesperada del servidor (${status}). Si adjuntaste un archivo muy pesado, reduce el tamaño e inténtalo de nuevo.`,
    };
  }
}
