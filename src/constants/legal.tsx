import type { Language } from "../i18n";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDocument = {
  title: string;
  updated: string;
  sections: LegalSection[];
};

export const OPERATOR = {
  name: "Ömer Savas",
  email: "savas@ichigo.me",
};

const siteInfo: Record<Language, LegalDocument> = {
  de: {
    title: "Website-Info",
    updated: "Stand: August 2026",
    sections: [
      {
        heading: "Über diese Seite",
        paragraphs: [
          "Diese Website ist ein persönliches, nicht-kommerzielles Projekt. Sie zeigt eigene Programmierprojekte und Technologien, mit denen ich arbeite.",
          "Es werden keine Waren oder Dienstleistungen angeboten, es gibt keine Werbung und keine bezahlten Inhalte.",
        ],
      },
      {
        heading: "Betreiber",
        paragraphs: [`${OPERATOR.name}\nE-Mail: ${OPERATOR.email}`],
      },
      {
        heading: "Hosting",
        paragraphs: [
          "Die Seite wird über GitHub Pages ausgeliefert, einen Dienst der GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA.",
          "Der Quellcode dieser Seite ist ein eigenes Projekt und wird wie die übrigen hier gezeigten Projekte selbst entwickelt.",
        ],
      },
      {
        heading: "Inhalte und Links",
        paragraphs: [
          "Die Inhalte wurden mit Sorgfalt erstellt. Für Richtigkeit, Vollständigkeit und Aktualität kann keine Gewähr übernommen werden.",
          "Diese Seite verlinkt auf externe Websites Dritter. Für deren Inhalte ist ausschließlich der jeweilige Anbieter verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar.",
        ],
      },
      {
        heading: "Urheberrecht",
        paragraphs: [
          "Die selbst erstellten Inhalte auf dieser Seite unterliegen dem deutschen Urheberrecht. Genannte Marken-, Produkt- und Projektnamen sind Eigentum der jeweiligen Rechteinhaber und dienen hier nur der Beschreibung.",
        ],
      },
    ],
  },
  en: {
    title: "Site information",
    updated: "Last updated: August 2026",
    sections: [
      {
        heading: "About this site",
        paragraphs: [
          "This website is a personal, non-commercial project. It showcases my own programming projects and the technologies I work with.",
          "No goods or services are offered here, there is no advertising, and there is no paid content.",
        ],
      },
      {
        heading: "Operator",
        paragraphs: [`${OPERATOR.name}\nEmail: ${OPERATOR.email}`],
      },
      {
        heading: "Hosting",
        paragraphs: [
          "The site is served via GitHub Pages, a service of GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA.",
          "The source code of this site is one of my own projects, built the same way as the other work shown here.",
        ],
      },
      {
        heading: "Content and links",
        paragraphs: [
          "The content has been created with care. No guarantee can be given for its accuracy, completeness, or timeliness.",
          "This site links to external third-party websites. The respective provider is solely responsible for their content. No legal violations were apparent at the time of linking.",
        ],
      },
      {
        heading: "Copyright",
        paragraphs: [
          "The content created by me on this site is subject to German copyright law. Brand, product, and project names mentioned are the property of their respective owners and are used here for description only.",
        ],
      },
    ],
  },
};

