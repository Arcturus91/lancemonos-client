"use client";

import { useState, useEffect, useCallback } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    setIsLoading(true);

    const cachedAuth = sessionStorage.getItem("sessionAuthenticated");
    if (cachedAuth === "true") {
      setIsAuthenticated(true);
      setIsLoading(false);
      return;
    }
    try {
      const storedUserData = localStorage.getItem("userData");
      if (!storedUserData) {
        setIsAuthenticated(false);

        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth-logout`, {
          method: "POST",
        });
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth-validate`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log("useAuth data", data);
      if (!data.isAuthenticated) localStorage.removeItem("userData");
      setIsAuthenticated(data.isAuthenticated);
      sessionStorage.setItem(
        "sessionAuthenticated",
        JSON.stringify(data.isAuthenticated)
      );
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { isAuthenticated, isLoading, checkAuth };
};
