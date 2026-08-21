import About from "./sections/About";
import Hero from "./sections/Hero";
import Navbar from "./sections/Navbar";
import Journey from "./sections/Journey";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import { Particles } from "./components/Particles";

function App() {
  return (
    <>
      <Navbar />
      <div className="relative z-10 bg-primary">
        <Hero />
        <About />
      </div>
      <Particles
        className="fixed inset-0 z-0"
        quantity={150}
        ease={80}
        color="#ffffff"
        refresh
      />
      <div className="relative z-10">
        <Journey />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;
