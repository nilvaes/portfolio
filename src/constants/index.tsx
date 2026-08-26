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
      date: "Aug 2022 – Jan 2026",
      title: "Ausbildung zum Fachinformatiker für Anwendungsentwicklung",
      job: "IQ-ME GmbH · Köln",
      contents: [
        "Dreieinhalb Jahre praktische Entwicklungsarbeit im Betrieb – von der ersten Komponente bis zu produktiv genutzten Features.",
        "Schwerpunkt auf Full-Stack-Webentwicklung mit TypeScript, Vue.js/Nuxt und Node.js, inklusive Datenmodellierung und REST-Schnittstellen.",
        "Abgeschlossen mit dem IHK-Abschlussprojekt: einem Onboarding-Portal mit Dokumentenverwaltung, Authentifizierung und rollenbasierten Zugriffsrechten.",
      ],
    },
    {
      date: "Arbeitsweise",
      title: "Wie ich arbeite",
      job: "",
      contents: [
        "Ich lege Wert auf sauberen, gut strukturierten Code und Anwendungen, die zuverlässig laufen und dabei gut aussehen.",
        "Im Team gelte ich als kommunikativer, hilfsbereiter Kollege mit einem lösungsorientierten Mindset.",
        "KI-Tools setze ich bewusst als Beschleuniger ein – überprüfen und verstehen muss ich den Code trotzdem selbst.",
      ],
    },
    {
      date: "Aktuell",
      title: "Woran ich gerade arbeite",
      job: "",
      contents: [
        "Ich baue eigene Projekte mit React und Next.js, um meinen Stack breit zu halten und Neues auszuprobieren.",
        "Zurzeit beschäftige ich mich damit, wie sich KI sinnvoll in Web-Anwendungen einbauen lässt.",
        "Neue Technologien schaue ich mir am liebsten an, indem ich etwas damit baue – nicht, indem ich nur darüber lese.",
      ],
    },
  ],
  en: [
    {
      date: "Aug 2022 – Jan 2026",
      title: "Apprenticeship as Fachinformatiker for Application Development",
      job: "IQ-ME GmbH · Cologne",
      contents: [
        "Three and a half years of hands-on development work in the company – from a first component to features running in production.",
        "Focused on full-stack web development with TypeScript, Vue.js/Nuxt, and Node.js, including data modelling and REST APIs.",
        "Completed with the IHK final project: an onboarding portal with document management, authentication, and role-based access control.",
      ],
    },
    {
      date: "How I work",
      title: "Working style",
      job: "",
      contents: [
        "I care about clean, well-structured code and applications that run reliably while still looking good.",
        "In teams I am known as a communicative, helpful colleague with a solution-oriented mindset.",
        "I use AI tools deliberately as an accelerator – but I still review and understand the code myself.",
      ],
    },
    {
      date: "Currently",
      title: "What I am working on",
      job: "",
      contents: [
        "I build my own projects with React and Next.js to keep my stack broad and try out new things.",
        "At the moment I am exploring how AI can be built into web applications in a way that actually helps.",
        "I prefer to get to know a new technology by building something with it, not by only reading about it.",
      ],
    },
  ],
};

export function getExperiences(language: Language): ExperienceEntry[] {
  return experiencesByLanguage[language];
}
