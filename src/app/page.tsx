"use client";
import React from "react";
import { useAuth } from "./hooks/useAuth";
import BranchDifference from "./components/BranchDifference";
import FeaturedIn from "./components/FeaturedIn";
import ContactUs from "./components/ContactUs";

const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="container-landing">
      <h1 className="mt-[10vh]">Bienvenido a Lancémonos Nomás</h1>
      <p className="text-xl text-gray-700 mb-6 text-center max-w-2xl">
        {`El sistema comprobado para volver a tener citas después de una ruptura o
        separación.`}
        <br />
        {`Sin tener que volverte un "ALFA".`}
      </p>
      <div className="flex items-center justify-between">
        <a href="/courses" className="lancemonos-button">
          Ir al Programa
        </a>
        {!isAuthenticated && (
          <a href="/auth" className="lancemonos-button">
            Ingresa
          </a>
        )}
      </div>
      <BranchDifference />
      <div className="w-full rounded">
        <FeaturedIn />
      </div>
      <ContactUs />
    </div>
  );
};

export default LandingPage;
