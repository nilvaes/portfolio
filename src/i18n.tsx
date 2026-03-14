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
      info: 'Info',
      about: 'Über mich',
      projects: 'Projekte',
      contact: 'Kontakt',
      toggleAria: 'Sprache wechseln',
    },
    hero: {
      greeting: 'Hi, ich bin Ömer',
      desktopTitle: 'Full Stack Developer mit Fokus auf',
      mobileTitle: 'Ich baue',
      desktopSuffix: 'Weblösungen',
      mobileSuffix: 'Webanwendungen',
      words: {
        first: 'innovative',
        second: 'zuverlässige',
        third: 'effiziente',
      },
    },
    about: {
      heading: 'Info',
      dragText: 'Ziehen und loslassen!',
      timezoneTitle: 'Zeitzone',
      timezoneText:
        'Ich wohne in Deutschland und kann remote mit Teams weltweit arbeiten',
      ctaTitle: 'Hast du Lust, mit mir zu arbeiten?',
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
    timeline: {
      heading: 'Über mich im Detail',
    },
    projects: {
      heading: 'Projekte',
      cards: {
        portfolio: {
          title: 'Developer Portfolio',
          description:
            'Eine performante, responsive Portfolio-Seite mit Fokus auf Animationen, Klarheit und Code-Qualität.',
        },
        dashboard: {
          title: 'Privacy First Period Tracker',
          description:
            'Eine datenschutzorientierte Perioden-Tracking-App mit Expo, NativeWind und i18n – alles lokal, keine Cloud.',
        },
        saas: {
          title: 'SaaS Web App',
          description:
            'Eine Fullstack-Anwendung mit Authentifizierung, Rollenverwaltung und einer modernen UI.',
        },
      },
    },
    contact: {
      heading: 'Lass uns reden',
      description:
        'Du brauchst eine neue Website, willst deine Plattform verbessern oder ein besonderes Projekt umsetzen? Ich helfe gern.',
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
      info: 'Info',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
      toggleAria: 'Switch language',
    },
    hero: {
      greeting: "Hi, I'm Ömer",
      desktopTitle: 'Full Stack Developer focused on',
      mobileTitle: 'I build',
      desktopSuffix: 'web solutions',
      mobileSuffix: 'web applications',
      words: {
        first: 'innovative',
        second: 'reliable',
        third: 'efficient',
      },
    },
    about: {
      heading: 'Info',
      dragText: 'Drag and release!',
      timezoneTitle: 'Timezone',
      timezoneText:
        'I live in Germany and can work remotely with teams worldwide',
      ctaTitle: 'Want to work together?',
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
    timeline: {
      heading: 'About Me In Detail',
    },
    projects: {
      heading: 'Projects',
      cards: {
        portfolio: {
          title: 'Developer Portfolio',
          description:
            'A fast, responsive portfolio site focused on clean design, animations, and code quality.',
        },
        dashboard: {
          title: 'Privacy First Period Tracker',
          description:
            'A privacy-first period tracking app built with Expo, NativeWind, and i18n – all local, no cloud.',
        },
        saas: {
          title: 'SaaS Web App',
          description:
            'A full stack application with authentication, role management, and a modern UI.',
        },
      },
    },
    contact: {
      heading: "Let's Talk",
      description:
        "Need a new website, want to improve your platform, or build something special? I'm happy to help.",
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
