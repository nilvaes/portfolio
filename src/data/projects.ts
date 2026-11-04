import type { Language } from "../i18n";

export type ProjectCategory = "webapp" | "landing" | "desktop";

export type ProjectStatus = "live" | "client" | "concept" | "wip" | "caseStudy" | "openSource";

type LocalizedText = {
  title: string;
  description: string;
  highlights?: string[];
};

export type Project = {
  id: string;
  category: ProjectCategory;
  /** "feature" = full-width card with highlights, "card" = grid card */
  layout: "feature" | "card";
  status: ProjectStatus;
  image?: string;
  /** Custom illustration for projects without a public screenshot */
  illustration?: "onboarding" | "switchAudio";
  live?: string;
  github?: string;
  tech: string[];
  text: Record<Language, LocalizedText>;
};

export const PROJECTS: Project[] = [
  {
    id: "dictionary",
    category: "webapp",
    layout: "feature",
    status: "live",
    image: "assets/projects/dictionary.jpg",
    live: "https://dictionary.savasbuilds.com/",
    tech: ["Nuxt", "Vue", "TypeScript"],
    text: {
      de: {
        title: "Your Dictionary",
        description:
          "Ein persönliches Wörterbuch zum Sprachenlernen: Wörter sammeln, in eigenen Worten erklären und mit Karteikarten wiederholen.",
        highlights: [
          "Mehrere Wörterbücher pro Sprache, alphabetisch durchsuchbar",
          "Karteikarten-Modus zum Üben neuer Wörter",
          "Benutzerkonten mit privaten Daten und Export",
        ],
      },
      en: {
        title: "Your Dictionary",
        description:
          "A personal dictionary for language learners: collect words, explain them in your own words and practise them with flashcards.",
        highlights: [
          "Multiple dictionaries per language, browsable A–Z",
          "Flashcard mode to practise new words",
          "User accounts with private data and export",
        ],
      },
    },
  },
  {
    id: "sumi",
    category: "webapp",
    layout: "feature",
    status: "live",
    image: "assets/projects/sumi.jpg",
    live: "https://sumi.savasbuilds.com/",
    github: "https://github.com/nilvaes/sumi",
    tech: ["Next.js", "TypeScript", "Supabase", "TanStack Query", "GraphQL"],
    text: {
      de: {
        title: "Sumi – Anime entdecken & verfolgen",
        description:
          "Eine Full-Stack-Plattform zum Entdecken und Verfolgen von Anime, angebunden an die AniList-GraphQL-API.",
        highlights: [
          "Fuzzy-Suche, Browse-Ansicht und Airing-Schedule",
          "Benutzerkonten mit Supabase-Auth und -Datenbank",
          "Typsichere GraphQL-Abfragen per Code-Generierung",
        ],
      },
      en: {
        title: "Sumi – Discover & Track Anime",
        description:
          "A full-stack platform to discover and track anime, built on top of the AniList GraphQL API.",
        highlights: [
          "Fuzzy search, browse view and airing schedule",
          "User accounts with Supabase auth and database",
          "Type-safe GraphQL queries via code generation",
        ],
      },
    },
  },
  {
    id: "bosporus",
    category: "landing",
    layout: "card",
    status: "client",
    image: "assets/projects/bosporus.jpg",
    live: "https://bosporus-pide.com/",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    text: {
      de: {
        title: "Bosporus Lahmacun & Pide",
        description:
          "Restaurant-Website für ein türkisches Restaurant in Köln – mit Speisekarte, Catering und zweisprachiger DE/TR-Oberfläche.",
      },
      en: {
        title: "Bosporus Lahmacun & Pide",
        description:
          "Website for a Turkish restaurant in Cologne – with menu, catering and a bilingual DE/TR interface.",
      },
    },
  },
  {
    id: "immobilien",
    category: "landing",
    layout: "card",
    status: "concept",
    image: "assets/projects/immobilien.jpg",
    live: "https://nilvaes.github.io/immobilien-makler/",
    github: "https://github.com/nilvaes/immobilien-makler",
    tech: ["Nuxt", "Vue", "TypeScript", "Tailwind CSS"],
    text: {
      de: {
        title: "Immobilienmakler Köln",
        description:
          "Konzept-Landingpage für einen Immobilienmakler – mit Leistungen, Referenzen, Fotogalerie und klarer Kontaktführung.",
      },
      en: {
        title: "Real Estate Agent Cologne",
        description:
          "Concept landing page for a real estate agent – with services, references, photo gallery and a clear path to contact.",
      },
    },
  },
  {
    id: "feride",
    category: "landing",
    layout: "card",
    status: "wip",
    image: "assets/projects/feride.jpg",
    live: "https://landing-frd.savas-qrx.workers.dev/de/",
    tech: ["Astro", "TypeScript", "Cloudflare Workers"],
    text: {
      de: {
        title: "Feride – Coaching für Familien",
        description:
          "Zweisprachige Landingpage (DE/TR) für ein Familien-Coaching – warm, ruhig und auf Vertrauen ausgelegt.",
      },
      en: {
        title: "Feride – Family Coaching",
        description:
          "Bilingual landing page (DE/TR) for a family coaching practice – warm, calm and built to create trust.",
      },
    },
  },
  {
    id: "onboarding",
    category: "webapp",
    layout: "feature",
    status: "caseStudy",
    illustration: "onboarding",
    tech: ["Nuxt", "TypeScript", "PostgreSQL", "Prisma", "Docker", "Clerk"],
    text: {
      de: {
        title: "Onboarding-Portal · IHK-Abschlussprojekt",
        description:
          "Plattform, die neue Mitarbeitende durch ihr Onboarding führt – entwickelt als Abschlussprojekt meiner Ausbildung.",
        highlights: [
          "Zentrale Dokumentenverwaltung für Onboarding-Unterlagen",
          "Authentifizierung und rollenbasierte Zugriffsrechte",
          "Containerisiertes Setup mit Docker und PostgreSQL",
        ],
      },
      en: {
        title: "Onboarding Portal · IHK Final Project",
        description:
          "A platform that guides new employees through their onboarding – built as the final project of my apprenticeship.",
        highlights: [
          "Central document management for onboarding material",
          "Authentication and role-based access control",
          "Containerised setup with Docker and PostgreSQL",
        ],
      },
    },
  },
  {
    id: "switchAudio",
    category: "desktop",
    layout: "feature",
    status: "openSource",
    illustration: "switchAudio",
    github: "https://github.com/nilvaes/switch-audio",
    tech: ["C#", ".NET", "WinForms", "Win32 API", "GitHub Actions"],
    text: {
      de: {
        title: "Switch Audio",
        description:
          "Ein schlankes Windows-Tray-Tool, das per globalem Hotkey zwischen zwei Audioausgängen wechselt – ohne Installer, ohne externe Abhängigkeiten.",
        highlights: [
          "Steuert die Windows-Core-Audio-COM-Schnittstellen direkt an",
          "Systemweiter Hotkey über die Win32-API, frei belegbar",
          "CI-Pipeline baut die .exe automatisch mit GitHub Actions",
        ],
      },
      en: {
        title: "Switch Audio",
        description:
          "A lightweight Windows tray app that switches between two audio outputs with a global hotkey – no installer, no external dependencies.",
        highlights: [
          "Talks to the Windows Core Audio COM interfaces directly",
          "System-wide, customisable hotkey via the Win32 API",
          "CI pipeline builds the .exe automatically with GitHub Actions",
        ],
      },
    },
  },
];
