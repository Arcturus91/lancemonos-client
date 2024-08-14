import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-2 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">
            <a className="text-white hover:text-gray-400" href="/">
              Lancémonos Nomás
            </a>
          </div>
          <div className="text-center">
            <p className="text-lg">
              &copy; {new Date().getFullYear()} Lancémonos Nomás. Todos los
              derechos reservados
            </p>
          </div>

          <div className="space-x-4">
            <a className="text-white hover:text-gray-400" href="/">
              Inicio
            </a>
            <a className="text-white hover:text-gray-400" href="/courses">
              Programa
            </a>
            <a className="text-white hover:text-gray-400" href="/auth">
              Ingresa
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
