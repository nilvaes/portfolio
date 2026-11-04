/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type Language = 'de' | 'en';

type TranslationTree = {
  [key: string]: string | TranslationTree;
};

type I18nContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
};

const STORAGE_KEY = 'portfolio-language';

const translations: Record<Language, TranslationTree> = {
  de: {
    nav: {
      home: 'Start',
      about: 'Über mich',
      projects: 'Projekte',
      contact: 'Kontakt',
      openMenu: 'Menü öffnen',
      closeMenu: 'Menü schließen',
      toggleAria: 'Sprache wechseln',
      mainAria: 'Hauptnavigation',
      themeAria: 'Design wechseln',
    },
    hero: {
      badge: "Fachinformatiker für Anwendungsentwicklung · Köln",
      titlePrefix: "Ich baue Webanwendungen mit",
      tagline:
        "Full-Stack von der Datenbank bis zum Interface – vom Kundenprojekt bis zur eigenen Web-App, sauber gebaut und durchdacht gestaltet.",
      ctaProjects: "Projekte ansehen",
      ctaContact: "Kontakt aufnehmen",
      scroll: "Scrollen",
      words: {
        first: "TypeScript",
        second: "Vue & Nuxt",
        third: "React & Next.js",
        fourth: "Node.js",
      },
    },
    about: {
      "eyebrow": "Über mich",
      "heading": "Code, der zuverlässig läuft – und gut aussieht.",
      "bio1": "Ich bin Ömer, ausgebildeter Fachinformatiker für Anwendungsentwicklung aus Köln. In meiner Ausbildung habe ich an echten Produkten mitgearbeitet – von der ersten Komponente bis zu Features im Produktivbetrieb, mit Schwerpunkt auf TypeScript, Vue/Nuxt und Node.js.",
      "bio2": "Heute baue ich eigene Web-Apps und Websites für Kunden und beschäftige mich damit, wie sich KI sinnvoll in Webanwendungen einbauen lässt.",
      "facts": {
        "ihk": {
          "label": "IHK-Abschluss",
          "value": "FIAE"
        },
        "practice": {
          "label": "Jahre Praxis",
          "value": "3,5"
        },
        "location": {
          "label": "Standort",
          "value": "Köln"
        }
      },
      "extras": {
        "ai": {
          "eyebrow": "KI im Workflow",
          "title": "Mit KI-Agenten entwickeln",
          "text": "Ich arbeite täglich mit KI-Coding-Agenten wie Claude Code und Codex – für Prototypen, Refactorings, Tests und Code-Reviews. Architektur-Entscheidungen und das letzte Review bleiben bei mir: Ich übernehme nur Code, den ich verstehe.",
          "tags": {
            "claude": "Claude Code",
            "codex": "OpenAI Codex",
            "agents": "Agentische Workflows",
            "review": "Code-Review"
          }
        },
        "hobby": {
          "eyebrow": "Abseits vom Code",
          "title": "3D & Game Design",
          "text": "In meiner Freizeit experimentiere ich mit 3D-Modellierung, Meshing und Rigging und erkunde, wie KI das Game Design verändert – von der ersten Idee bis zum spielbaren Prototyp.",
          "tags": {
            "modeling": "3D-Modellierung",
            "meshing": "Meshing",
            "rigging": "Rigging",
            "gameDesign": "Game Design mit KI"
          }
        }
      },
      "principles": {
        "clean": {
          "title": "Sauber und durchdacht",
          "text": "Gut strukturierter, verständlicher Code und Oberflächen, die auf jedem Gerät funktionieren."
        },
        "team": {
          "title": "Im Team zu Hause",
          "text": "Kommunikativ, hilfsbereit und lösungsorientiert – ich frage nach, bevor ich rate."
        },
        "build": {
          "title": "Lernen durch Bauen",
          "text": "Neue Technologien lerne ich am liebsten, indem ich ein echtes Projekt damit umsetze – nicht nur durch Lesen."
        }
      },
      "techStackTitle": "Tech Stack",
      "techStackCategories": {
        "frontend": "Frontend",
        "backend": "Backend",
        "databases": "Datenbanken",
        "tools": "Tools & DevOps"
      }
    },
    projects: {
      "eyebrow": "Ausgewählte Arbeiten",
      "heading": "Projekte",
      "intro": "Von Full-Stack-Webanwendungen über Landingpages bis zum Windows-Tool – eine Auswahl von Dingen, die ich gebaut habe.",
      "filterLabel": "Projekte filtern",
      "filters": {
        "all": "Alle",
        "webapp": "Web-Apps",
        "landing": "Landingpages",
        "desktop": "Desktop"
      },
      "status": {
        "live": "Live",
        "client": "Kundenprojekt",
        "concept": "Konzept",
        "wip": "In Arbeit",
        "caseStudy": "Case Study",
        "openSource": "Open Source"
      },
      "links": {
        "live": "Live ansehen",
        "code": "Code",
        "private": "Quellcode privat"
      }
    },
    contact: {
      "eyebrow": "Kontakt",
      "headingStart": "Lassen Sie uns zusammen",
      "headingAccent": "etwas bauen.",
      "text": "Ob Jobangebot, Projektidee oder einfach ein Austausch über Webentwicklung – ich freue mich über Ihre Nachricht.",
      "email": "E-Mail schreiben",
      "copy": "Adresse kopieren",
      "copied": "Kopiert ✓"
    },
    footer: {
      rights: 'Alle Rechte vorbehalten.',
      builtWith: 'Gebaut mit',
      and: 'und',
      privacy: 'Datenschutz',
      siteInfo: 'Website-Info',
      nonCommercial:
        'Persönliches, nicht-kommerzielles Projekt zur Darstellung eigener Programmierprojekte.',
    },
    legal: {
      back: 'Zurück zur Startseite',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      toggleAria: 'Switch language',
      mainAria: 'Main navigation',
      themeAria: 'Switch theme',
    },
    hero: {
      badge: "Trained application developer · Cologne",
      titlePrefix: "I build web applications with",
      tagline:
        "Full-stack from database to interface – from client projects to my own web apps, cleanly built and thoughtfully designed.",
      ctaProjects: "View projects",
      ctaContact: "Get in touch",
      scroll: "Scroll",
      words: {
        first: "TypeScript",
        second: "Vue & Nuxt",
        third: "React & Next.js",
        fourth: "Node.js",
      },
    },
    about: {
      "eyebrow": "About me",
      "heading": "Code that runs reliably – and looks good doing it.",
      "bio1": "I am Ömer, a trained application developer (Fachinformatiker) from Cologne. During my apprenticeship I worked on real products – from a first component to features running in production, focused on TypeScript, Vue/Nuxt and Node.js.",
      "bio2": "Today I build my own web apps and websites for clients, and I am exploring how AI can be built into web applications in a way that actually helps.",
      "facts": {
        "ihk": {
          "label": "IHK certified",
          "value": "FIAE"
        },
        "practice": {
          "label": "Years of practice",
          "value": "3.5"
        },
        "location": {
          "label": "Based in",
          "value": "Cologne"
        }
      },
      "extras": {
        "ai": {
          "eyebrow": "AI in my workflow",
          "title": "Building with AI agents",
          "text": "I work with AI coding agents such as Claude Code and Codex every day – for prototypes, refactoring, tests and code reviews. Architecture decisions and the final review stay with me: I only ship code I understand.",
          "tags": {
            "claude": "Claude Code",
            "codex": "OpenAI Codex",
            "agents": "Agentic workflows",
            "review": "Code review"
          }
        },
        "hobby": {
          "eyebrow": "Beyond code",
          "title": "3D & game design",
          "text": "In my free time I experiment with 3D modelling, meshing and rigging, and explore how AI is changing game design – from a first idea to a playable prototype.",
          "tags": {
            "modeling": "3D modelling",
            "meshing": "Meshing",
            "rigging": "Rigging",
            "gameDesign": "Game design with AI"
          }
        }
      },
      "principles": {
        "clean": {
          "title": "Clean and considered",
          "text": "Well-structured, readable code and interfaces that work on every device."
        },
        "team": {
          "title": "At home in a team",
          "text": "Communicative, helpful and solution-oriented – I ask before I guess."
        },
        "build": {
          "title": "Learning by building",
          "text": "I learn new technologies best by shipping a real project with them – not just by reading about them."
        }
      },
      "techStackTitle": "Tech stack",
      "techStackCategories": {
        "frontend": "Frontend",
        "backend": "Backend",
        "databases": "Databases",
        "tools": "Tools & DevOps"
      }
    },
    projects: {
      "eyebrow": "Selected work",
      "heading": "Projects",
      "intro": "From full-stack web apps and landing pages to a Windows tool – a selection of things I have built.",
      "filterLabel": "Filter projects",
      "filters": {
        "all": "All",
        "webapp": "Web apps",
        "landing": "Landing pages",
        "desktop": "Desktop"
      },
      "status": {
        "live": "Live",
        "client": "Client project",
        "concept": "Concept",
        "wip": "In progress",
        "caseStudy": "Case study",
        "openSource": "Open source"
      },
      "links": {
        "live": "View live",
        "code": "Code",
        "private": "Private source"
      }
    },
    contact: {
      "eyebrow": "Contact",
      "headingStart": "Let us build",
      "headingAccent": "something together.",
      "text": "Whether it is a job offer, a project idea or just a chat about web development – I would love to hear from you.",
      "email": "Send an email",
      "copy": "Copy address",
      "copied": "Copied ✓"
    },
    footer: {
      rights: 'All rights reserved.',
      builtWith: 'Built with',
      and: 'and',
      privacy: 'Privacy',
      siteInfo: 'Site info',
      nonCommercial:
        'Personal, non-commercial project showcasing my own programming work.',
    },
    legal: {
      back: 'Back to home',
    },
  },
};

const I18nContext = createContext<I18nContextValue | null>(null);

function getByPath(tree: TranslationTree, path: string): string | undefined {
  const result = path
    .split('.')
    .reduce<
      string | TranslationTree | undefined
    >((acc, key) => (typeof acc === 'object' ? acc[key] : undefined), tree);

  return typeof result === 'string' ? result : undefined;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'de';
    const savedLanguage = window.localStorage.getItem(STORAGE_KEY);
    return savedLanguage === 'en' ? 'en' : 'de';
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () =>
        setLanguage((prevLanguage) => (prevLanguage === 'de' ? 'en' : 'de')),
      t: (key: string) =>
        getByPath(translations[language], key) ??
        getByPath(translations.de, key) ??
        key,
    }),
    [language],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
