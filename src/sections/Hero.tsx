import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { LightRays } from "../components/LightRays";
import { MorphingText } from "../components/MorphingText";
import SocialLinks from "../components/SocialLinks";
import { useI18n } from "../i18n";
import { useTheme } from "../theme";

const RAY_COLOR = {
  dark: "rgba(65, 90, 119, 0.18)",
  light: "rgba(150, 122, 161, 0.30)",
} as const;

const RAY_GLOW = {
  dark: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(27, 38, 59, 0.45), transparent 70%)",
  light:
    "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(150, 122, 161, 0.22), transparent 70%)",
} as const;

export default function Hero() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "50px", threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const morphWords = [
    t("hero.words.first"),
    t("hero.words.second"),
    t("hero.words.third"),
  ];

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {isInView ? (
        <LightRays
          count={6}
          color={RAY_COLOR[theme]}
          blendMode={theme === "light" ? "multiply" : "screen"}
          blur={8}
          speed={4}
          length="90vh"
          className="absolute inset-0"
        />
      ) : (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: RAY_GLOW[theme] }}
          aria-hidden
        />
      )}

      <div className="relative z-10 flex flex-col items-center px-5 text-center md:gap-6">
        <motion.p
          className="text-lg tracking-wide text-muted md:text-xl"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {t("hero.greeting")}
        </motion.p>

        <motion.h1
          className="max-w-4xl text-4xl font-bold leading-tight text-ink md:text-6xl lg:text-7xl"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <span className="hidden md:inline">{t("hero.desktopTitle")}</span>
          <span className="inline md:hidden">{t("hero.mobileTitle")}</span>
        </motion.h1>

        <motion.div
          className="flex min-h-16 min-w-full items-center justify-center md:min-h-24"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          {isInView ? (
            <MorphingText
              texts={morphWords}
              className="h-16 text-lavender md:h-24"
            />
          ) : (
            <span className="h-16 font-sans text-[40pt] font-bold leading-none text-lavender md:h-24 md:text-5xl lg:text-[6rem]">
              {morphWords[0]}
            </span>
          )}
        </motion.div>

        <motion.p
          className="mt-4 max-w-xl text-base text-muted md:mt-0 md:text-lg"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          {t("hero.tagline")}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col items-center gap-4 md:mt-2"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <a
            href="#projects"
            className="cta-pill rounded-full px-7 py-3 text-base font-medium text-on-accent transition hover:-translate-y-0.5 hover:brightness-110"
          >
            {t("hero.ctaProjects")}
          </a>
          <SocialLinks />
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-linear-to-b from-transparent to-primary"
        aria-hidden
      />
    </section>
  );
}
