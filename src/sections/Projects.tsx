import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BrowserFrame } from "../components/BrowserFrame";
import {
  OnboardingIllustration,
  SwitchAudioIllustration,
} from "../components/ProjectIllustrations";
import { PROJECTS, type Project, type ProjectCategory } from "../data/projects";
import { useI18n } from "../i18n";
import { asset, cn } from "../lib/utils";

type Filter = "all" | ProjectCategory;

const FILTERS: Filter[] = ["all", "webapp", "landing", "desktop"];
const EASE = [0.22, 1, 0.36, 1] as const;

const STATUS_STYLE: Record<Project["status"], string> = {
  live: "bg-mint/15 text-ink",
  client: "bg-aqua/15 text-ink",
  concept: "bg-ink/8 text-muted",
  wip: "bg-sand/20 text-ink",
  caseStudy: "bg-lavender/20 text-ink",
  openSource: "bg-royal/20 text-ink",
};

function hostname(url: string) {
  return new URL(url).hostname;
}

function ProjectMedia({ project }: { project: Project }) {
  const { text } = useProjectText(project);
  if (project.illustration === "onboarding") return <OnboardingIllustration />;
  if (project.illustration === "switchAudio") return <SwitchAudioIllustration />;
  if (!project.image) return null;
  return (
    <BrowserFrame
      src={asset(project.image)}
      alt={text.title}
      url={project.live ? hostname(project.live) : project.id}
      imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
    />
  );
}

function useProjectText(project: Project) {
  const { language, t } = useI18n();
  return { text: project.text[language], t };
}

function StatusBadge({ status }: { status: Project["status"] }) {
  const { t } = useI18n();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        STATUS_STYLE[status]
      )}
    >
      {status === "live" && <span className="size-1.5 rounded-full bg-mint" />}
      {t(`projects.status.${status}`)}
    </span>
  );
}

function TechList({ tech }: { tech: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tech.map((item) => (
        <li
          key={item}
          className="rounded-full border border-ink/10 px-3 py-1 text-xs text-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const { t } = useI18n();
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-pill group/link inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-medium text-on-accent transition hover:brightness-110"
        >
          {t("projects.links.live")}
          <span className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" aria-hidden>↗</span>
        </a>
      )}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2 font-medium text-ink transition hover:border-ink/40 hover:bg-ink/5"
        >
          {t("projects.links.code")}
        </a>
      )}
      {!project.github && (
        <span className="text-xs italic text-subtle">{t("projects.links.private")}</span>
      )}
    </div>
  );
}

function FeatureCard({ project, index }: { project: Project; index: number }) {
  const { text } = useProjectText(project);
  const reversed = index % 2 === 1;

  return (
    <article
      data-cursor="card"
      className="group relative grid items-center gap-8 overflow-hidden rounded-3xl border border-ink/10 p-5 card-surface backdrop-blur-sm md:p-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12 lg:p-10"
    >
      <div className={cn("relative", reversed && "lg:order-2")}>
        <ProjectMedia project={project} />
      </div>

      <div className="relative flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-subtle">
            {String(index + 1).padStart(2, "0")}
          </span>
          <StatusBadge status={project.status} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-ink md:text-3xl">{text.title}</h3>
          <p className="mt-3 text-muted text-pretty">{text.description}</p>
        </div>
        {text.highlights && (
          <ul className="flex flex-col gap-2 text-sm text-ink/85">
            {text.highlights.map((h) => (
              <li key={h} className="flex gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-lavender" aria-hidden />
                {h}
              </li>
            ))}
          </ul>
        )}
        <TechList tech={project.tech} />
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

function GridCard({ project, index }: { project: Project; index: number }) {
  const { text } = useProjectText(project);

  return (
    <article
      data-cursor="card"
      className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl border border-ink/10 p-5 card-surface backdrop-blur-sm"
    >
      <div className="relative">
        <ProjectMedia project={project} />
      </div>
      <div className="relative flex flex-1 flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-subtle">
            {String(index + 1).padStart(2, "0")}
          </span>
          <StatusBadge status={project.status} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-ink">{text.title}</h3>
          <p className="mt-2 text-sm text-muted text-pretty">{text.description}</p>
        </div>
        <TechList tech={project.tech} />
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

export default function Projects() {
  const { t } = useI18n();
  const [filter, setFilter] = useState<Filter>("all");

  const visible = PROJECTS.filter((p) => filter === "all" || p.category === filter);
  const count = (f: Filter) =>
    f === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.category === f).length;

  return (
    <section id="projects" className="relative c-space pt-24 md:pt-32">
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-lavender">
              {t("projects.eyebrow")}
            </p>
            <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
              {t("projects.heading")}
            </h2>
            <p className="mt-4 text-muted text-pretty md:text-lg">{t("projects.intro")}</p>
          </div>

          {/* Filter tabs */}
          <div
            role="tablist"
            aria-label={t("projects.filterLabel")}
            className="flex w-fit max-w-full shrink-0 gap-1 overflow-x-auto rounded-full border border-ink/10 bg-surface/50 p-1 backdrop-blur [scrollbar-width:none]"
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "relative shrink-0 cursor-pointer whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-colors sm:px-4",
                  filter === f ? "text-on-accent" : "text-muted hover:text-ink"
                )}
              >
                {filter === f && (
                  <motion.span
                    layoutId="project-filter"
                    className="cta-pill absolute inset-0 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative">
                  {t(`projects.filters.${f}`)}
                  <span className="ml-1.5 text-xs opacity-60">{count(f)}</span>
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="mt-12 grid gap-6 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE }}
                className={project.layout === "feature" ? "lg:col-span-3" : ""}
              >
                {project.layout === "feature" ? (
                  <FeatureCard project={project} index={i} />
                ) : (
                  <GridCard project={project} index={i} />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
