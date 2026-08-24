import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { LightRays } from "../components/LightRays";
import { MorphingText } from "../components/MorphingText";
import { useI18n } from "../i18n";
import { asset } from "../lib/utils";

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
          blur={8}
          speed={4}
          length="90vh"
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

      <img
        src={asset("assets/hero-stipple.png")}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[-8%] z-1 h-[78vh] w-auto max-w-[min(520px,70vw)] -translate-y-1/2 object-contain opacity-20 select-none sm:right-0 sm:opacity-25 lg:right-[6%] lg:opacity-30"
        style={{
          maskImage:
            "radial-gradient(ellipse 72% 78% at 58% 46%, #000 32%, transparent 74%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 72% 78% at 58% 46%, #000 32%, transparent 74%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-4 px-5 text-center md:gap-8">
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
          className="flex max-w-4xl flex-col items-center gap-2 text-white md:gap-3"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <span className="text-[1.7rem] leading-tight font-bold sm:text-4xl md:text-6xl lg:text-7xl">
            {t("hero.title")}
          </span>
          <span className="text-lg font-medium text-neutral-300 sm:text-2xl md:text-3xl">
            {t("hero.titleFocus")}
          </span>
        </motion.h1>

        <motion.div
          className="flex min-h-12 min-w-full items-center justify-center md:min-h-24"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          {isInView ? (
            <MorphingText
              texts={morphWords}
              className="h-12 text-lavender md:h-24"
            />
          ) : (
            <span className="h-12 font-sans text-[1.7rem] font-bold leading-none text-lavender md:h-24 md:text-5xl lg:text-[6rem]">
              {morphWords[0]}
            </span>
          )}
        </motion.div>

        <motion.p
          className="max-w-2xl text-xl font-medium text-neutral-300 sm:text-2xl md:text-3xl"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          {t("hero.suffix")}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-1 text-sm text-neutral-400 md:mt-14"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 font-medium text-neutral-200">
            <span className="size-2 rounded-full bg-mint shadow-[0_0_12px_var(--color-mint)]" />
            {t("hero.availability")}
          </span>
          <span>{t("hero.availabilityLocation")}</span>
          <div className="mt-4 flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/savasdev/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 transition-opacity hover:opacity-100"
              aria-label="LinkedIn"
            >
              <img
                className="h-7 w-7"
                src={asset("assets/logos/linkedin-white.svg")}
                alt=""
              />
            </a>
            <a
              href="https://github.com/nilvaes"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 transition-opacity hover:opacity-100"
              aria-label="GitHub"
            >
              <img
                className="h-10 w-10"
                src={asset("assets/logos/github-white.svg")}
                alt=""
              />
            </a>
          </div>
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-1 h-40 bg-linear-to-b from-transparent to-primary"
        aria-hidden
      />
    </section>
  );
}
