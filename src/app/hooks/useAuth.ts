"use client";

import { useState, useEffect, useCallback } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    console.log("useAuth called");
    setIsLoading(true);

    const cachedAuth = sessionStorage.getItem("sessionAuthenticated");
    console.log("useAuth value", cachedAuth);
    if (cachedAuth === "true") {
      setIsAuthenticated(true);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth-validate`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
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
