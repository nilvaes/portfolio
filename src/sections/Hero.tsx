import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { LightRays } from "../components/LightRays";
import { MorphingText } from "../components/MorphingText";
import { useI18n } from "../i18n";

export default function Hero() {
  const { t } = useI18n();
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
          color="rgba(124, 87, 219, 0.15)"
          blur={10}
          speed={4}
          length="80vh"
          className="absolute inset-0"
        />
      ) : (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124, 87, 219, 0.12), transparent 70%)",
          }}
          aria-hidden
        />
      )}

      <div className="relative z-10 flex flex-col items-center px-5 text-center md:gap-8">
        <motion.p
          className="text-lg tracking-wide text-neutral-400 md:text-xl"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {t("hero.greeting")}
        </motion.p>

        <motion.h1
          className="max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
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
          className="max-w-2xl text-2xl font-medium text-neutral-300 md:text-3xl"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          <span className="hidden md:inline">{t("hero.desktopSuffix")}</span>
          <span className="inline md:hidden">{t("hero.mobileSuffix")}</span>
        </motion.p>
      </div>
    </section>
  );
}
