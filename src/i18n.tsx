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
      toggleAria: 'Sprache wechseln',
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
      heading: 'Über mich',
      timezoneTitle: 'Zeitzone',
      timezoneText:
        'Ich wohne in Deutschland und kann remote mit Teams weltweit arbeiten',
      ctaTitle: 'Mehr Code auf GitHub',
      ctaAction: 'Zum GitHub-Profil',
      techStackTitle: 'Tech Stack',
      techStackCategories: {
        frontend: 'Frontend',
        backend: 'Backend',
        databases: 'Datenbanken',
        tools: 'Tools',
      },
      cards: {
        trained: 'FIAE',
        frontend: 'Frontend',
        backend: 'Backend',
        fullstack: 'Fullstack',
        ui: 'UIs',
      },
    },
    projects: {
      heading: 'Projekte',
      visitWebsite: 'Website besuchen',
      caseStudy: 'Case Study · Quellcode nicht öffentlich',
      cards: {
        sumi: {
          title: 'Sumi - Track & Explore New Anime',
          description:
            'Eine Fullstack-Anime-Plattform zum Entdecken und Verfolgen von Anime – mit Browse, Fuzzy-Suche, Airing-Schedule und Detailseiten, powered by AniList und Supabase.',
        },
        onboarding: {
          title: 'Onboarding Portal · IHK-Abschlussprojekt',
          description:
            'Onboarding-Plattform mit Dokumentenverwaltung, Authentifizierung und rollenbasierten Zugriffsrechten.',
        },
        bosporus: {
          title: 'Bosporus Lahmacun & Pide',
          description:
            'Moderne Restaurant-Website für ein türkisches Restaurant in Köln – mit Speisekarte, Catering, Öffnungszeiten und zweisprachiger DE/TR-Oberfläche.',
        },
        dashboard: {
          title: 'Privacy First Period Tracker',
          description:
            'Eine datenschutzorientierte Perioden-Tracking-App mit Expo, NativeWind und i18n – alles lokal, keine Cloud.',
          comingSoon: 'Voraussichtlich demnächst in den App-Stores.',
        },
      },
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
      toggleAria: 'Switch language',
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
      heading: 'About',
      timezoneTitle: 'Timezone',
      timezoneText:
        'I live in Germany and can work remotely with teams worldwide',
      ctaTitle: 'More code on GitHub',
      ctaAction: 'Go to GitHub profile',
      techStackTitle: 'Tech Stack',
      techStackCategories: {
        frontend: 'Frontend',
        backend: 'Backend',
        databases: 'Database',
        tools: 'Tools',
      },
      cards: {
        trained: 'Trained',
        frontend: 'Frontend',
        backend: 'Backend',
        fullstack: 'Fullstack',
        ui: 'UIs',
      },
    },
    projects: {
      heading: 'Projects',
      visitWebsite: 'Visit Website',
      caseStudy: 'Case study · source code not public',
      cards: {
        sumi: {
          title: 'Sumi - Track & Explore New Anime',
          description:
            'A full-stack anime discovery platform to browse, search, and track airing shows — with fuzzy search, schedule, and detail pages, powered by AniList and Supabase.',
        },
        onboarding: {
          title: 'Onboarding Portal · IHK Final Project',
          description:
            'Onboarding platform with document management, authentication, and role-based access control.',
        },
        bosporus: {
          title: 'Bosporus Lahmacun & Pide',
          description:
            'A modern restaurant website for a Turkish restaurant in Cologne — with menu, catering, opening hours, and a bilingual DE/TR interface.',
        },
        dashboard: {
          title: 'Privacy First Period Tracker',
          description:
            'A privacy-first period tracking app built with Expo, NativeWind, and i18n – all local, no cloud.',
          comingSoon: 'Expected to be published in app stores soon.',
        },
      },
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
