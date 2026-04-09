const socialUrls = {
  instagram: "https://www.instagram.com/cultiva_ac/",
  facebook: "https://www.facebook.com/ecoaldeasdelnorte/",
  linkedin:
    "https://www.linkedin.com/in/ecoaldeas-del-norte-85183b222/",
  youtube: "https://www.youtube.com/@ecoaldeasdelnorte1261",
} as const;

/** Icono + URL; el texto de cuenta va en ariaLabel (lectores de pantalla), no en la UI. */
export const socialLinks = [
  {
    network: "instagram" as const,
    href: socialUrls.instagram,
    ariaLabel: "Instagram — perfil cultiva_ac",
  },
  {
    network: "facebook" as const,
    href: socialUrls.facebook,
    ariaLabel: "Facebook — página Ecoaldeas del Norte",
  },
  {
    network: "linkedin" as const,
    href: socialUrls.linkedin,
    ariaLabel: "LinkedIn — Ecoaldeas del Norte",
  },
  {
    network: "youtube" as const,
    href: socialUrls.youtube,
    ariaLabel: "YouTube — canal Ecoaldeas del Norte",
  },
] as const;

export const site = {
  name: "Cultura A.C.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    "http://localhost:3000",
  tagline: "Cultura que transforma comunidades.",
  description:
    "Asociación civil dedicada a impulsar iniciativas culturales con impacto social medible, transparencia y colaboración.",
  social: socialUrls,
  contact: {
    email: "contacto@culturaac.org",
    /** Texto mostrado; tel: usa el mismo sin espacios (+52…) */
    phone: "+52 81 3255 7861",
    /** Persona de referencia para llamadas */
    phoneContactName: "Ing. Xóchitl Mendoza",
    venueName: "Real Campestre",
    address:
      "Real Campestre, San Pedro Garza García, Nuevo León, México",
    /** Coordenadas del punto de referencia en mapa */
    map: {
      lat: 25.162213724188085,
      lng: -100.42456557116694,
      zoom: 16,
    },
    /** iframe de Google Maps (sin API key) */
    mapEmbedUrl: `https://maps.google.com/maps?q=25.162213724188085,-100.42456557116694&hl=es&z=16&ie=UTF8&iwloc=&output=embed`,
    /** Abrir en Google Maps (app / web) */
    mapsOpenUrl:
      "https://www.google.com/maps/search/?api=1&query=25.162213724188085,-100.42456557116694",
  },
} as const;
