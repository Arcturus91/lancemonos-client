"use client";
import { useState, useEffect } from "react";

export const useResponsiveLayout = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(
        (window.innerWidth < 431 && window.innerHeight > 400) ||
          (window.innerWidth > 431 && window.innerHeight < 400) ||
          (window.innerWidth < 431 && window.innerHeight < 400)
      );
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return { isSmallScreen, isExpanded, toggleExpand };
};
