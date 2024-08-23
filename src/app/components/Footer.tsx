import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-4 mt-auto">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-xl font-extrabold">
            <a
              className="text-white hover:text-gray-300 transition duration-300 ease-in-out"
              href="/"
            >
              Lancémonos Nomás
            </a>
          </div>
          <div className="text-center text-sm md:text-base">
            <p>
              &copy; {new Date().getFullYear()} Lancémonos Nomás.
              <span className="hidden md:inline">
                {" "}
                Todos los derechos reservados
              </span>
            </p>
          </div>
          <div className="space-x-6 text-sm md:text-base font-medium">
            <a
              className="text-white hover:text-gray-300 transition duration-300 ease-in-out border-b-2 border-transparent hover:border-gray-300 pb-1"
              href="/courses"
            >
              Programa
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
