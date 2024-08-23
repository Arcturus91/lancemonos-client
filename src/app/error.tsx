"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Algo salió mal!</h2>
      <p className="text-gray-600 mb-4">
        Lo sentimos, ha ocurrido un error inesperado.
      </p>
      <button className="lancemonos-button" onClick={() => reset()}>
        Intentar de nuevo
      </button>
      <a href="/" className="lancemonos-button">
        Volver al inicio
      </a>
    </div>
  );
}
