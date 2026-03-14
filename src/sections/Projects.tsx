import { Particles } from "../components/Particles";
import { ShineBorder } from "../components/ShineBorder";
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
    github: "https://github.com/nilvaes/portfolio-minimal",
    demo: "https://nilvaes.github.io/portfolio-minimal",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    key: "dashboard",
    github: "https://github.com/your-username/privacy-first-period-tracker",
    demo: undefined,
    tech: ["Expo", "React Native", "NativeWind", "i18n"],
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
    <section
      id="projects"
      className="relative c-space pt-20 md:pt-30 min-h-screen overflow-hidden"
    >
      <Particles
        className="absolute inset-0"
        quantity={120}
        ease={80}
        color="#ffffff"
        refresh
      />

      <div className="relative z-10">
        <h2 className="text-heading">{t("projects.heading")}</h2>

        <div className="flex flex-col gap-6 mt-10">
          {PROJECTS.map((project) => (
            <div
              key={project.key}
              className="group relative rounded-3xl transition-transform duration-300 hover:-translate-y-0.5"
            >
              <article className="relative flex flex-col justify-between p-6 rounded-3xl backdrop-blur-sm bg-primary/30">
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
                      className="px-3 py-1 text-xs rounded-full text-neutral-300 bg-primary/60"
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
              <ShineBorder
                shineColor={["rgba(124,87,219,0.9)", "rgba(92,51,204,0.7)", "rgba(124,87,219,0.9)"]}
                borderWidth={1}
                duration={3}
                className="rounded-3xl opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
