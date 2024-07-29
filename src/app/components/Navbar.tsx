"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AlgoliaSearchComponent from "../courses/components/AlgoliaSearchComponent";
import { useAuth } from "../hooks/useAuth";
import { useAuthContext } from "../contexts/AuthContext";

const Navbar: React.FC = () => {
  const path = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading, checkAuth } = useAuthContext();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth-logout`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      console.log("data in logout:", data);
      if (data.success) {
        await checkAuth();
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
          {isLoading ? (
            <span>Loading...</span>
          ) : isAuthenticated ? (
            <>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-400"
              >
                Log Out
              </button>
              <Link
                href="/video-upload"
                className="text-white hover:text-gray-400"
              >
                Video Upload
              </Link>
            </>
          ) : (
            <Link href="/auth" className="text-white hover:text-gray-400">
              Log In
            </Link>
          )}
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
