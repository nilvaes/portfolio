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
      title: "Über mich & Ausbildung",
      job: "Fachinformatiker Anwendungsentwicklung",
      date: "Status: Abgeschlossen",
      contents: [
        "Ich habe meine Ausbildung erfolgreich abgeschlossen und dabei meine Leidenschaft in der Fullstack-Entwicklung gefunden.",
        "Mein Antrieb: Ich wollte schon immer verstehen, wie man komplexe Apps baut, die nicht nur funktionieren, sondern auch visuell überzeugen.",
        "Im Team schätzt man mich als kommunikativen und freundlichen Kollegen, der Probleme lösungsorientiert angeht.",
        "Wenn ich nicht am Coden bin, finde ich meinen Ausgleich beim Sport, Kochen oder Musikhören.",
      ],
    },
    {
      title: "Mein Tech-Stack",
      job: "Fullstack & Tools",
      date: "Core Skills",
      contents: [
        "Frontend: Spezialisiert auf Vue.js und Nuxt mit TypeScript und Tailwind CSS für moderne UIs.",
        "Backend: Solide Logik mit Node.js und Nest.js. Datenbank-Management über SQL, Supabase, TypeORM und Prisma.",
        "Workflow & Tools: Sicherer Umgang mit Git (GitHub/GitLab), VSCode und Containerisierung via Docker.",
        "Ich bewege mich sicher zwischen Frontend und Backend und liebe es, beide Welten zu verbinden.",
      ],
    },
    {
      title: "Mindset & Zukunft",
      job: "Next Steps",
      date: "Vision",
      contents: [
        "Die Tech-Welt steht nie still und ich auch nicht. Ich bin neugierig und immer offen dafür, neue Technologien zu lernen.",
        "Aktuell vertiefe ich mein Wissen im Bereich Künstliche Intelligenz (KI) und wie man diese in moderne Web-Apps integriert.",
        "Ich suche kein statisches Umfeld, sondern ein Team, in dem ich mich weiterentwickeln und spannende Projekte umsetzen kann.",
        "Egal ob Startup oder etabliertes Unternehmen: Ich bin bereit für die nächste Challenge.",
      ],
    },
  ],
  en: [
    {
      title: "About Me & Education",
      job: "Application Development Specialist",
      date: "Status: Completed",
      contents: [
        "I successfully completed my apprenticeship and discovered my passion for full stack development.",
        "My drive: I always wanted to understand how to build complex apps that not only work well but also look great.",
        "Teams appreciate me as a communicative and friendly colleague who approaches problems with a solution-oriented mindset.",
        "When I'm not coding, I recharge through sports, cooking, or listening to music.",
      ],
    },
    {
      title: "My Tech Stack",
      job: "Full Stack & Tools",
      date: "Core Skills",
      contents: [
        "Frontend: Specialized in Vue.js and Nuxt with TypeScript and Tailwind CSS for modern UIs.",
        "Backend: Solid logic with Node.js and Nest.js. Database management with SQL, Supabase, TypeORM, and Prisma.",
        "Workflow & Tools: Confident with Git (GitHub/GitLab), VSCode, and containerization with Docker.",
        "I work comfortably across frontend and backend and enjoy connecting both worlds.",
      ],
    },
    {
      title: "Mindset & Future",
      job: "Next Steps",
      date: "Vision",
      contents: [
        "The tech world never stands still and neither do I. I'm curious and always open to learning new technologies.",
        "Right now, I am deepening my knowledge in artificial intelligence (AI) and how to integrate it into modern web apps.",
        "I'm not looking for a static environment, but for a team where I can grow and build exciting projects.",
        "Whether startup or established company: I'm ready for the next challenge.",
      ],
    },
  ],
};

export function getExperiences(language: Language): ExperienceEntry[] {
  return experiencesByLanguage[language];
}
