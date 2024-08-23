export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Página no encontrada</h2>
      <p className="text-gray-600 mb-4">
        Lo sentimos, la página que buscas no existe.
      </p>
      <a href="/" className="lancemonos-button">
        Volver al inicio
      </a>
    </div>
  );
}
