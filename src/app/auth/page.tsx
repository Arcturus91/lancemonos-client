"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
//import { useAuth } from "../../context/AuthContext";

const LoginPage: React.FC = () => {
  //const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login data", e, email, password);

    try {
      const apiGatewayResponse = await fetch(
        "https://q8k8prlpy5.execute-api.sa-east-1.amazonaws.com/prod/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_GATEWAY_KEY as string,
          },
          body: JSON.stringify({ email, password }),
          credentials: "include", // This is crucial for receiving and sending cookies
        }
      );

      if (!apiGatewayResponse.ok) {
        throw new Error(`HTTP error! status: ${apiGatewayResponse.status}`);
      }

      const responseData = await apiGatewayResponse.json();
      console.log("API Gateway response:", responseData);

      if (responseData.message === "cookieTokenAdded") {
        router.push("/courses");
      }

      return responseData;
    } catch (error) {
      console.error("Login error:", error);
      // Handle the error appropriately (e.g., show an error message to the user)
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Login</h1>
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
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Log In
          </button>
          <a
            href="/"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Home
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
