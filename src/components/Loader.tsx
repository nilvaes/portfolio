import { Html, useProgress } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();
  // translate loaded percentage to integer
  return (
    <Html center className="text-xl font-normal text-center">
      {progress} % Geladen
    </Html>
  );
}
