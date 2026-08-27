import type { LearnArticle, Report } from "@enjambres/types";

/** Mock fixtures for v0 POC — no backend (ADR-003). */
export const mockReports: Report[] = [
  {
    id: "r1",
    title: "Enjambre reportado",
    city: "Medellín",
    department: "Antioquia",
    neighborhood: "Barrio La América",
    lat: 6.2518,
    lng: -75.5636,
    status: "visible",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "r2",
    title: "Enjambre reportado",
    city: "Bogotá",
    department: "Cundinamarca",
    neighborhood: "Chapinero",
    lat: 4.6486,
    lng: -74.0628,
    status: "reported",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "r3",
    title: "Enjambre reportado",
    city: "Cali",
    department: "Valle del Cauca",
    neighborhood: "San Fernando",
    lat: 3.4372,
    lng: -76.5225,
    status: "in_rescue",
    createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "r4",
    title: "Enjambre reportado",
    city: "Barranquilla",
    department: "Atlántico",
    neighborhood: "El Prado",
    lat: 10.9685,
    lng: -74.7813,
    status: "visible",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "r5",
    title: "Enjambre reportado",
    city: "Medellín",
    department: "Antioquia",
    neighborhood: "El Poblado",
    lat: 6.2087,
    lng: -75.5708,
    status: "resolved",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "r6",
    title: "Enjambre reportado",
    city: "Cartagena",
    department: "Bolívar",
    neighborhood: "Getsemaní",
    lat: 10.422,
    lng: -75.545,
    status: "visible",
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "r7",
    title: "Enjambre reportado",
    city: "Bucaramanga",
    department: "Santander",
    neighborhood: "Cabecera",
    lat: 7.1193,
    lng: -73.1227,
    status: "reported",
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
];

export const mockArticles: LearnArticle[] = [
  {
    id: "a1",
    slug: "que-hacer-si-ves-un-enjambre",
    title: "¿Qué hacer si ves un enjambre?",
    summary: "Mantén la calma, no te acerques y reporta con foto y ubicación.",
    body: "Un enjambre es un grupo de abejas en búsqueda de un nuevo hogar. No suelen ser agresivas en esta fase, pero no intentes moverlas tú. Aléjate, avisa a quienes estén cerca y usa la app para reportar con una foto y tu ubicación. Un rescatista o apicultor podrá atenderlas.",
  },
  {
    id: "a2",
    slug: "por-que-importan-las-abejas",
    title: "¿Por qué importan las abejas?",
    summary: "Polinizan cultivos y ecosistemas; cada rescate cuenta.",
    body: "Las abejas polinizan gran parte de los alimentos que consumimos y sostienen la biodiversidad. En Colombia, reportar y rescatar enjambres ayuda a evitar fumigaciones y a reubicar colonias de forma segura.",
  },
  {
    id: "a3",
    slug: "como-funciona-el-rescate",
    title: "Cómo funciona el rescate",
    summary: "Reporta → aparece en el mapa → rescatistas atienden → se protege la colonia.",
    body: "Cuando reportas un enjambre, aparece en el mapa para la comunidad. Rescatistas y apicultores cercanos pueden verlo, contactar y reubicar las abejas. El ciclo termina cuando el reporte se marca como resuelto.",
  },
];

export function getReportById(id: string): Report | undefined {
  return mockReports.find((report) => report.id === id);
}
