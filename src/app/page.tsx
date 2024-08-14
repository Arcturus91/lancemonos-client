"use client";
import React from "react";
import { useAuth } from "./hooks/useAuth";

const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="container-landing mx-auto p-6 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">
        Bienvenido a Lancémonos Nomás
      </h1>
      <p className="text-xl text-gray-700 mb-6 text-center max-w-2xl">
        {`El sistema comprobado para volver a tener citas después de una ruptura o
        separación.`}
        <br />
        {`Sin tener que volverte un "ALFA".`}
      </p>
      <div className="flex items-center justify-between">
        <a
          href="/courses"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mx-2 rounded focus:outline-none focus:shadow-outline"
        >
          Ir al Programa
        </a>
        {!isAuthenticated && (
          <a
            href="/auth"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mx-2 rounded focus:outline-none focus:shadow-outline"
          >
            Ingresa
          </a>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
