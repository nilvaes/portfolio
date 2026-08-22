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
      toggleAria: 'Sprache wechseln',
    },
    hero: {
      greeting: 'Hi, ich bin Ömer',
      title: 'Full Stack Developer',
      titleFocus: 'mit Fokus auf',
      suffix: 'Weblösungen',
      availability: 'Offen für Vollzeit',
      availabilityLocation: 'Deutschland · Remote',
      projectsCta: 'Projekte ansehen',
      contactCta: 'Kontakt aufnehmen',
      words: {
        first: 'innovative',
        second: 'zuverlässige',
        third: 'effiziente',
      },
    },
    about: {
      heading: 'Über mich',
      profileTitle: 'Full Stack mit Blick fürs Ganze',
      profileIntro:
        'Nach meiner dreijährigen Ausbildung habe ich meinen Schwerpunkt in der Full-Stack-Entwicklung gefunden.',
      profileWorkStyle:
        'Ich entwickle zuverlässige, gut strukturierte Anwendungen und arbeite gern in Teams, die offen kommunizieren und gemeinsam gute Lösungen finden.',
      profileGoalTitle: 'Mein nächster Schritt',
      profileGoal:
        'Ich suche eine Vollzeitstelle, in der ich Verantwortung übernehmen, weiterlernen und zu echten Produkten beitragen kann.',
      timezoneTitle: 'Zeitzone',
      timezoneText:
        'Ich wohne in Deutschland und kann remote mit Teams weltweit arbeiten',
      ctaTitle: 'Lass uns ins Gespräch kommen',
      techStackTitle: 'Tech Stack',
      techStackCategories: {
        frontend: 'Frontend',
        backend: 'Backend',
        databases: 'Datenbanken & ORM',
        tools: 'Tools & Workflow',
      },
      cards: {
        junior: 'Junior',
        frontend: 'Frontend',
        backend: 'Backend',
        fullstack: 'Fullstack',
        ui: 'UIs',
      },
    },
    projects: {
      heading: 'Projekte',
      visitWebsite: 'Website besuchen',
      cards: {
        sumi: {
          title: 'Sumi - Track & Explore New Anime',
          description:
            'Eine Fullstack-Anime-Plattform zum Entdecken und Verfolgen von Anime – mit Browse, Fuzzy-Suche, Airing-Schedule und Detailseiten, powered by AniList und Supabase.',
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
    contact: {
      heading: 'Lass uns reden',
      description:
        'Suchst du Verstärkung für dein Entwicklungsteam oder möchtest dich fachlich austauschen? Ich freue mich auf deine Nachricht.',
      fullName: 'Vollständiger Name',
      email: 'E-Mail',
      message: 'Nachricht',
      fullNamePlaceholder: 'Max Mustermann',
      emailPlaceholder: 'max.mustermann@gmail.com',
      messagePlaceholder: 'Teile deine Gedanken',
      submit: 'Senden',
      sending: 'Sende...',
      success: 'Deine Nachricht wurde erfolgreich gesendet!',
      error: 'Etwas ist schiefgelaufen. Bitte versuche es erneut.',
    },
    copyEmail: {
      copy: 'E-Mail kopieren',
      copied: 'E-Mail kopiert',
    },
    footer: {
      rights: 'Alle Rechte vorbehalten.',
      builtWith: 'Gebaut mit',
      and: 'und',
    },
    alert: {
      success: 'Erfolg',
      failed: 'Fehler',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
      toggleAria: 'Switch language',
    },
    hero: {
      greeting: "Hi, I'm Ömer",
      title: 'Full Stack Developer',
      titleFocus: 'focused on',
      suffix: 'web solutions',
      availability: 'Open to full-time',
      availabilityLocation: 'Germany · Remote',
      projectsCta: 'View projects',
      contactCta: 'Contact me',
      words: {
        first: 'innovative',
        second: 'reliable',
        third: 'efficient',
      },
    },
    about: {
      heading: 'About',
      profileTitle: 'Full stack with a product mindset',
      profileIntro:
        'After completing my three-year apprenticeship, I found my focus in full-stack development.',
      profileWorkStyle:
        'I build reliable, well-structured applications and enjoy working in teams that communicate openly and solve problems together.',
      profileGoalTitle: 'My next step',
      profileGoal:
        'I am looking for a full-time role where I can take ownership, keep learning, and contribute to real products.',
      timezoneTitle: 'Timezone',
      timezoneText:
        'I live in Germany and can work remotely with teams worldwide',
      ctaTitle: "Let's connect",
      techStackTitle: 'Tech Stack',
      techStackCategories: {
        frontend: 'Frontend',
        backend: 'Backend',
        databases: 'Databases & ORM',
        tools: 'Tools & Workflow',
      },
      cards: {
        junior: 'Junior',
        frontend: 'Frontend',
        backend: 'Backend',
        fullstack: 'Fullstack',
        ui: 'UIs',
      },
    },
    projects: {
      heading: 'Projects',
      visitWebsite: 'Visit Website',
      cards: {
        sumi: {
          title: 'Sumi - Track & Explore New Anime',
          description:
            'A full-stack anime discovery platform to browse, search, and track airing shows — with fuzzy search, schedule, and detail pages, powered by AniList and Supabase.',
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
    contact: {
      heading: "Let's Talk",
      description:
        "Looking for a full-stack developer to join your team, or want to talk technology? I'd be happy to hear from you.",
      fullName: 'Full Name',
      email: 'Email',
      message: 'Message',
      fullNamePlaceholder: 'John Doe',
      emailPlaceholder: 'john.doe@gmail.com',
      messagePlaceholder: 'Share your thoughts',
      submit: 'Send',
      sending: 'Sending...',
      success: 'Your message has been sent successfully!',
      error: 'Something went wrong. Please try again.',
    },
    copyEmail: {
      copy: 'Copy email',
      copied: 'Email copied',
    },
    footer: {
      rights: 'All rights reserved.',
      builtWith: 'Built with',
      and: 'and',
    },
    alert: {
      success: 'Success',
      failed: 'Failed',
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
