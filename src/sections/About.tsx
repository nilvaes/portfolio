import { useRef } from "react";
import Card from "../components/Card";
import { Globe } from "../components/Globe";
import CopyEmailButton from "../components/CopyEmailButton";
import Frameworks from "../components/Frameworks";
import { useI18n } from "../i18n";

export default function About() {
  const { t } = useI18n();
  const grid2Container = useRef<HTMLDivElement>(null);
  return (
    <section className="c-space mb-32 lg:mb-48" id="info">
      <h2 className="text-heading">{t("about.heading")}</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">

        {/* grid2 */}
        <div className="grid-default-color grid-2">
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full"
          >
            <Card
              text={t("about.cards.junior")}
              style={{ rotate: "75deg", top: "30%", left: "20%" }}
              containerRef={grid2Container}
            />
            <Card
              text={t("about.cards.frontend")}
              style={{ rotate: "-30deg", top: "60%", left: "45%" }}
              containerRef={grid2Container}
            />
            <Card
              text={t("about.cards.backend")}
              style={{ rotate: "90deg", bottom: "30%", left: "70%" }}
              containerRef={grid2Container}
            />
            <Card
              text={t("about.cards.fullstack")}
              style={{ rotate: "-45deg", top: "55%", left: "0%" }}
              containerRef={grid2Container}
            />
            <Card
              text={t("about.cards.ui")}
              style={{ rotate: "20deg", top: "10%", left: "38%" }}
              containerRef={grid2Container}
            />
            <Card
              image="assets/logos/vue.svg"
              style={{ rotate: "30deg", bottom: "70%", left: "70%" }}
              containerRef={grid2Container}
            />
            <Card
              image="assets/logos/react.svg"
              style={{ rotate: "-45deg", bottom: "30%", left: "25%" }}
              containerRef={grid2Container}
            />
            <Card
              image="assets/logos/tailwindcss.svg"
              style={{ rotate: "-45deg", top: "12%", left: "18%" }}
              containerRef={grid2Container}
            />
            <Card
              image="assets/logos/nuxt-icon.svg"
              style={{ rotate: "-45deg", top: "22%", left: "35%" }}
              containerRef={grid2Container}
            />
            <Card
              image="assets/logos/typescript.svg"
              style={{ rotate: "-45deg", top: "30%", left: "50%" }}
              containerRef={grid2Container}
            />
          </div>
        </div>
        {/* grid3 */}
        <div className="grid-black-color grid-3">
          <div className="z-10 w-[50%]">
            <p className="headtext">{t("about.timezoneTitle")}</p>
            <p className="subtext">{t("about.timezoneText")}</p>
          </div>
          <figure className="absolute left-[30%] top-[10%]">
            <Globe />
          </figure>
        </div>
        {/* grid4 */}
        <div className="grid-special-color grid-4">
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">{t("about.ctaTitle")}</p>
            <CopyEmailButton />
          </div>
        </div>
        {/* grid5 */}
        <div className="grid-default-color grid-5">
          <div className="relative z-10 flex min-h-0 w-full flex-col gap-3 overflow-y-auto rounded-2xl p-4 backdrop-blur-sm bg-primary/50 md:h-full md:w-[55%] md:rounded-none md:bg-transparent md:backdrop-blur-none md:p-0">
            <div>
              <p className="headtext">{t("about.techStackTitle")}</p>
            </div>
            <div className="mt-1 grid grid-cols-1 gap-y-3 text-xs text-neutral-300 md:grid-cols-2 md:gap-x-4 md:gap-y-3 md:text-sm">
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-400 md:text-xs">
                  {t("about.techStackCategories.frontend")}
                </p>
                <p>Nuxt, Vue, React, React Native, Tailwind CSS</p>
              </div>
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-400 md:text-xs">
                  {t("about.techStackCategories.backend")}
                </p>
                <p>Node.js, Nest.js, REST APIs</p>
              </div>
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-400 md:text-xs">
                  {t("about.techStackCategories.databases")}
                </p>
                <p>Prisma, TypeORM, PostgreSQL, MariaDB, Supabase, Firebase</p>
              </div>
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-400 md:text-xs">
                  {t("about.techStackCategories.tools")}
                </p>
                <p>Git, GitHub, GitLab, Docker, TypeScript, Cursor, Codex, KI Tools</p>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-2 z-0 w-full h-full start-[55%] md:inset-y-6 md:scale-110">
            <Frameworks />
          </div>
        </div>
      </div>
    </section>
  );
}
