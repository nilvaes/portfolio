import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import { useI18n, type Language } from "../i18n";
import { cn } from "../lib/utils";

const SECTIONS = ["projects", "about", "contact"] as const;
const LANGUAGES: Language[] = ["de", "en"];
const EASE = [0.22, 1, 0.36, 1] as const;

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/savasdev/" },
  { label: "Xing", href: "https://www.xing.com/profile/Oemer_Savas094643" },
  { label: "GitHub", href: "https://github.com/nilvaes" },
] as const;

/** Which section is currently in the middle of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["home", ...SECTIONS].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return active;
}

/** Whether the page has been scrolled past the very top. */
function useScrolled() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrolled;
}

function LanguageSwitch({ className }: { className?: string }) {
  const { language, setLanguage, t } = useI18n();
  return (
    <div
      role="group"
      aria-label={t("nav.toggleAria")}
      className={cn("flex rounded-full border border-ink/10 p-0.5 text-xs font-semibold", className)}
    >
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          aria-pressed={language === lang}
          className={cn(
            "relative cursor-pointer rounded-full px-2.5 py-1 uppercase transition-colors",
            language === lang ? "text-primary" : "text-muted hover:text-ink"
          )}
        >
          {language === lang && (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 rounded-full bg-ink"
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative">{lang}</span>
        </button>
      ))}
    </div>
  );
}

function Logo() {
  return (
    <a href="#home" className="group flex items-center gap-2.5" aria-label="Ömer Savas – Start">
      <span className="grid size-9 place-items-center rounded-full bg-ink text-sm font-bold text-primary transition-transform duration-300 group-hover:-rotate-12">
        ÖS
      </span>
      <span className="hidden font-semibold text-ink sm:inline">Ömer Savas</span>
    </a>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n();
  const active = useActiveSection();
  const scrolled = useScrolled();

  // Lock page scroll and allow Escape while the mobile menu is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
        <nav
          aria-label={t("nav.mainAria")}
          className={cn(
            "mx-auto flex max-w-5xl items-center justify-between rounded-full border py-2 pr-2 pl-2 transition-all duration-300 sm:pl-3",
            scrolled || isOpen
              ? "border-ink/10 bg-surface/75 shadow-lg shadow-black/5 backdrop-blur-xl"
              : "border-transparent bg-transparent"
          )}
        >
          <Logo />

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {SECTIONS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={cn(
                    "relative block rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active === id ? "text-ink" : "text-muted hover:text-ink"
                  )}
                >
                  {active === id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-ink/8"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative">{t(`nav.${id}`)}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LanguageSwitch className="hidden md:flex" />
            <ThemeToggle />
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsOpen((o) => !o)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={t(isOpen ? "nav.closeMenu" : "nav.openMenu")}
              className="grid size-9 cursor-pointer place-items-center rounded-full border border-ink/10 text-ink md:hidden"
            >
              <span className="relative block h-3 w-4" aria-hidden>
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-4 rounded bg-current transition-all duration-300",
                    isOpen ? "top-1.25 rotate-45" : "top-0"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-4 rounded bg-current transition-all duration-300",
                    isOpen ? "top-1.25 -rotate-45" : "top-2.5"
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-primary/95 px-6 pt-28 pb-10 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="flex flex-col gap-2">
              {SECTIONS.map((id, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.5, ease: EASE }}
                >
                  <a
                    href={`#${id}`}
                    onClick={close}
                    className="flex items-baseline gap-4 py-2 text-4xl font-bold text-ink"
                  >
                    <span className="font-mono text-sm font-normal text-subtle">0{i + 1}</span>
                    {t(`nav.${id}`)}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-auto flex flex-col gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <LanguageSwitch className="w-fit text-sm" />
              <ul className="flex gap-5 text-sm text-muted">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                      {s.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

