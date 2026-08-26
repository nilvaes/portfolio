import { motion } from "motion/react";
import { useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import { useI18n } from "../i18n";
import { asset } from "../lib/utils";

type NavigationProps = {
  links: Array<{ label: string; href: string }>;
  onNavigate?: () => void;
};

function Navigation({ links, onNavigate }: NavigationProps) {
  return (
    <ul className="nav-ul">
      {links.map(({ label, href }) => (
        <li className="nav-li" key={label}>
          <a
            href={href}
            className="nav-link cursor-pointer"
            onClick={onNavigate}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useI18n();

  const navLinks = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <div className="fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40">
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-0">
          <a
            href="#home"
            className="text-xl font-bold transition-colors text-muted hover:text-ink"
          >
            Ömer
          </a>
          <div className="flex items-center gap-2 sm:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex cursor-pointer text-muted hover:text-ink focus:outline-none"
            >
              <img
                src={
                  isOpen ? asset("assets/close.svg") : asset("assets/menu.svg")
                }
                className="w-6 h-6 light:invert"
                alt="toggle"
              />
            </button>
          </div>
          <nav className="hidden sm:flex items-center gap-4">
            <Navigation links={navLinks} />
            <div className="flex items-center gap-2 text-sm">
              <button
                className={`cursor-pointer ${
                  language === "de" ? "text-ink" : "text-muted"
                }`}
                onClick={() => setLanguage("de")}
                aria-label={t("nav.toggleAria")}
              >
                DE
              </button>
              <span className="text-subtle">/</span>
              <button
                className={`cursor-pointer ${
                  language === "en" ? "text-ink" : "text-muted"
                }`}
                onClick={() => setLanguage("en")}
                aria-label={t("nav.toggleAria")}
              >
                EN
              </button>
            </div>
            <ThemeToggle />
          </nav>
        </div>
      </div>
      {isOpen && (
        <motion.div
          className="block overflow-hidden text-center sm:hidden"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ maxHeight: " 100vh" }}
          transition={{ duration: 1 }}
        >
          <nav className="pb-5">
            <Navigation links={navLinks} onNavigate={() => setIsOpen(false)} />
            <div className="flex items-center justify-center gap-4 mt-2 text-sm">
              <button
                className={`cursor-pointer ${
                  language === "de" ? "text-ink" : "text-muted"
                }`}
                onClick={() => setLanguage("de")}
                aria-label={t("nav.toggleAria")}
              >
                DE
              </button>
              <button
                className={`cursor-pointer ${
                  language === "en" ? "text-ink" : "text-muted"
                }`}
                onClick={() => setLanguage("en")}
                aria-label={t("nav.toggleAria")}
              >
                EN
              </button>
            </div>
          </nav>
        </motion.div>
      )}
    </div>
  );
}
