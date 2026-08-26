import About from "./sections/About";
import Hero from "./sections/Hero";
import SideNav from "./sections/SideNav";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import { Particles } from "./components/Particles";

function App() {
  return (
    <>
      <SideNav />
      <div className="lg:pl-56">
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
            color="#ffffff"
            refresh
          />
          <div className="relative z-10">
            <Projects />
            <Contact />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
