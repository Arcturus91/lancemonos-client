import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black text-white">
      <div className="container-nav mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold">
            <Link href="/" className="text-white">
              Lancémonos Nomás
            </Link>
          </div>
          <Link href="/" className="text-white hover:text-gray-400">
            Home
          </Link>
          <Link href="/programa" className="text-white hover:text-gray-400">
            Programa
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/auth" className="text-white hover:text-gray-400">
            Log In
          </Link>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="px-2 py-1 rounded-l border-2 border-gray-400 text-black"
            />
            <button className="bg-white text-black px-2 py-1 border-2 border-gray-400 border-l-0 rounded-r">
              🔍
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
