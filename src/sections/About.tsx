import { motion } from "motion/react";
import { useI18n } from "../i18n";
import { asset } from "../lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type Tech = { name: string; icon?: string };

const STACK: { key: string; items: Tech[] }[] = [
  {
    key: "frontend",
    items: [
      { name: "TypeScript", icon: "typescript.svg" },
      { name: "Vue", icon: "vue.svg" },
      { name: "Nuxt", icon: "nuxt-icon.svg" },
      { name: "React", icon: "react.svg" },
      { name: "Next.js" },
      { name: "Tailwind CSS", icon: "tailwindcss.svg" },
    ],
  },
  {
    key: "backend",
    items: [
      { name: "Node.js", icon: "nodejs.svg" },
      { name: "NestJS", icon: "nestjs.svg" },
      { name: "REST APIs" },
      { name: "C# / .NET", icon: "csharp-pink.png" },
    ],
  },
  {
    key: "databases",
    items: [
      { name: "PostgreSQL", icon: "sql.svg" },
      { name: "Supabase" },
      { name: "Prisma" },
    ],
  },
  {
    key: "tools",
    items: [
      { name: "Git", icon: "git.svg" },
      { name: "Docker", icon: "docker.svg" },
      { name: "GitHub Actions", icon: "github-white.svg" },
    ],
  },
];

const FACTS = ["ihk", "practice", "location"] as const;
const PRINCIPLES = ["clean", "team", "ai"] as const;

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { delay, duration: 0.7, ease: EASE },
});

export default function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="relative c-space pt-24 md:pt-32">
      <div className="relative z-10 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        {/* Bio */}
        <motion.div {...reveal()}>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-lavender">
            {t("about.eyebrow")}
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-pretty md:text-5xl">
            {t("about.heading")}
          </h2>
          <div className="mt-6 flex flex-col gap-4 text-muted text-pretty md:text-lg">
            <p>{t("about.bio1")}</p>
            <p>{t("about.bio2")}</p>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-3">
            {FACTS.map((fact) => (
              <div
                key={fact}
                className="rounded-2xl border border-ink/10 p-4 card-surface backdrop-blur-sm"
              >
                <dt className="text-xs text-muted md:text-sm">{t(`about.facts.${fact}.label`)}</dt>
                <dd className="text-gradient mt-1 text-xl font-bold md:text-3xl">
                  {t(`about.facts.${fact}.value`)}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* Principles + stack */}
        <div className="flex flex-col gap-4">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p}
              {...reveal(0.1 + i * 0.08)}
              className="flex gap-4 rounded-2xl border border-ink/10 p-5 card-surface backdrop-blur-sm"
            >
              <span className="font-mono text-sm text-subtle">0{i + 1}</span>
              <div>
                <h3 className="font-semibold text-ink">{t(`about.principles.${p}.title`)}</h3>
                <p className="mt-1 text-sm text-muted text-pretty">
                  {t(`about.principles.${p}.text`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div {...reveal()} className="relative z-10 mt-16">
        <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-lavender">
          {t("about.techStackTitle")}
        </h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STACK.map((group) => (
            <div key={group.key}>
              <p className="mb-3 text-sm font-semibold text-ink">
                {t(`about.techStackCategories.${group.key}`)}
              </p>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center gap-2 rounded-full border border-ink/10 px-3 py-1.5 text-sm text-ink/85 card-surface transition hover:-translate-y-0.5 hover:border-ink/30"
                  >
                    {item.icon && (
                      <img
                        src={asset(`assets/logos/${item.icon}`)}
                        alt=""
                        aria-hidden
                        loading="lazy"
                        className={`size-4 object-contain ${item.icon.includes("white") ? "light:invert" : ""}`}
                      />
                    )}
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
