"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AlgoliaSearchComponent from "../courses/components/AlgoliaSearchComponent";
import { useAuthContext } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import { videoTitleFullList } from "../courses/videoTitleFullList";
import Spinner from "./LoadingSpinner";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const Navbar: React.FC = () => {
  const path = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading, checkAuth } = useAuthContext();
  const { userData, setUserData } = useUser();
  const totalContentAmount = Object.keys(videoTitleFullList).length;
  const videosWatchedAmount = userData?.videosWatched.length ?? 0;
  const userProgress = Math.ceil(
    100 * (videosWatchedAmount / totalContentAmount)
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        sessionStorage.removeItem("sessionAuthenticated");
        setUserData(null);
        await checkAuth();
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleVideoSelection = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    console.log("userData and isAuth in Navbar:", userData, isAuthenticated);
  }, [userData, isAuthenticated]);

  return (
    <nav className="bg-black text-white">
      <div className="container-nav">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 mx-2">
            <div className="text-2xl font-bold">
              <a href="/" className="text-white">
                Lancémonos Nomás
              </a>
            </div>
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <MenuOpenIcon /> : <MenuIcon />}
            </button>
          </div>
          <div
            className={`md:flex items-center space-x-4 ${
              isMenuOpen
                ? "flex flex-col absolute top-16 left-0 right-0 bg-black p-4 max-h-[calc(100vh-4rem)] overflow-y-auto"
                : "hidden"
            }`}
          >
            <a
              href="/"
              className="text-white hover:text-gray-400 block md:inline-block py-2 md:py-0"
            >
              Inicio
            </a>
            <a
              href="/courses"
              className="text-white hover:text-gray-400 block md:inline-block py-2 md:py-0"
            >
              Programa
            </a>
            {isLoading ? (
              <Spinner size="medium" />
            ) : isAuthenticated ? (
              <>
                <p className="text-white py-2 md:py-0">{userData?.email}</p>
                <p className="text-white py-2 md:py-0">
                  Progreso: {userProgress}%
                </p>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-gray-400 py-2 md:py-0"
                >
                  Log Out
                </button>
                {userData?.role === "admin" ? (
                  <a
                    href="/video-upload"
                    className="text-white hover:text-gray-400 block md:inline-block py-2 md:py-0"
                  >
                    Video Upload
                  </a>
                ) : null}
              </>
            ) : (
              <a
                href="/auth"
                className="text-white hover:text-gray-400 block md:inline-block py-2 md:py-0"
              >
                Log In
              </a>
            )}
            {path === "/courses" && (
              <div className="p-4 text-black w-full md:w-auto">
                <AlgoliaSearchComponent
                  handleVideoSelection={handleVideoSelection}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
