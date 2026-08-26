import { useEffect, useState } from "react";
import About from "./sections/About";
import Hero from "./sections/Hero";
import Navbar from "./sections/Navbar";
import Journey from "./sections/Journey";
import Projects from "./sections/Projects";
import Footer from "./sections/Footer";
import Legal, { type LegalPage } from "./sections/Legal";
import { Particles } from "./components/Particles";
import { useTheme } from "./theme";

const LEGAL_PAGES: LegalPage[] = ["datenschutz", "info"];

function readLegalPage(): LegalPage | null {
  const hash = window.location.hash.replace("#", "");
  return LEGAL_PAGES.includes(hash as LegalPage) ? (hash as LegalPage) : null;
}

function App() {
  const { theme } = useTheme();
  const [legalPage, setLegalPage] = useState<LegalPage | null>(readLegalPage);

  useEffect(() => {
    const onHashChange = () => setLegalPage(readLegalPage());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Coming back from a legal page, the anchor target only exists after this render.
  useEffect(() => {
    if (legalPage) return;
    const hash = window.location.hash;
    if (!hash || hash === "#home") return;
    requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    });
  }, [legalPage]);

  if (legalPage) {
    return (
      <>
        <Navbar />
        <div className="relative z-10 bg-primary">
          <Legal page={legalPage} />
          <div className="container mx-auto max-w-7xl">
            <Footer />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="relative z-10 bg-primary">
        <Hero />
      </div>
      <div className="relative container mx-auto max-w-7xl">
        <div className="relative z-10 bg-primary">
          <About />
        </div>
        <Particles
          className="absolute inset-0 z-0"
          quantity={150}
          ease={80}
          color={theme === "light" ? "#967aa1" : "#ffffff"}
          refresh
        />
        <div className="relative z-10">
          <Journey />
          <Projects />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
