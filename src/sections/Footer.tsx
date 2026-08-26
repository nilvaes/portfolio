import SocialLinks from "../components/SocialLinks";
import { useI18n } from "../i18n";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="c-space pt-16 pb-6 text-sm text-muted">
      <SocialLinks className="justify-center pb-10" />

      <div className="h-px w-full bg-linear-to-r from-transparent via-ink/20 to-transparent" />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>
            © {new Date().getFullYear()} Ömer. {t("footer.rights")}
          </span>
          <a href="#datenschutz" className="underline hover:text-ink">
            {t("footer.privacy")}
          </a>
          <a href="#info" className="underline hover:text-ink">
            {t("footer.siteInfo")}
          </a>
        </div>

        <div>
          {t("footer.builtWith")}{" "}
          <a
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-ink"
          >
            React
          </a>
          ,{" "}
          <a
            href="https://www.typescriptlang.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-ink"
          >
            TypeScript{" "}
          </a>
          {t("footer.and")}{" "}
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-ink"
          >
            Tailwind CSS
          </a>
          .
        </div>
      </div>

      <p className="mt-4 text-xs text-subtle">{t("footer.nonCommercial")}</p>
    </footer>
  );
}
