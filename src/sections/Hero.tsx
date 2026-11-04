import { Fragment, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { LightRays } from "../components/LightRays";
import { BrowserFrame } from "../components/BrowserFrame";
import SocialLinks from "../components/SocialLinks";
import { useI18n } from "../i18n";
import { useTheme } from "../theme";
import { asset } from "../lib/utils";

const RAY_COLOR = {
  dark: "rgba(119, 141, 169, 0.16)",
  light: "rgba(150, 122, 161, 0.30)",
} as const;

const NAME = "Ömer Savas";
const WORD_INTERVAL_MS = 2400;
const EASE = [0.22, 1, 0.36, 1] as const;

const STACK = [
  { src: "assets/projects/sumi.jpg", url: "sumi.savasbuilds.com", alt: "Sumi" },
  { src: "assets/projects/bosporus.jpg", url: "bosporus-pide.com", alt: "Bosporus Pide" },
  { src: "assets/projects/dictionary.jpg", url: "dictionary.savasbuilds.com", alt: "Your Dictionary" },
] as const;

/** Cycles through the tech words with a vertical slide. */
function RotatingWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      WORD_INTERVAL_MS
    );
    return () => window.clearInterval(id);
  }, [words.length]);

  return (
    <span className="relative inline-grid h-[1.2em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          className="text-gradient col-start-1 row-start-1 whitespace-nowrap"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** One screenshot in the floating stack; each layer moves a bit more for depth. */
function StackCard({
  item,
  depth,
  mouseX,
  mouseY,
}: {
  item: (typeof STACK)[number];
  depth: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const x = useTransform(mouseX, (v) => v * (10 + depth * 14));
  const y = useTransform(mouseY, (v) => v * (8 + depth * 10));
  const layout = [
    "left-0 top-0 w-[78%] -rotate-6",
    "right-0 top-[18%] w-[74%] rotate-3",
    "left-[10%] top-[44%] w-[80%] -rotate-1",
  ][depth];

  return (
    <motion.div
      className={`absolute ${layout}`}
      style={{ x, y, zIndex: depth + 1 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.35 + depth * 0.12, duration: 0.8, ease: EASE }}
      >
        <BrowserFrame
          src={asset(item.src)}
          alt={item.alt}
          url={item.url}
          loading="eager"
          className="transition-transform duration-500 hover:-translate-y-2"
        />
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(true);

  // Normalised mouse position (-0.5 … 0.5), smoothed with a spring.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, { stiffness: 60, damping: 18 });
  const mouseY = useSpring(rawY, { stiffness: 60, damping: 18 });
  const tiltX = useTransform(mouseY, (v) => v * -10);
  const tiltY = useTransform(mouseX, (v) => v * 12);

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

  // Pointer tracking writes straight to motion values — no re-renders.
  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    rawX.set(px / rect.width - 0.5);
    rawY.set(py / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const words = [
    t("hero.words.first"),
    t("hero.words.second"),
    t("hero.words.third"),
    t("hero.words.fourth"),
  ];

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.7, ease: EASE },
  });

  return (
    <section
      ref={sectionRef}
      id="home"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative flex min-h-svh items-center overflow-hidden pt-24 pb-16"
    >
      {/* Background layers */}
      {isInView && (
        <LightRays
          count={6}
          color={RAY_COLOR[theme]}
          blendMode={theme === "light" ? "multiply" : "screen"}
          blur={8}
          speed={4}
          length="90vh"
          className="absolute inset-0"
        />
      )}
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="hero-aurora pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 c-space lg:grid-cols-[1.1fr_1fr]">
        {/* Copy */}
        <div className="flex flex-col items-start">
          <motion.p
            {...fadeUp(0)}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-surface/50 px-4 py-1.5 text-xs text-muted backdrop-blur sm:text-sm"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-mint" />
            </span>
            {t("hero.badge")}
          </motion.p>

          <h1 className="text-[clamp(3rem,13vw,6.5rem)] font-bold leading-[0.95] tracking-tight text-ink lg:text-[clamp(4rem,6.4vw,6.5rem)]">
            <span className="sr-only">{NAME}</span>
            <span aria-hidden>
              {NAME.split(" ").map((word, w, words) => {
                const offset = words.slice(0, w).join(" ").length + (w > 0 ? 1 : 0);
                return (
                  // Words never break internally; letters animate inside them.
                  <Fragment key={word}>
                  <span className="inline-block whitespace-nowrap">
                    {word.split("").map((char, i) => (
                      <motion.span
                        key={i}
                        className="inline-block"
                        initial={{ opacity: 0, y: "0.6em", rotate: 6 }}
                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                        transition={{
                          delay: 0.05 + (offset + i) * 0.035,
                          duration: 0.6,
                          ease: EASE,
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                  {w < words.length - 1 && " "}
                  </Fragment>
                );
              })}
            </span>
          </h1>

          <motion.p
            {...fadeUp(0.35)}
            className="mt-6 text-2xl font-semibold leading-tight text-ink/90 md:text-4xl lg:text-[clamp(1.75rem,2.5vw,2.25rem)]"
          >
            {t("hero.titlePrefix")}
            <br />
            <RotatingWord words={words} />
          </motion.p>

          <motion.p
            {...fadeUp(0.45)}
            className="mt-6 max-w-xl text-base text-muted text-pretty md:text-lg"
          >
            {t("hero.tagline")}
          </motion.p>

          <motion.div
            {...fadeUp(0.55)}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="cta-pill group inline-flex items-center gap-2 rounded-full px-7 py-3 font-medium text-on-accent shadow-lg shadow-royal/30 transition hover:-translate-y-0.5 hover:brightness-110"
            >
              {t("hero.ctaProjects")}
              <span className="transition-transform group-hover:translate-y-0.5" aria-hidden>
                ↓
              </span>
            </a>
            <a
              href="#contact"
              className="rounded-full border border-ink/15 px-7 py-3 font-medium text-ink transition hover:-translate-y-0.5 hover:border-ink/40 hover:bg-ink/5"
            >
              {t("hero.ctaContact")}
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.65)} className="mt-8 -ml-2">
            <SocialLinks size="sm" />
          </motion.div>
        </div>

        {/* Floating project stack (desktop) */}
        <a
          href="#projects"
          aria-label={t("hero.ctaProjects")}
          className="relative hidden aspect-[5/4] w-full lg:block"
          style={{ perspective: 1200 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
          >
            {STACK.map((item, depth) => (
              <StackCard
                key={item.url}
                item={item}
                depth={depth}
                mouseX={mouseX}
                mouseY={mouseY}
              />
            ))}
          </motion.div>
        </a>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#projects"
        aria-label={t("hero.scroll")}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-subtle md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        {t("hero.scroll")}
        <span className="relative h-10 w-px overflow-hidden bg-ink/15">
          <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-ink/60" />
        </span>
      </motion.a>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32 bg-linear-to-b from-transparent to-primary"
        aria-hidden
      />
    </section>
  );
}
