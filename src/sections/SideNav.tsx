import { useEffect, useRef, useState } from "react";
import { FolderIcon, MenuIcon, XIcon } from "lucide-react";
import { Tree, type TreeViewElement } from "../components/FileTree";
import { useI18n } from "../i18n";

const SECTION_IDS = [
  "home",
  "about",
  "sumi",
  "bosporus",
  "dashboard",
  "contact",
] as const;

type SectionId = (typeof SECTION_IDS)[number];

const isSectionId = (value: string): value is SectionId =>
  SECTION_IDS.includes(value as SectionId);

const getSectionIdFromHash = () => {
  const hash = window.location.hash.replace(/^#/, "");
  return isSectionId(hash) ? hash : "home";
};

const getActiveSectionId = () => {
  const offset = 120;
  const scrolledToBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 2;

  if (scrolledToBottom) {
    return SECTION_IDS[SECTION_IDS.length - 1];
  }

  let current: SectionId = SECTION_IDS[0];

  for (const id of SECTION_IDS) {
    const element = document.getElementById(id);
    if (!element) continue;
    if (element.getBoundingClientRect().top <= offset) {
      current = id;
    }
  }

  return current;
};

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<SectionId>(getSectionIdFromHash);
  const spyLockedRef = useRef(false);
  const spyUnlockTimerRef = useRef<number>(0);
  const { language, setLanguage, t } = useI18n();

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      if (spyLockedRef.current) return;
      const nextId = getActiveSectionId();
      setActiveId((current) => (current === nextId ? current : nextId));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", updateActiveSection);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(spyUnlockTimerRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", updateActiveSection);
    };
  }, []);

  const elements: TreeViewElement[] = [
    {
      id: "root",
      name: "portfolio",
      type: "folder",
      children: [
        { id: "home", name: t("nav.home"), href: "#home" },
        { id: "about", name: t("nav.about"), href: "#about" },
        {
          id: "projects",
          name: "projects",
          type: "folder",
          children: [
            { id: "sumi", name: "sumi", href: "#sumi" },
            { id: "bosporus", name: "bosporus", href: "#bosporus" },
            { id: "dashboard", name: "period-tracker", href: "#dashboard" },
          ],
        },
        { id: "contact", name: t("nav.contact"), href: "#contact" },
      ],
    },
  ];

  const languageSwitch = (
    <div className="flex items-center gap-2 px-2 text-sm">
      <button
        className={`cursor-pointer ${
          language === "de" ? "text-white" : "text-neutral-400"
        }`}
        onClick={() => setLanguage("de")}
        aria-label={t("nav.toggleAria")}
      >
        DE
      </button>
      <span className="text-neutral-500">/</span>
      <button
        className={`cursor-pointer ${
          language === "en" ? "text-white" : "text-neutral-400"
        }`}
        onClick={() => setLanguage("en")}
        aria-label={t("nav.toggleAria")}
      >
        EN
      </button>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className="fixed top-4 left-4 z-30 flex size-10 items-center justify-center rounded-lg border border-white/10 bg-primary/80 text-neutral-200 backdrop-blur-lg lg:hidden"
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Toggle navigation"
      >
        {isOpen ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
      </button>

      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          aria-label="Close navigation"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-white/10 bg-primary/90 pt-16 backdrop-blur-lg transition-transform duration-200 lg:w-56 lg:translate-x-0 lg:pt-6 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-4 hidden items-center gap-2 px-4 text-sm text-neutral-400 lg:flex">
          <FolderIcon className="size-4 text-lavender" />
          <span className="font-medium text-white">Ömer</span>
        </div>
        <div className="min-h-0 flex-1">
          <Tree
            className="h-full overflow-hidden"
            elements={elements}
            initialExpandedItems={["root", "projects"]}
            selectedId={activeId}
            sort="none"
            indicator
            onFileSelect={(id) => {
              if (isSectionId(id)) {
                spyLockedRef.current = true;
                setActiveId(id);
                const unlock = () => {
                  spyLockedRef.current = false;
                  window.removeEventListener("scrollend", unlock);
                };
                window.clearTimeout(spyUnlockTimerRef.current);
                window.addEventListener("scrollend", unlock, { once: true });
                spyUnlockTimerRef.current = window.setTimeout(unlock, 1000);
              }
              setIsOpen(false);
            }}
          />
        </div>
        <div className="border-t border-white/10 px-3 py-4">{languageSwitch}</div>
      </aside>
    </>
  );
}
