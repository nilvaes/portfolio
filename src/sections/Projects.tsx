import { useState } from "react";
import { ShineBorder } from "../components/ShineBorder";
import { useI18n } from "../i18n";
import { useTheme } from "../theme";
import { asset } from "../lib/utils";

const SHINE_COLOR = {
  dark: ["rgba(65,90,119,0.95)", "rgba(27,38,59,0.85)", "rgba(65,90,119,0.95)"],
  light: ["rgba(124,87,219,0.9)", "rgba(92,51,204,0.7)", "rgba(124,87,219,0.9)"],
} as const;

const CURSOR_IMAGE_OFFSET_X = 20;
const CURSOR_IMAGE_OFFSET_Y = -24;

type Project = {
  key: "sumi" | "onboarding" | "bosporus" | "dashboard";
  github?: string;
  demo?: string;
  demoOnly?: boolean;
  caseStudy?: boolean;
  tech: string[];
};

const PROJECTS: Project[] = [
  {
    key: "sumi",
    github: "https://github.com/nilvaes/sumi",
    demo: "https://sumi.savasbuilds.com/",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "AniList GraphQL"],
  },
  {
    key: "onboarding",
    caseStudy: true,
    tech: ["Nuxt", "TypeScript", "PostgreSQL", "Prisma", "Docker", "Clerk"],
  },
  {
    key: "bosporus",
    demo: "https://bosporus-pide.com/",
    demoOnly: true,
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
  },
  {
    key: "dashboard",
    github: "https://github.com/your-username/privacy-first-period-tracker",
    demo: undefined,
    tech: ["Expo", "React Native", "NativeWind", "i18n"],
  },
];

type PreviewProject = "sumi" | "bosporus" | "dashboard";

const PREVIEW_CONFIG: Record<
  PreviewProject,
  { src: string; alt: string; widthClass: string; offsetY?: number }
> = {
  sumi: {
    src: "assets/sumi.png",
    alt: "Sumi anime discovery platform preview",
    widthClass: "w-80",
  },
  bosporus: {
    src: "assets/bosporus-pide.png",
    alt: "Bosporus Lahmacun & Pide restaurant website preview",
    widthClass: "w-80",
  },
  dashboard: {
    src: "assets/period-tracker.jpg",
    alt: "Privacy First Period Tracker app preview",
    widthClass: "w-48",
    offsetY: -12,
  },
};

export default function Projects() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const [cursorPreview, setCursorPreview] = useState<{
    project: PreviewProject;
    x: number;
    y: number;
  } | null>(null);

  const setPreviewFromEvent = (
    e: React.MouseEvent,
    project: PreviewProject
  ) => {
    setCursorPreview({
      project,
      x: e.clientX + CURSOR_IMAGE_OFFSET_X,
      y: e.clientY + CURSOR_IMAGE_OFFSET_Y,
    });
  };

  const handlePreviewMouseEnter = (
    e: React.MouseEvent,
    project: PreviewProject
  ) => {
    setPreviewFromEvent(e, project);
  };

  const handlePreviewMouseMove = (
    e: React.MouseEvent,
    project: PreviewProject
  ) => {
    setPreviewFromEvent(e, project);
  };

  const handlePreviewMouseLeave = () => {
    setCursorPreview(null);
  };

  const activePreview = cursorPreview
    ? PREVIEW_CONFIG[cursorPreview.project]
    : null;

  return (
    <section
      id="projects"
      className="relative c-space pt-20 md:pt-30 min-h-screen"
    >
      <div className="relative z-10">
        <h2 className="text-heading">{t("projects.heading")}</h2>

        {activePreview && cursorPreview && (
          <div
            className="pointer-events-none fixed z-50 hidden md:block"
            style={{
              left: cursorPreview.x,
              top: cursorPreview.y + (activePreview.offsetY ?? 0),
            }}
          >
            <img
              src={asset(activePreview.src)}
              alt={activePreview.alt}
              className={`rounded-xl border border-ink/10 shadow-xl ${activePreview.widthClass}`}
            />
          </div>
        )}

        <div className="flex flex-col gap-6 mt-10">
          {PROJECTS.map((project) => (
            <div
              key={project.key}
              className="group relative rounded-3xl transition-transform duration-300 hover:-translate-y-0.5"
              {...(project.key in PREVIEW_CONFIG
                ? {
                    onMouseEnter: (e) =>
                      handlePreviewMouseEnter(e, project.key as PreviewProject),
                    onMouseMove: (e) =>
                      handlePreviewMouseMove(e, project.key as PreviewProject),
                    onMouseLeave: handlePreviewMouseLeave,
                  }
                : {})}
            >
              <article className="relative flex flex-col justify-between p-6 rounded-3xl backdrop-blur-sm card-surface">
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
                      className="px-3 py-1 text-xs rounded-full text-muted bg-ink/8"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-6 text-sm">
                {project.caseStudy ? (
                  <p className="subtext italic">{t("projects.caseStudy")}</p>
                ) : project.key === "dashboard" ? (
                  <p className="subtext italic">
                    {t("projects.cards.dashboard.comingSoon")}
                  </p>
                ) : project.demoOnly && project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-aqua hover:text-ink underline-offset-4 hover:underline"
                  >
                    {t("projects.visitWebsite")}
                  </a>
                ) : (
                  <>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-lavender hover:text-ink underline-offset-4 hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-aqua hover:text-ink underline-offset-4 hover:underline"
                      >
                        {t("projects.visitWebsite")}
                      </a>
                    )}
                  </>
                )}
              </div>
              </article>
              <ShineBorder
                shineColor={[...SHINE_COLOR[theme]]}
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
