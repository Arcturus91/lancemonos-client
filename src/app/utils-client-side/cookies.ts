import Cookies from "js-cookie";
import { UserData } from "../types";

export const setUserDataCookie = (userData: UserData): void => {
  console.log("set data", userData);
  Cookies.set("userData", JSON.stringify(userData), {
    expires: 7,
    secure: true,
    sameSite: "strict",
  });
};

export const getUserDataFromCookie = (): UserData | null => {
  const userDataString = Cookies.get("userData");
  return userDataString ? JSON.parse(userDataString) : null;
};

export const deleteSpecificCookies = (cookiesName: string) => {
  Cookies.remove(cookiesName);
};
