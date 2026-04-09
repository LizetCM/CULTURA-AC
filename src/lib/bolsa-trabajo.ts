/** Roles buscados para el Consejo consultivo */
export type ConsejoConsultivoRol = {
  title: string;
  tag: string;
  body: string;
};

export const consejoConsultivoRoles: readonly ConsejoConsultivoRol[] = [
  {
    title: "Consejero de arquitectura sustentable",
    tag: "Consejo consultivo",
    body:
      "Perfil de arquitecta o ingeniera civil capaz de revisar proyectos antes de su ejecución, con criterios de sustentabilidad y viabilidad técnica.",
  },
  {
    title: "Consejero en impacto comunitario",
    tag: "Consejo consultivo",
    body:
      "Persona con conocimiento del ecosistema social y de la economía del cuidados, para orientar el impacto en las comunidades.",
  },
  {
    title: "Comisión de Negocios Conscientes",
    tag: "Consejo consultivo",
    body:
      "Persona contadora con experiencia en el marco fiscal aplicable a organizaciones de la sociedad civil y buenas prácticas de transparencia.",
  },
  {
    title: "Consejera de equidad de género",
    tag: "Consejo consultivo",
    body:
      "Abogadas o abogados con experiencia en derecho laboral, penal, agrario y familiar, y en la defensa de los derechos de la comunidad LGBTTTQy+.",
  },
] as const;

export type VoluntariadoSeccion = {
  title?: string;
  paragraphs: readonly string[];
  tiempo?: string;
  /** Viñetas de temas de taller, etc. */
  bullets?: readonly string[];
  /** Temas de capacitación / fortalecimiento */
  capacitaciones?: readonly string[];
  carreras?: readonly string[];
};

export type VoluntariadoPrograma = {
  title: string;
  sections: readonly VoluntariadoSeccion[];
};

export const voluntariadoProgramas: readonly VoluntariadoPrograma[] = [
  {
    title: "Planeación estratégica",
    sections: [
      {
        paragraphs: [
          "Buscamos a estudiantes de carreras administrativas, de negocios y afines para apoyar en el seguimiento y desarrollo de nuestro plan estratégico, así como en la consolidación de alianzas clave para el proyecto. Las personas candidatas deberán tener disponibilidad para cumplir con un total de 480 horas.",
        ],
        tiempo: "480 horas en total",
        carreras: [
          "LAE — Licenciatura en Administración y Estrategia de Negocios",
          "LEC — Licenciatura en Economía",
          "INT — Ingeniería en Negocios y Tecnologías de la Información",
          "LED — Licenciatura en Derecho",
          "LIN — Licenciatura en Innovación y Dirección de Negocios",
          "LCPF — Licenciatura en Contaduría Pública y Finanzas",
          "LAF — Licenciatura en Finanzas",
        ],
      },
    ],
  },
  {
    title: "Xomali",
    sections: [
      {
        title: "Licenciatura en Psicología (LPS)",
        paragraphs: [
          "Buscamos a estudiantes de Licenciatura en Psicología (LPS) que puedan apoyar durante la fase inicial de diagnóstico en Xomali.",
        ],
        tiempo: "Intensivo — 4 semanas",
      },
      {
        title: "Licenciatura en Derecho (LED)",
        paragraphs: [
          "Buscamos a estudiantes de Derecho (LED) que den acompañamiento en los procesos legales.",
        ],
        tiempo: "Intensivo — 4 semanas",
      },
      {
        title: "Talleres ecológicos y capacitación",
        paragraphs: [
          "Buscamos a estudiantes de todas las carreras que impartan talleres de elaboración de:",
        ],
        bullets: [
          "Toallas ecológicas",
          "Pañales ecológicos",
          "Pasta de dientes ecológica",
          "Artículos de belleza",
          "Artículos de limpieza",
          "Corte y confección de prendas",
        ],
        capacitaciones: [
          "Negocios conscientes",
          "Liderazgo directivo",
          "Psicología positiva",
          "Finanzas e inversiones conscientes",
          "Diseño de productos",
          "Marketing digital",
        ],
        tiempo: "Intensivo — 4 semanas",
      },
    ],
  },
  {
    title: "Ecoaldeas del Norte",
    sections: [
      {
        title: "Arquitectura",
        paragraphs: [
          "Buscamos a estudiantes de arquitectura para apoyar en la implementación de nuestros programas.",
        ],
        tiempo: "Intensivo — 4 semanas",
      },
      {
        title: "Servicio social y prácticas profesionales",
        paragraphs: [
          "Buscamos a estudiantes que deseen realizar su servicio social mediante la participación en proyectos de construcción sustentable de viviendas.",
        ],
        tiempo: "480 horas",
      },
    ],
  },
] as const;

/** Opciones de voluntariado para el selector del formulario */
export const voluntariadoVacancyOptions = [
  "Voluntariado · Planeación estratégica",
  "Voluntariado · Xomali · Psicología (LPS)",
  "Voluntariado · Xomali · Derecho (LED)",
  "Voluntariado · Xomali · Talleres ecológicos y capacitación",
  "Voluntariado · Ecoaldeas del Norte · Arquitectura",
  "Voluntariado · Ecoaldeas del Norte · Servicio social / prácticas",
] as const;

/** Opciones del formulario: Consejo consultivo + voluntariado + otro */
export const jobApplicationVacancyOptions = [
  ...consejoConsultivoRoles.map((r) => r.title),
  ...voluntariadoVacancyOptions,
  "Otro / Perfil abierto",
] as const;
