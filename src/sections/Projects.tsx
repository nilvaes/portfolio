import { useI18n } from "../i18n";

type Project = {
  key: "portfolio" | "dashboard" | "saas";
  github: string;
  demo?: string;
  tech: string[];
};

const PROJECTS: Project[] = [
  {
    key: "portfolio",
    github: "https://github.com/your-username/portfolio",
    demo: "https://your-portfolio-demo.com",
    tech: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    key: "dashboard",
    github: "https://github.com/your-username/analytics-dashboard",
    demo: "https://your-dashboard-demo.com",
    tech: ["Vue", "Nuxt", "Supabase"],
  },
  {
    key: "saas",
    github: "https://github.com/your-username/saas-web-app",
    demo: "https://your-saas-demo.com",
    tech: ["Next.js", "Nest.js", "PostgreSQL"],
  },
];

export default function Projects() {
  const { t } = useI18n();

  return (
    <section id="projects" className="c-space section-spacing">
      <h2 className="text-heading">{t("projects.heading")}</h2>
      <p className="mt-2 subtext max-w-2xl">
        {t("hero.desktopTitle")} {t("hero.desktopSuffix")}
      </p>

      <div className="flex flex-col gap-6 mt-10">
        {PROJECTS.map((project) => (
          <article
            key={project.key}
            className="relative flex flex-col justify-between p-6 bg-linear-to-b from-storm to-indigo rounded-2xl hover:-translate-y-1 transition-transform duration-200 border border-white/5"
          >
            <div>
              <h3 className="text-xl font-semibold">
                {t(`projects.cards.${project.key}.title`)}
              </h3>
              <p className="mt-2 subtext">
                {t(`projects.cards.${project.key}.description`)}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-full bg-white/5 text-neutral-300 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 text-sm">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="text-violet-300 hover:text-violet-100 underline-offset-4 hover:underline"
              >
                GitHub
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="text-aqua hover:text-white underline-offset-4 hover:underline"
                >
                  Live Demo
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

