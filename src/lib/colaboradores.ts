export type ColaboradorCategory = "alianza" | "consultor";

export type ColaboradorSocial = {
  label: string;
  href: string;
};

export type Colaborador = {
  slug: string;
  name: string;
  category: ColaboradorCategory;
  /** Línea bajo el nombre (cargo o vínculo con la asociación) */
  role: string;
  /** Texto breve en la tarjeta del inicio */
  excerpt: string;
  image: string;
  imageAlt: string;
  /** Viñetas opcionales en la página de perfil */
  highlights?: readonly string[];
  /** Párrafos de biografía en la página de perfil */
  paragraphs: readonly string[];
  social?: readonly ColaboradorSocial[];
  /** Texto de honorarios por sesión (p. ej. mostrado en caja al final del perfil) */
  sessionRate?: string;
};

export const colaboradores: readonly Colaborador[] = [
  {
    slug: "frida-genis",
    name: "Frida Genis",
    category: "alianza",
    role: "Alianza operativa",
    excerpt:
      "Psicóloga clínica con más de 15 años de trayectoria en atención terapéutica, formación y gestión.",
    image: "/alianzas/frida-genis.png",
    imageAlt: "Frida Genis",
    highlights: [
      "Psicóloga clínica egresada de la Universidad Autónoma de Nuevo León.",
      "+15 años de experiencia en atención a adolescentes y adultos mediante terapia con orientación psicoanalítica, en consulta privada e institucional.",
      "Experiencia en docencia, formación y capacitación, administración de personal, psicometría y técnica de entrevista, y optimización de procesos.",
      "Actualmente COO de Fundación Promover A.C.",
    ],
    paragraphs: [
      "Frida Genis es psicóloga clínica egresada de la Universidad Autónoma de Nuevo León. Su práctica se ha centrado en acompañar a adolescentes y adultos con un enfoque psicoanalítico, tanto en consulta privada como en instituciones.",
      "Cuenta con experiencia sólida en docencia, formación y capacitación, así como en administración de personal, psicometría y técnica de entrevista, aportando criterios para optimizar procesos organizacionales.",
      "Actualmente se desempeña como COO de Fundación Promover A.C., articulando herramientas clínicas y de gestión en favor del bienestar y el desarrollo institucional.",
    ],
    social: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/frida-genis" },
      { label: "Instagram", href: "https://www.instagram.com/fridagenis_/" },
    ],
  },
  {
    slug: "ramiro-martinez-mata",
    name: "Ramiro Martínez Mata",
    category: "consultor",
    role: "Consultor en intervención psicosocial",
    excerpt:
      "Psicólogo, facilitador y consultor en proyectos de teatro social, equidad de género y convivencia.",
    image: "/consultores/ramiro-martinez.png",
    imageAlt: "Ramiro Martínez Mata",
    paragraphs: [
      "Licenciado en Psicología por la U.A.N.L. Desde 2004 colabora en programas de intervención psicosocial orientados a la formación de grupos. Fue director del programa de emprendedurismo Jóvenes con Valor (sedes Monterrey, N.L. y Xalapa, Veracruz) por Ashoka México, Centroamérica y el Caribe. Ha sido docente de la Facultad de Psicología de la Universidad Metropolitana de Monterrey y de la Escuela de Enfermería Monterrey, eje Psicología.",
      "De forma independiente ha colaborado con Zihuame Mochilla en el diseño y coordinación de proyectos de teatro social con población indígena; con Explora T en consejería sexual en formato grupal y cara a cara; como instructor especialista en prevención de violencia de género para el Programa Insignia «Ciudades y espacios públicos seguros para mujeres y niñas» de ONU Mujeres; y como maestro de teatro para personas sordas en la Asociación de Sordos de Nuevo León.",
      "Actualmente es terapeuta y socio colaborador de CONVIVIRE, consultoría de proyectos de intervención psicosocial.",
    ],
  },
  {
    slug: "luisa-fernanda-gonzalez-nava",
    name: "Luisa Fernanda González Nava",
    category: "consultor",
    role: "Lic. en Psicología · Universidad Regiomontana",
    excerpt:
      "Acompañamiento a mujeres y disidencias víctimas de violencia; enfoque en salud integral y comunidad LGBTQIA+.",
    image: "/consultores/luisa-fernanda-gonzalez-nava.png",
    imageAlt: "Luisa Fernanda González Nava — psicóloga",
    highlights: [
      "Licenciatura en Psicología por la Universidad Regiomontana.",
    ],
    paragraphs: [
      "Luisa Fernanda González Nava es psicóloga titulada por la Universidad Regiomontana. Desde 2018 acompaña a mujeres y disidencias que han sido objeto de violencia.",
      "Actualmente colabora con un equipo de profesionales de la salud física y mental para ofrecer servicios accesibles a la población LGBTQIA+ y construir espacios más seguros para la comunidad.",
    ],
    sessionRate: "Propuesta económica por sesión: $500*",
  },
] as const;

const bySlug = new Map(colaboradores.map((c) => [c.slug, c]));

export function getColaboradorBySlug(slug: string): Colaborador | undefined {
  return bySlug.get(slug);
}

export const colaboradorCategoryLabels: Record<
  ColaboradorCategory,
  string
> = {
  alianza: "Alianza operativa",
  consultor: "Consultor",
};