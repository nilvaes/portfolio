import About from "./sections/About";
import Hero from "./sections/Hero";
import Navbar from "./sections/Navbar";
import Journey from "./sections/Journey";
import Contact from "./sections/Contact";

function App() {
  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar />
      <Hero />
      <About />
      <Journey />
      {/* projects */}
      {/* testimonial */}
      <Contact />
    </div>
  );
}

export default App;
