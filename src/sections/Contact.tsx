import { useState } from "react";
import { motion } from "motion/react";
import { useI18n } from "../i18n";
import { asset } from "../lib/utils";

/**
 * Set this to a public contact address (e.g. one forwarded via Cloudflare
 * Email Routing) to show an e-mail button. Leave empty to hide it.
 */
const CONTACT_EMAIL = "";

const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/savasdev/", icon: "linkedin-white.svg" },
  { label: "Xing", href: "https://www.xing.com/profile/Oemer_Savas094643", icon: "xing-white.svg" },
  { label: "GitHub", href: "https://github.com/nilvaes", icon: "github-white.svg" },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be unavailable (e.g. insecure context) – the mailto link still works.
    }
  };

  return (
    <section id="contact" className="relative c-space pt-24 md:pt-32">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative z-10 overflow-hidden rounded-[2rem] border border-ink/10 px-6 py-16 text-center card-surface backdrop-blur-sm md:px-16 md:py-24"
      >
        <div className="hero-aurora pointer-events-none absolute inset-0" aria-hidden />
        <div className="hero-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden />

        <div className="relative mx-auto max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-lavender">
            {t("contact.eyebrow")}
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-balance md:text-6xl">
            {t("contact.headingStart")}{" "}
            <span className="text-gradient">{t("contact.headingAccent")}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted text-pretty md:text-lg">
            {t("contact.text")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {CONTACT_EMAIL && (
              <>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="cta-pill rounded-full px-7 py-3 font-medium text-on-accent shadow-lg shadow-royal/30 transition hover:-translate-y-0.5 hover:brightness-110"
                >
                  {t("contact.email")}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="cursor-pointer rounded-full border border-ink/15 px-5 py-3 text-sm font-medium text-ink transition hover:border-ink/40 hover:bg-ink/5"
                >
                  {copied ? t("contact.copied") : t("contact.copy")}
                </button>
              </>
            )}
            {LINKS.map(({ label, href, icon }, i) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  !CONTACT_EMAIL && i === 0
                    ? "cta-pill inline-flex items-center gap-2 rounded-full px-7 py-3 font-medium text-on-accent shadow-lg shadow-royal/30 transition hover:-translate-y-0.5 hover:brightness-110"
                    : "inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 font-medium text-ink transition hover:-translate-y-0.5 hover:border-ink/40 hover:bg-ink/5"
                }
              >
                <img
                  src={asset(`assets/logos/${icon}`)}
                  alt=""
                  aria-hidden
                  className={`size-4 ${!CONTACT_EMAIL && i === 0 ? "" : "light:invert"}`}
                />
                {label}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
