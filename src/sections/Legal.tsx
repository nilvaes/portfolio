import { useEffect } from "react";
import {
  getPrivacyPolicy,
  getSiteInfo,
  type LegalDocument,
} from "../constants/legal";
import { useI18n } from "../i18n";

export type LegalPage = "datenschutz" | "info";

function Document({ doc }: { doc: LegalDocument }) {
  return (
    <article className="mt-12">
      <h1 className="text-heading">{doc.title}</h1>
      <p className="mt-2 text-sm text-subtle">{doc.updated}</p>

      {doc.sections.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="text-xl font-semibold text-ink">{section.heading}</h2>
          {section.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted md:text-base"
            >
              {paragraph}
            </p>
          ))}
          {section.bullets && (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted md:text-base">
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </article>
  );
}

export default function Legal({ page }: { page: LegalPage }) {
  const { language, t } = useI18n();

  // Instant, so opening a legal page lands at the top instead of animating there.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  const doc =
    page === "datenschutz" ? getPrivacyPolicy(language) : getSiteInfo(language);

  return (
    <main className="c-space mx-auto max-w-3xl pb-24 pt-28">
      <a
        href="#home"
        className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
      >
        ← {t("legal.back")}
      </a>
      <Document doc={doc} />
    </main>
  );
}
