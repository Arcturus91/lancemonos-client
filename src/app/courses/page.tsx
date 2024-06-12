"use client";

import React, { useState } from "react";

import VideoPlayer from "./components/VideoPlayer";
import ContentList from "./components/ContentList";
import {
  introContent,
  introVideoUrls,
  present24hrsHTML,
} from "./content/lanzate/intro-content";
import TextContent from "./components/TextContent";

const LanzateProgramPage: React.FC = () => {
  const [contentType, setContentType] = useState("video");
  const [selectedItem, setSelectedItem] = useState(introContent[0]);

  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
    if (item.includes("(T)")) {
      setContentType("text");
    } else {
      setContentType("video");
    }
  };

  const titleList = [
    "1. Introduction",
    "2. El Marco",
    "3. Sitema N.O.M.A.S.",
    "4. Sistema Lancémonos",
    "5. Círculos Sociales",
    "6. Citas",
    "7. Chats y Apps de Citas",
    "8. Relaciones",
    "9. Sesiones de Análisis de Interacciones",
    "10. Sesiones de Juegos de Roles",
    "11. Sesiones de Mentalidad",
  ];

  const sectionOneContentList = [
    "7 Reglas De Nuestra Mentoría",
    "Estructura del Programa Lánzate",
    "Estar Presente es Darlo Todo",
    "(T)Estar Presente por 24 horas",
    "Construir una Rutina de Hábitos",
    "NO OBLIGATORIO: Cómo Implementar el 'Darlo Todo'",
  ];
  const sectionTwoContentList = [""];
  const sectionThreeContentList = [""];
  const sectionFourContentList = [""];
  const sectionFiveContentList = [""];
  const sectionSixContentList = [
    "Cosas Esenciales de la Primera Cita",
    "ANÁLISIS. Cita exitosa",
    "ANÁLISIS: Cita Instantanea exitosa",
    "ANÁLISIS: Cita con Problemas de Escalada",
    "ANÁLISIS: Cita Instantanea Leonardo",
    "Citas Con Final Feliz con Jean Carlos Sánchez",
  ];
  const sectionSevenContentList = [""];
  const sectionEightContentList = [""];
  const sectionNineContentList = [""];
  const sectionTenContentList = [""];
  const sectionElevenContentList = [""];

  const subTitlesList = {
    "1. Introduction": sectionOneContentList,
    "2. El Marco": sectionTwoContentList,
    "3. Sitema N.O.M.A.S.": sectionThreeContentList,
    "4. Sistema Lancémonos": sectionFourContentList,
    "5. Círculos Sociales": sectionFiveContentList,
    "6. Citas": sectionSixContentList,
    "7. Chats y Apps de Citas": sectionSevenContentList,
    "8. Relaciones": sectionEightContentList,
    "9. Sesiones de Análisis de Interacciones": sectionNineContentList,
    "10. Sesiones de Juegos de Roles": sectionTenContentList,
    "11. Sesiones de Mentalidad": sectionElevenContentList,
  };

  return (
    <div className="container-programa flex">
      <div className="sidebar w-1/4">
        <ContentList titleList={titleList} />
      </div>
      <div className="main-content w-3/4 ml-4">
        {contentType === "video" ? (
          <VideoPlayer videoUrl={introVideoUrls[selectedItem]} />
        ) : (
          <TextContent htmlContent={present24hrsHTML} />
        )}
      </div>
    </div>
  );
};

export default LanzateProgramPage;
