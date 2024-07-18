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
const sectionThreeContentList = ["sistema-lancemonos-nomas"];
const sectionSixContentList = [
  "cosas-esenciales-primera-cita",
  "ANÁLISIS. Cita exitosa",
  "ANÁLISIS: Cita Instantanea exitosa",
  "analisis-cita-con-problemas-de-escalada",
  "ANÁLISIS: Cita Instantanea Leonardo",
  "Citas Con Final Feliz con Jean Carlos Sánchez",
];

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
