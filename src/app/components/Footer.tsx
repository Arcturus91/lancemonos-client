import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-2 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">
            <Link className="text-white hover:text-gray-400" href="/">
              Lancémonos Nomás
            </Link>
          </div>
          <div className="text-center">
            <p className="text-lg">
              &copy; {new Date().getFullYear()} Lancémonos Nomás. All rights
              reserved.
            </p>
          </div>

          <div className="space-x-4">
            <Link className="text-white hover:text-gray-400" href="/">
              Home
            </Link>
            <Link className="text-white hover:text-gray-400" href="/programa">
              Programa
            </Link>
            <Link className="text-white hover:text-gray-400" href="/login">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
