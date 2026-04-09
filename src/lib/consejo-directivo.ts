export type MiembroConsejo = {
  slug: string;
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  paragraphs: readonly string[];
};

export const miembrosConsejoDirectivo: readonly MiembroConsejo[] = [
  {
    slug: "david-mendoza-tinoco",
    name: "Dr. David Mendoza Tinoco",
    role: "Presidente",
    image: "/colaboradores/david-mendoza.png",
    imageAlt: "Dr. David Mendoza Tinoco",
    paragraphs: [
      "El Presidente del Consejo Directivo es el líder principal, encargado de guiar la visión estratégica del proyecto y actuar como representante oficial de la organización en todos los niveles. Este rol implica supervisar las operaciones, facilitar la toma de decisiones clave y garantizar la cohesión entre los miembros del Consejo Directivo y el equipo operativo.",
    ],
  },
  {
    slug: "margarita-garcia",
    name: "Dra. Margarita García",
    role: "Vocal",
    image: "/colaboradores/margarita-garcia.png",
    imageAlt: "Dra. Margarita García",
    paragraphs: [
      "La Vocal asiste y apoya a los demás miembros del Consejo Directivo, especialmente al presidente, secretario y tesorero. Sus funciones principales son asistir a las reuniones, participar en las decisiones y llevar a cabo tareas o comisiones asignadas por la junta. Su participación es crucial para asegurar el cumplimiento de los objetivos de la asociación y mantener una gestión eficiente y transparente.",
    ],
  },
  {
    slug: "pilar-martinez",
    name: "Mtra. Pilar Martínez",
    role: "Tesorera",
    image: "/colaboradores/pilar-martinez.png",
    imageAlt: "Mtra. Pilar Martínez",
    paragraphs: [
      "La tesorera del Consejo Directivo es responsable de la gestión y supervisión financiera, asegurando que los recursos económicos se administren de manera eficiente, transparente y en alineación con los objetivos del proyecto. Este rol garantiza la sostenibilidad económica del proyecto y brinda reportes claros y detallados al Consejo Directivo y a los donantes.",
    ],
  },
  {
    slug: "xochitl-mendoza",
    name: "Ing. Xóchitl Mendoza",
    role: "Dirección general",
    image: "/colaboradores/xochitl-mendoza.png",
    imageAlt: "Ing. Xóchitl Mendoza",
    paragraphs: [
      "El Secretario del Consejo Directivo es el encargado de documentar y gestionar los procesos administrativos del Consejo, asegurando el cumplimiento de las normativas legales y organizativas. Este rol es clave para mantener la transparencia, el orden y la comunicación efectiva dentro del proyecto.",
    ],
  },
] as const;

const bySlug = new Map(
  miembrosConsejoDirectivo.map((m) => [m.slug, m]),
);

export function getMiembroConsejoBySlug(
  slug: string,
): MiembroConsejo | undefined {
  return bySlug.get(slug);
}
