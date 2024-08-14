"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AlgoliaSearchComponent from "../courses/components/AlgoliaSearchComponent";
import { useAuthContext } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import { videoTitleFullList } from "../courses/videoTitleFullList";
import Spinner from "./LoadingSpinner";

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

  useEffect(() => {
    // This will run whenever userData changes
    console.log("userData and isAuth in Navbar:", userData, isAuthenticated);
  }, [userData, isAuthenticated]);

  return (
    <nav className="bg-black text-white">
      <div className="container-nav mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4 mx-2">
          <div className="text-2xl font-bold">
            <a href="/" className="text-white">
              Lancémonos Nomás
            </a>
          </div>
          <a href="/" className="text-white hover:text-gray-400">
            Home
          </a>
          <a href="/courses" className="text-white hover:text-gray-400">
            Programa
          </a>
        </div>
        <div className="flex items-center space-x-4">
          {isLoading ? (
            <Spinner size="medium" />
          ) : isAuthenticated ? (
            <>
              <p className="text-white">{userData?.email}</p>
              <p className="text-white">Progreso: {userProgress}%</p>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-400"
              >
                Log Out
              </button>
              {userData?.role === "admin" ? (
                <a
                  href="/video-upload"
                  className="text-white hover:text-gray-400"
                >
                  Video Upload
                </a>
              ) : null}
            </>
          ) : (
            <a href="/auth" className="text-white hover:text-gray-400">
              Log In
            </a>
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
