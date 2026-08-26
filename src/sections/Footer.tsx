import { useI18n } from "../i18n";

export default function Footer() {
  const { t } = useI18n();

  return (
    <section className="flex flex-wrap items-center justify-between gap-5 pb-3 text-sm text-muted c-space">
      <div className="bg-linear-to-r from-transparent mb-4 via-ink/20 to-transparent h-px w-full" />
      <div>
        © {new Date().getFullYear()} Ömer. {t("footer.rights")}
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
    </section>
  );
}
