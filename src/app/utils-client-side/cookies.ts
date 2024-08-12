import Cookies from "js-cookie";
import { UserData } from "../types";

export const setUserDataCookie = (userData: UserData): void => {
  console.log("set data", userData);
  const expiresInTwelveHours = 1 / 12;
  Cookies.set("userData", JSON.stringify(userData), {
    expires: expiresInTwelveHours,
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
