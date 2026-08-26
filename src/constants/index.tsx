import type { Language } from "../i18n";

export type ExperienceEntry = {
  title: string;
  job: string;
  date: string;
  contents: string[];
};

const experiencesByLanguage: Record<Language, ExperienceEntry[]> = {
  de: [
    {
      title: "",
      job: "",
      date: "Ausbildung",
      contents: [
        "Ausgebildeter Fachinformatiker für Anwendungsentwicklung mit über drei Jahren praktischer Entwicklungserfahrung im Ausbildungsbetrieb. Mein Schwerpunkt liegt auf Full-Stack-Webentwicklung mit TypeScript, Vue.js/Nuxt und Node.js.",
        "Eigene Anwendungen baue ich zusätzlich mit React und Next.js.",
        "Ich lege Wert auf sauberen, gut strukturierten Code und Anwendungen, die sowohl zuverlässig als auch visuell ansprechend sind.",
      ],
    },
    {
      title: "",
      job: "",
      date: "Tech-Stack",
      contents: [
        "Frontend: TypeScript, Vue.js, Nuxt, React, Next.js und Tailwind CSS.",
        "Backend: Node.js, REST APIs und NestJS.",
        "Datenbanken: PostgreSQL, Supabase und Prisma.",
        "Tools: Git und Docker.",
      ],
    },
    {
      title: "",
      job: "",
      date: "Vision",
      contents: [
        "Ich halte mein Wissen aktuell und setze KI gezielt in Web-Anwendungen ein.",
        "Ich suche ein Umfeld, in dem ich als Full-Stack-Entwickler an produktiven Anwendungen mitarbeite.",
        "Ob Startup oder etabliertes Unternehmen – entscheidend sind für mich gute Zusammenarbeit und klare Produktziele.",
      ],
    },
  ],
  en: [
    {
      title: "",
      job: "",
      date: "Education",
      contents: [
        "Trained Fachinformatiker for Application Development with over three years of practical development experience at my training company. My focus is full-stack web development with TypeScript, Vue.js/Nuxt, and Node.js.",
        "I also build my own applications with React and Next.js.",
        "I care about clean, well-structured code and products that are both reliable and visually polished.",
      ],
    },
    {
      title: "",
      job: "",
      date: "Tech Stack",
      contents: [
        "Frontend: TypeScript, Vue.js, Nuxt, React, Next.js, and Tailwind CSS.",
        "Backend: Node.js, REST APIs, and NestJS.",
        "Database: PostgreSQL, Supabase, and Prisma.",
        "Tools: Git and Docker.",
      ],
    },
    {
      title: "",
      job: "",
      date: "Vision",
      contents: [
        "I keep my skills current and apply AI deliberately in web applications.",
        "I am looking for a team where I can contribute as a full-stack developer on production applications.",
        "Whether startup or established company, good collaboration and clear product goals matter most to me.",
      ],
    },
  ],
};

export function getExperiences(language: Language): ExperienceEntry[] {
  return experiencesByLanguage[language];
}
