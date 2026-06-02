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
      date: "Über mich & Ausbildung",
      contents: [
        "Ich habe meine 3 Jahre lange Ausbildung erfolgreich abgeschlossen und dabei meinen Schwerpunkt in der Fullstack-Entwicklung gefunden.",
        "Ich lege Wert auf sauberen, gut strukturierten Code und Anwendungen, die sowohl zuverlässig als auch visuell ansprechend sind.",
        "Im Team gelte ich als kommunikativer, hilfsbereiter Kollege mit einem lösungsorientierten Mindset.",
      ],
    },
    {
      title: "",
      job: "",
      date: "Mein Tech-Stack",
      contents: [
        "Frontend: Erfahrung mit Vue.js, Nuxt, React, TypeScript und Tailwind CSS für moderne, responsive UIs.",
        "Backend: Node.js und Nest.js mit Datenbanken wie SQL, Supabase, TypeORM und Prisma.",
        "Workflow: Versionierung mit Git, Arbeiten mit VSCode, Cursor oder Codex sowie Einsatz von Docker für reproduzierbare Umgebungen.",
      ],
    },
    {
      title: "",
      job: "",
      date: "Vision",
      contents: [
        "Ich halte mein Wissen kontinuierlich aktuell und beschäftige mich verstärkt mit dem Einsatz von KI in Web-Anwendungen.",
        "Ich suche ein Umfeld, in dem ich mich fachlich weiterentwickeln und an praxisnahen Projekten mitarbeiten kann.",
        "Ob Startup oder etabliertes Unternehmen – entscheidend ist für mich eine offene Lernkultur und gute Zusammenarbeit.",
      ],
    },
  ],
  en: [
    {
      title: "",
      job: "",
      date: "About me & Education",
      contents: [
        "I successfully completed my 3 year long apprenticeship and developed a strong focus on full stack development.",
        "I care about clean, well-structured code and products that are both reliable and visually polished.",
        "In teams, I am known as a communicative, friendly colleague with a solution-oriented mindset.",
      ],
    },
    {
      title: "",
      job: "",
      date: "My Tech Stack",
      contents: [
        "Frontend: Experience with Vue.js, Nuxt, React, TypeScript, and Tailwind CSS for modern, responsive UIs.",
        "Backend: Node.js and Nest.js with databases such as SQL, Supabase, TypeORM, and Prisma.",
        "Workflow: Confident with Git, VSCode, Cursor or Codex and Docker for reproducible environments.",
      ],
    },
    {
      title: "",
      job: "",
      date: "Vision",
      contents: [
        "I keep my skills up to date and currently focus on integrating AI into modern web applications.",
        "I am looking for a team where I can grow professionally and contribute to real-world projects.",
        "Whether startup or established company, a strong learning culture and good collaboration matter most to me.",
      ],
    },
  ],
};

export function getExperiences(language: Language): ExperienceEntry[] {
  return experiencesByLanguage[language];
}
