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

export const contentList = {
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
};
