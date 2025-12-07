import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/ParallaxBackground";
import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
import { Astronaut } from "../components/Astronaut";
import { useMediaQuery } from "react-responsive";

export default function Hero() {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  return (
    <section className="flex items-start justify-center md:items-start md:justify-start min-h-screen overflow-hidden">
      <HeroText />
      <ParallaxBackground />
      <figure
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas camera={{ position: [0, 1, 3] }}>
          <Astronaut
            scale={isMobile ? 0.3 : undefined}
            position={isMobile ? [0, -1.5, 0] : undefined}
          />
        </Canvas>
      </figure>
    </section>
  );
}
