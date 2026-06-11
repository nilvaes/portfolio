import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// base "/" — site is served at https://portfolio.savasbuilds.com/ (root)
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
});
