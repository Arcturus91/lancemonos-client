"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserData } from "../types";
import { useUser } from "../contexts/UserContext";
import { useAuthContext } from "../contexts/AuthContext";
import Spinner from "../components/LoadingSpinner";

interface ApiGatewayResponse {
  body: UserData;
  success: boolean;
  error?: string;
}

const PasswordChangePage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { checkAuth } = useAuthContext();
  const { setUserData } = useUser();
  const router = useRouter();

  const validatePassword = (password: string): boolean => {
    // Implement password strength validation logic here
    return password.length >= 8; // Simple example
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }
    if (!validatePassword(newPassword)) {
      setError("New password does not meet strength requirements");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth-recovery`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, newPassword }),
        }
      );

      const responseData = (await response.json()) as ApiGatewayResponse;

      if (!response.ok) {
        throw new Error(
          responseData.error || "An error occurred during password change"
        );
      }

      if (responseData.success) {
        sessionStorage.setItem("sessionAuthenticated", JSON.stringify(true));
        checkAuth();
        setUserData(responseData.body);
        router.refresh();
        router.push("/courses");
      } else {
        throw new Error("Password change was not successful");
      }
    } catch (error: any) {
      console.error("Password change error:", error);
      setError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Cambia tu contraseña</h1>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form className="w-full max-w-sm" onSubmit={handleLogin}>
        {/* Email input */}
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
            aria-label="Email address"
          />
        </div>
        {/* Current password input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Contraseña actual
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Coloca tu contraseña actual"
            required
            aria-label="Current password"
          />
        </div>
        {/* New password input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="newPassword"
          >
            Nueva contraseña
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Coloca tu nueva contraseña"
            required
            aria-label="New password"
          />
        </div>
        {/* Confirm new password input */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmNewPassword"
          >
            Confirmar nueva contraseña
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Confirma tu nueva contraseña"
            required
            aria-label="Confirm new password"
          />
        </div>
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Inicio
          </a>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Cambia"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordChangePage;
