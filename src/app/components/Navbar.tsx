"use client";

import React from "react";
import Link from "next/link";
import AlgoliaSearchComponent from "./AlgoliaSearchComponent";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Autocomplete from "./Autocomplete";
const Navbar: React.FC = () => {
  const path = usePathname();

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
          <Link href="/courses" className="text-white hover:text-gray-400">
            Programa
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/auth" className="text-white hover:text-gray-400">
            Log In
          </Link>
          {path === "/courses" && (
            <div className="p-4 text-black">
              <AlgoliaSearchComponent />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