const privacy: Record<Language, LegalDocument> = {
  de: {
    title: "Datenschutz",
    updated: "Stand: August 2026",
    sections: [
      {
        heading: "1. Überblick",
        paragraphs: [
          "Diese Website ist ein persönliches Projekt ohne Kontaktformular, ohne Newsletter, ohne Tracking und ohne Werbung. Es werden keine Konten angelegt und keine Daten von Besucherinnen und Besuchern gesammelt oder ausgewertet.",
          "Personenbezogene Daten fallen nur insoweit an, wie es für den technischen Betrieb der Seite unvermeidbar ist. Was das konkret bedeutet, steht unten.",
        ],
      },
      {
        heading: "2. Verantwortlicher",
        paragraphs: [
          "Verantwortlich für die Datenverarbeitung auf dieser Website ist:",
          `${OPERATOR.name}\nE-Mail: ${OPERATOR.email}`,
          "Ein Datenschutzbeauftragter ist gesetzlich nicht erforderlich und wurde nicht bestellt.",
        ],
      },
      {
        heading: "3. Hosting und Server-Logfiles",
        paragraphs: [
          "Diese Website wird bei GitHub Pages gehostet, einem Dienst der GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. Beim Aufruf der Seite verarbeitet GitHub technisch notwendige Zugriffsdaten, um die Website ausliefern zu können.",
          "Dazu gehören insbesondere:",
          "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte Interesse liegt in der technisch fehlerfreien und sicheren Bereitstellung der Website. Auf Umfang und Speicherdauer dieser Logs besteht kein Einfluss; Einzelheiten regelt die Datenschutzerklärung von GitHub.",
          "Da GitHub ein US-Unternehmen ist, kann dabei eine Übermittlung personenbezogener Daten in die USA stattfinden. GitHub ist unter dem EU-US Data Privacy Framework zertifiziert.",
        ],
        bullets: [
          "IP-Adresse des anfragenden Geräts",
          "Datum und Uhrzeit des Zugriffs",
          "Name und URL der abgerufenen Datei",
          "Übertragene Datenmenge und Meldung über den Abruferfolg",
          "Browsertyp, Browserversion und Betriebssystem",
          "Referrer-URL, sofern übermittelt",
        ],
      },
      {
        heading: "4. Lokale Speicherung im Browser",
        paragraphs: [
          "Diese Website setzt keine Tracking-Cookies und bindet keine Analyse- oder Werbedienste ein. Im lokalen Speicher (localStorage) des Browsers werden lediglich zwei Einstellungen abgelegt:",
          "Diese Angaben verbleiben auf dem Gerät, werden nicht an einen Server übertragen und lassen keinen Rückschluss auf eine Person zu. Sie können jederzeit über die Browsereinstellungen gelöscht werden.",
        ],
        bullets: [
          "die gewählte Sprache (Deutsch oder Englisch)",
          "das gewählte Farbschema (hell oder dunkel)",
        ],
      },
      {
        heading: "5. Schriftarten und externe Inhalte",
        paragraphs: [
          "Die verwendete Schriftart wird lokal vom eigenen Server ausgeliefert. Es besteht keine Verbindung zu Google Fonts, und es werden dabei keine Daten an Google übertragen.",
          "Die Seite verlinkt auf externe Profile (LinkedIn, Xing, GitHub) sowie auf Projekt-Websites. Diese Links werden erst durch einen Klick aufgerufen; ab diesem Zeitpunkt gelten die Datenschutzbestimmungen des jeweiligen Anbieters.",
        ],
      },
      {
        heading: "6. Kontakt per E-Mail",
        paragraphs: [
          "Wenn du mir freiwillig eine E-Mail schreibst, werden deine Angaben ausschließlich zur Beantwortung deiner Nachricht verwendet und nicht an Dritte weitergegeben. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Die Nachricht wird gelöscht, sobald sie erledigt ist und keine gesetzlichen Aufbewahrungsfristen entgegenstehen.",
        ],
      },
      {
        heading: "7. SSL-/TLS-Verschlüsselung",
        paragraphs: [
          "Diese Website nutzt aus Sicherheitsgründen eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung ist an der Adresszeile des Browsers zu erkennen, die mit „https://“ beginnt.",
        ],
      },
      {
        heading: "8. Deine Rechte",
        paragraphs: [
          "Als betroffene Person stehen dir gegenüber dem Verantwortlichen die folgenden Rechte zu:",
          "Zur Ausübung dieser Rechte genügt eine E-Mail an die oben genannte Adresse. Darüber hinaus besteht ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde, insbesondere in dem Mitgliedstaat des Aufenthaltsorts, des Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes.",
        ],
        bullets: [
          "Auskunft über die verarbeiteten Daten (Art. 15 DSGVO)",
          "Berichtigung unrichtiger Daten (Art. 16 DSGVO)",
          "Löschung (Art. 17 DSGVO)",
          "Einschränkung der Verarbeitung (Art. 18 DSGVO)",
          "Datenübertragbarkeit (Art. 20 DSGVO)",
          "Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)",
        ],
      },
      {
        heading: "9. Änderungen dieser Erklärung",
        paragraphs: [
          "Diese Datenschutzerklärung wird angepasst, sobald sich die Website oder die Rechtslage ändert. Es gilt jeweils die auf dieser Seite veröffentlichte Fassung.",
        ],
      },
    ],
  },
  en: {
    title: "Privacy",
    updated: "Last updated: August 2026",
    sections: [
      {
        heading: "1. Overview",
        paragraphs: [
          "This website is a personal project with no contact form, no newsletter, no tracking, and no advertising. No accounts are created and no visitor data is collected or analysed.",
          "Personal data is only involved where it is technically unavoidable to run the site. The details are below.",
        ],
      },
      {
        heading: "2. Controller",
        paragraphs: [
          "The controller responsible for data processing on this website is:",
          `${OPERATOR.name}\nEmail: ${OPERATOR.email}`,
          "A data protection officer is not legally required and has not been appointed.",
        ],
      },
      {
        heading: "3. Hosting and server log files",
        paragraphs: [
          "This website is hosted on GitHub Pages, a service of GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. When the page is accessed, GitHub processes technically necessary access data in order to deliver the website.",
          "This includes in particular:",
          "The legal basis is Art. 6(1)(f) GDPR. The legitimate interest lies in providing the website securely and free of technical errors. The scope and retention period of these logs are outside my control; details are governed by GitHub's privacy statement.",
          "As GitHub is a US company, personal data may be transferred to the USA. GitHub is certified under the EU-US Data Privacy Framework.",
        ],
        bullets: [
          "IP address of the requesting device",
          "Date and time of access",
          "Name and URL of the requested file",
          "Amount of data transferred and notification of successful retrieval",
          "Browser type, browser version, and operating system",
          "Referrer URL, if transmitted",
        ],
      },
      {
        heading: "4. Local storage in the browser",
        paragraphs: [
          "This website sets no tracking cookies and embeds no analytics or advertising services. Only two settings are stored in the browser's localStorage:",
          "This information stays on your device, is not transmitted to a server, and cannot be traced back to a person. It can be deleted at any time via your browser settings.",
        ],
        bullets: [
          "the selected language (German or English)",
          "the selected colour scheme (light or dark)",
        ],
      },
      {
        heading: "5. Fonts and external content",
        paragraphs: [
          "The font used is served locally from my own server. There is no connection to Google Fonts and no data is transferred to Google.",
          "The site links to external profiles (LinkedIn, Xing, GitHub) and to project websites. These links are only called up when clicked; from that point on, the privacy policy of the respective provider applies.",
        ],
      },
      {
        heading: "6. Contact by email",
        paragraphs: [
          "If you voluntarily send me an email, your details are used solely to answer your message and are not passed on to third parties. The legal basis is Art. 6(1)(f) GDPR. The message is deleted once it has been dealt with and no statutory retention periods apply.",
        ],
      },
      {
        heading: "7. SSL/TLS encryption",
        paragraphs: [
          "For security reasons this website uses SSL/TLS encryption. An encrypted connection can be recognised by the browser address bar starting with \u201chttps://\u201d.",
        ],
      },
      {
        heading: "8. Your rights",
        paragraphs: [
          "As a data subject you have the following rights towards the controller:",
          "An email to the address above is sufficient to exercise these rights. You also have the right to lodge a complaint with a data protection supervisory authority, in particular in the member state of your residence, place of work, or the place of the alleged infringement.",
        ],
        bullets: [
          "Access to the data processed (Art. 15 GDPR)",
          "Rectification of inaccurate data (Art. 16 GDPR)",
          "Erasure (Art. 17 GDPR)",
          "Restriction of processing (Art. 18 GDPR)",
          "Data portability (Art. 20 GDPR)",
          "Objection to processing (Art. 21 GDPR)",
        ],
      },
      {
        heading: "9. Changes to this policy",
        paragraphs: [
          "This privacy policy will be adjusted whenever the website or the legal situation changes. The version published on this page always applies.",
        ],
      },
    ],
  },
};

export function getPrivacyPolicy(language: Language): LegalDocument {
  return privacy[language];
}

export function getSiteInfo(language: Language): LegalDocument {
  return siteInfo[language];
}
