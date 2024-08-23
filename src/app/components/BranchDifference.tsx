import React from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";

const features = [
  {
    icon: <CalendarMonthIcon fontSize="large" />,
    title: "Primera cita en 30 días",
    description:
      "El 97% de nuestros clientes tienen su primera cita en 30 días iniciado el programa.",
  },
  {
    icon: <PersonSearchIcon fontSize="large" />,
    title: "Servicio personalizado",
    description:
      "Las iniciales es para adecuar el proceso a tu situación personal.",
  },
  {
    icon: <GroupAddIcon fontSize="large" />,
    title: "Salidas a hacer interacciones",
    description: "Un coach te acompañará en tus salidas a hacer interacciones.",
  },
  {
    icon: <InterpreterModeIcon fontSize="large" />,
    title: "Juego de roles con una mujer",
    description:
      "Practicarás con una mujer el cómo abordarla e invitarla a salir.",
  },
];

const BranchDifference: React.FC = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          ¿Porqué Somos Diferentes?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="bg-white rounded-full p-4 inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BranchDifference;
