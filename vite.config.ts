import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react(), tailwindcss()],
    base: "/", // Standard für Localhost
  };

  // Nur wenn wir für Produktion bauen (npm run build), ändern wir die Base
  if (command !== "serve") {
    config.base = "/portfolio/";
  }

  return config;
});
