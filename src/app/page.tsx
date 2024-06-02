import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="container-landing mx-auto p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">
        Bienvenido a Lancémonos Nomás
      </h1>
      <p className="text-xl text-gray-700 mb-6 text-center max-w-2xl">
        Discover our programs and enhance your learning experience. Click the
        button below to explore our program page.
      </p>
      <div className="flex items-center justify-between">
        <a
          href="/programa"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mx-2 rounded focus:outline-none focus:shadow-outline"
        >
          Go to Program
        </a>
        <a
          href="/auth"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mx-2 rounded focus:outline-none focus:shadow-outline"
        >
          Log in
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
