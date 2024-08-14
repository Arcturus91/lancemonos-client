"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { UserData } from "../types";
import { useUser } from "../contexts/UserContext";
import Cookies from "js-cookie";
import { useAuthContext } from "../contexts/AuthContext";
interface ApiGatewayResponse {
  body: UserData;
  success: true;
  error?: any;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { checkAuth } = useAuthContext();
  useEffect(() => {
    Cookies.remove("auth-token");
    localStorage.removeItem("userData");
    sessionStorage.removeItem("sessionAuthenticated");
    localStorage.removeItem("courseContent");
  }, []);

  const { setUserData } = useUser();

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const responseData = (await response.json()) as ApiGatewayResponse;

      if (!response.ok) {
        throw new Error(responseData.error || "An error occurred during login");
      }

      console.log("API Gateway response:", responseData);

      if (responseData.success) {
        sessionStorage.setItem("sessionAuthenticated", JSON.stringify(true));
        checkAuth();
        console.log("setuserdata", responseData.body);
        setUserData(responseData.body);
        router.refresh();
        router.push("/courses");
      } else {
        throw new Error("Login was not successful");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Login</h1>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form className="w-full max-w-sm" onSubmit={handleLogin}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Home
          </a>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isLoading}
          >
            {isLoading ? "Ingresando..." : "Ingresa"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
