import Link from "next/link";
import { SocialNetworkIcon } from "@/components/brand/SocialNetworkIcon";
import { Container } from "@/components/ui/Container";
import { site, socialLinks } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200/70 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <Container className="py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {site.name}
            </div>
            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {site.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <div className="font-semibold text-zinc-900 dark:text-zinc-50">
                Sitio
              </div>
              <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                <li>
                  <Link href="/#sobre-nosotros" className="hover:text-zinc-900">
                    Sobre nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/#proyectos" className="hover:text-zinc-900">
                    Proyectos
                  </Link>
                </li>
                <li>
                  <Link href="/participar" className="hover:text-zinc-900">
                    Contratación de mujeres
                  </Link>
                </li>
                <li>
                  <Link href="/participar" className="hover:text-zinc-900">
                    Participar
                  </Link>
                </li>
                <li>
                  <Link href="/#contacto" className="hover:text-zinc-900">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/donaciones" className="hover:text-zinc-900">
                    Donaciones
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-zinc-900 dark:text-zinc-50">
                Contacto
              </div>
              <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                <li>
                  <a href={`mailto:${site.contact.email}`} className="hover:text-zinc-900">
                    {site.contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                    className="hover:text-zinc-900 dark:hover:text-zinc-50"
                  >
                    {site.contact.phone.replace(/^\+52\s+/, "")}
                  </a>
                  <span className="mt-0.5 block text-xs text-zinc-500 dark:text-zinc-500">
                    {site.contact.phoneContactName}
                  </span>
                </li>
                <li>{site.contact.address}</li>
              </ul>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="font-semibold text-zinc-900 dark:text-zinc-50">
              Transparencia
            </div>
            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Publicamos resultados e indicadores. Tu donación se destina a proyectos
              culturales con impacto social.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-200/70 pt-8 text-center dark:border-zinc-800">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Redes sociales
          </p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {socialLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-label={item.ariaLabel}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-zinc-200/80 bg-zinc-50 text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:outline-zinc-300"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <SocialNetworkIcon id={item.network} className="size-6 [&>svg]:size-6" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-zinc-200/70 pt-6 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} {site.name}. Todos los derechos
            reservados.
          </div>
          <div className="flex gap-4">
            <Link href="/aviso-de-privacidad" className="hover:text-zinc-700">
              Aviso de privacidad
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

