import { ContentListType, VideoContent } from "@/app/types";
import { present24hrsHTML } from "./intro-content";

const sectionOneContentList = [
  "siete-reglas-mentoria",
  "estructura-programa-lanzate",
  "estar-presente-darlo-todo",
  "text-estar-presente-por-24-horas",
  "construir-rutina-habitos",
  "como-implementar-el-darlo-todo",
];
const sectionTwoContentList = [""];
const sectionThreeContentList = ["sistema-lancemonos-nomas"];
const sectionFourContentList = [""];
const sectionFiveContentList = [""];
const sectionSixContentList = [
  "cosas-esenciales-primera-cita",
  "ANÁLISIS. Cita exitosa",
  "ANÁLISIS: Cita Instantanea exitosa",
  "analisis-cita-con-problemas-de-escalada",
  "ANÁLISIS: Cita Instantanea Leonardo",
  "Citas Con Final Feliz con Jean Carlos Sánchez",
];
const sectionSevenContentList = [""];
const sectionEightContentList = [""];
const sectionNineContentList = [""];
const sectionTenContentList = [""];
const sectionElevenContentList = [""];

export const allContentData: VideoContent[] = [
  {
    videoUrl:
      "https://df38qf2tnpcai.cloudfront.net/introduccion/siete-reglas-mentoria.MOV",
    videoKey: "siete-reglas-mentoria",
    videoName: "Las Siete Reglas de la Mentoría",
    videoSection: "Introducción",
  },
  {
    videoUrl:
      "https://df38qf2tnpcai.cloudfront.net/introduccion/estructura-programa-lanzate.mp4",
    videoKey: "estructura-programa-lanzate",
    videoName: "Estructura del Programa Lánzate",
    videoSection: "Introducción",
  },
];

export const contentList: { [key: string]: string[] } = {
  "1. Introducción": allContentData.map((item: VideoContent) => {
    if (item.videoSection === "Introducción") {
      return item.videoName;
    } else {
      return "";
    }
  }),
  "2. El Marco": allContentData.map((item: VideoContent) => {
    if (item.videoSection === "Introducción") {
      return item.videoName;
    } else {
      return "";
    }
  }),
  "3. Sitema N.O.M.A.S.": allContentData.map((item: VideoContent) => {
    if (item.videoSection === "Introducción") {
      return item.videoName;
    } else {
      return "";
    }
  }),
  "4. Sistema Lancémonos": allContentData.map((item: VideoContent) => {
    if (item.videoSection === "Introducción") {
      return item.videoName;
    } else {
      return "";
    }
  }),
  "5. Círculos Sociales": allContentData.map((item: VideoContent) => {
    if (item.videoSection === "Introducción") {
      return item.videoName;
    } else {
      return "";
    }
  }),
  "6. Citas": allContentData.map((item: VideoContent) => {
    if (item.videoSection === "Introducción") {
      return item.videoName;
    } else {
      return "";
    }
  }),
  "7. Chats y Apps de Citas": allContentData.map((item: VideoContent) => {
    if (item.videoSection === "Introducción") {
      return item.videoName;
    } else {
      return "";
    }
  }),
  "8. Relaciones": allContentData.map((item: VideoContent) => {
    if (item.videoSection === "Introducción") {
      return item.videoName;
    } else {
      return "";
    }
  }),
  "9. Sesiones de Análisis de Interacciones": allContentData.map(
    (item: VideoContent) => {
      if (item.videoSection === "Introducción") {
        return item.videoName;
      } else {
        return "";
      }
    }
  ),
  "10. Sesiones de Juegos de Roles": allContentData.map(
    (item: VideoContent) => {
      if (item.videoSection === "Introducción") {
        return item.videoName;
      } else {
        return "";
      }
    }
  ),
  "11. Sesiones de Mentalidad": allContentData.map((item: VideoContent) => {
    if (item.videoSection === "Introducción") {
      return item.videoName;
    } else {
      return "";
    }
  }),
};
//! to delete
export const allVideoUrls: { [key: string]: string } = {
  "siete-reglas-mentoria":
    "https://df38qf2tnpcai.cloudfront.net/introduccion/siete-reglas-mentoria.MOV",
  "estructura-programa-lanzate":
    "https://df38qf2tnpcai.cloudfront.net/introduccion/estructura-programa-lanzate.mp4",
  "estar-presente-darlo-todo":
    "https://df38qf2tnpcai.cloudfront.net/introduccion/estar-presente-darlo-todo.mov",
  "text-estar-presente-por-24-horas": present24hrsHTML,
  "construir-rutina-habitos":
    "https://df38qf2tnpcai.cloudfront.net/introduccion/construir-rutina-habitos.MOV",
  "como-implementar-el-darlo-todo":
    "https://df38qf2tnpcai.cloudfront.net/introduccion/como-implementar-el-darlo-todo.mp4",
  "cosas-esenciales-primera-cita":
    "https://df38qf2tnpcai.cloudfront.net/citas/cosas-esenciales-primera-cita.mp4",
  "analisis-cita-con-problemas-de-escalada":
    "https://df38qf2tnpcai.cloudfront.net/citas/analisis-cita-con-problemas-de-escalada.mp4",
  "sistema-lancemonos-nomas":
    "https://df38qf2tnpcai.cloudfront.net/sistema/sistema-lancemonos-nomas.mp4",
};
