import About from "./sections/About";
import Hero from "./sections/Hero";
import Navbar from "./sections/Navbar";
import Journey from "./sections/Journey";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import { Particles } from "./components/Particles";
import { useTheme } from "./theme";

function App() {
  const { theme } = useTheme();

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
          <Contact />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
