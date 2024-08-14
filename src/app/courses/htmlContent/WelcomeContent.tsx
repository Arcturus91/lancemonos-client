// WelcomeContent.tsx
import React from "react";

const WelcomeContent: React.FC = () => (
  <div className="welcome-content max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md h-full overflow-y-auto pb-16">
    <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
      Bienvenido al programa
    </h1>
    <p className="mb-4 text-gray-700 leading-relaxed">
      El programa Lánzate se basa a llevarte a conocer mujeres a través de 3
      vías principales:
    </p>
    <ol className="list-decimal pl-6 mb-4 space-y-2">
      <li className="text-gray-700">Interacciones en app de citas</li>
      <li className="text-gray-700">Interacciones en persona</li>
      <li className="text-gray-700">Interacciones en círculos sociales</li>
    </ol>

    <p className="mb-4 text-gray-700 leading-relaxed">
      Cada una de estas vías tiene sus propias estrategias y técnicas que
      aprenderás a lo largo del programa pero al final, todo se reduce a 2
      reglas principales:
    </p>
    <ul className="list-disc pl-6 mb-4 space-y-2">
      <li className="text-gray-700">Acción masiva imperfecta</li>
      <li className="text-gray-700">Mantener un estado de ánimo adecuado</li>
    </ul>
    <p className="mb-4 text-gray-700 leading-relaxed">
      A lo largo del programa, trabajaremos una estructura clara y aplicable
      para las 3 vías de conocer mujeres, conseguiremos tu primera cita y a
      partir de ahí optimizaremos para que las siguientes citas sean de mejor
      calidad. Trabajaremos también mentalidad y cómo iniciar una relación sana.
    </p>

    <p className="text-gray-700 leading-relaxed">
      Estamos emocionados de acompañarte en este viaje de crecimiento personal y
      social pero ahora toca comenzar, así que, <b>Lancémonos Nomás!</b>
    </p>
  </div>
);

export default WelcomeContent;
