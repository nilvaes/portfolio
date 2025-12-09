import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/ParallaxBackground";
import { Canvas, useFrame } from "@react-three/fiber";
import { Astronaut } from "../components/Astronaut";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Float } from "@react-three/drei";
import { Suspense } from "react";
import Loader from "../components/Loader";

export default function Hero() {
  function Rig() {
    return useFrame((state, delta) => {
      easing.damp3(
        state.camera.position,
        [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
        0.5,
        delta
      );
    });
  }

  const isMobile = useMediaQuery({ maxWidth: 853 });
  return (
    <section
      id="home"
      className="mb-28 flex items-start justify-center md:items-start md:justify-start min-h-screen overflow-hidden c-space"
    >
      <HeroText />
      <ParallaxBackground />
      <figure
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas camera={{ position: [0, 1, 3] }}>
          <Suspense fallback={<Loader />}>
            <Float>
              <Astronaut
                scale={isMobile ? 0.23 : undefined}
                position={isMobile ? [0, -1, 0] : undefined}
              />
            </Float>
            <Rig />
          </Suspense>
        </Canvas>
      </figure>
    </section>
  );
}
