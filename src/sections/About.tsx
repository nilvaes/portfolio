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
        {/* grid1 */}
        <div className="flex items-end grid-default-color grid-1">
          <img
            src="assets/coding-pov.png"
            className="absolute scale-[1.75] -right-20 -top-4 md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
          />
          <div className="z-10">
            <p className="headtext">{t("about.introTitle")}</p>
            <p className="subtext">{t("about.introText")}</p>
          </div>
          <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-linear-to-t from-indigo" />
        </div>
        {/* grid2 */}
        <div className="grid-default-color grid-2">
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full"
          >
            <p className="flex items-end text-5xl text-gray-500">
              {t("about.stacksLabel")}
            </p>
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
          <div className="z-10 w-[50%]">
            <p className="headtext">{t("about.techStackTitle")}</p>
            <p className="subtext">{t("about.techStackText")}</p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
            <Frameworks />
          </div>
        </div>
      </div>
    </section>
  );
}
