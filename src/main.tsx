import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { I18nProvider } from "./i18n";
import { ThemeProvider } from "./theme";
import { MotionConfig } from "motion/react";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <I18nProvider>
        {/* Respect the OS "reduce motion" setting for all animations */}
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </I18nProvider>
    </ThemeProvider>
  </StrictMode>,
)
