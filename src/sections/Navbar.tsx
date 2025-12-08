import { motion } from "motion/react";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Info", href: "#info" },
  { label: "About Me", href: "#about" },
  { label: "Contact", href: "#contact" },
];

type NavigationProps = {
  onNavigate?: () => void;
};

function Navigation({ onNavigate }: NavigationProps) {
  return (
    <ul className="nav-ul">
      {navLinks.map(({ label, href }) => (
        <li className="nav-li" key={label}>
          <a
            href={href}
            className="nav-link cursor-pointer"
            onClick={onNavigate}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40">
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-0">
          <a
            href="/"
            className="text-xl font-bold transition-colors text-neutral-400 hover:text-white"
          >
            Savas
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              className="w-6 h-6 text-white"
              alt="toggle"
            />
          </button>
          <nav className="hidden sm:flex ">
            <Navigation />
          </nav>
        </div>
      </div>
      {isOpen && (
        <motion.div
          className="block overflow-hidden text-center sm:hidden"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ maxHeight: " 100vh" }}
          transition={{ duration: 1 }}
        >
          <nav className="pb-5">
            <Navigation onNavigate={() => setIsOpen(false)} />
          </nav>
        </motion.div>
      )}
    </div>
  );
}
