import { OrbitingCircles } from "./OrbitingCircles";

export default function Frameworks() {
  const skills: string[] = [
    "auth0",
    "docker",
    "firebase",
    "github",
    "css3",
    "git",
    "html5",
    "javascript",
    "microsoft",
    "nestjs",
    "nodejs",
    "nuxt-icon",
    "react",
    "tailwindcss",
    "threejs",
    "typescript",
    "vue",
    "visualstudiocode",
    "vitejs",
    "sql",
  ];
  interface IconProps {
    src: string;
  }

  function Icon({ src }: IconProps) {
    return (
      <img
        src={src}
        className="rounded-sm duration-200 hover:scale-110"
        alt=""
      />
    );
  }

  return (
    <div className="relative flex h-60 w-full flex-col items-center justify-center ">
      <OrbitingCircles iconSize={40}>
        {skills.map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={25} radius={100} reverse speed={2}>
        {skills.reverse().map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
    </div>
  );
}
