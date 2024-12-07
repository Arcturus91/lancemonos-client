"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { UserData } from "../types";
import { useUser } from "../contexts/UserContext";
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

      if (responseData.success) {
        sessionStorage.setItem("sessionAuthenticated", JSON.stringify(true));
        checkAuth();
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
    <div className="container-landing">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6 text-center">Login</h1>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleLogin}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Correo
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Coloca tu correo"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Coloca tu password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="lancemonos-button"
              disabled={isLoading}
            >
              {isLoading ? "Ingresando..." : "Ingresa"}
            </button>
            <a
              href="/auth-pass-change"
              className="inline-block align-baseline font-bold text-sm text-gray-600 hover:text-black"
            >
              Cambiar contraseña?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
