"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { UserData } from "../types";

interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      console.log("user data parseado", JSON.parse(userData));
      setUserData(JSON.parse(userData));
    }
  }, []);

  const handleSetUserData = (data: UserData | null) => {
    console.log("handleSetUserData", data);
    setUserData(data);
    if (data) {
      localStorage.setItem("userData", JSON.stringify(data));
    } else {
      localStorage.removeItem("userData");
    }
  };

  return (
    <UserContext.Provider value={{ userData, setUserData: handleSetUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
