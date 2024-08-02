"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { UserData } from "../types";
import {
  getUserDataFromCookie,
  setUserDataCookie,
} from "../utils-client-side/cookies";

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
    const cookieData = getUserDataFromCookie();
    if (cookieData) {
      setUserData(cookieData);
    }
  }, []);

  const handleSetUserData = (data: UserData | null) => {
    setUserData(data);
    if (data) {
      setUserDataCookie(data);
    } else {
      Cookies.remove("userData");
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
