import { asset } from "../lib/utils";

const LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/savasdev/",
    icon: "assets/logos/linkedin-white.svg",
  },
  {
    label: "Xing",
    href: "https://www.xing.com/profile/Oemer_Savas094643",
    icon: "assets/logos/xing-white.svg",
  },
  {
    label: "GitHub",
    href: "https://github.com/nilvaes",
    icon: "assets/logos/github-white.svg",
  },
] as const;

export default function SocialLinks({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md";
  className?: string;
}) {
  const iconClass = size === "sm" ? "w-5" : "w-7 md:w-8";

  return (
    <ul className={`flex items-center gap-4 ${className}`}>
      {LINKS.map(({ label, href, icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="grid place-items-center rounded-full p-2 opacity-70 transition hover:-translate-y-0.5 hover:opacity-100"
          >
            <img
              src={asset(icon)}
              alt=""
              aria-hidden
              className={`${iconClass} light:invert`}
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
