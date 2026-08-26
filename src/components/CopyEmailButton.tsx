import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useI18n } from "../i18n";
import { asset } from "../lib/utils";

export default function CopyEmailButton() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const email = "savas@ichigo.me";
  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <motion.button
      onClick={copyToClipboard}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 1.05 }}
      className="relative px-1 py-4 text-sm text-center rounded-full font-extralight bg-primary text-ink w-48 cursor-pointer overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.p
            className="flex items-center justify-center gap-2"
            key="copied"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
          >
            <img
              src={asset("assets/copy-done.svg")}
              className="w-5 light:invert"
              alt="copy icon"
            />
            {t("copyEmail.copied")}
          </motion.p>
        ) : (
          <motion.p
            className="flex items-center justify-center gap-2"
            key="copy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <img
              src={asset("assets/copy.svg")}
              className="w-5 light:invert"
              alt="Copy Icon"
            />
            {t("copyEmail.copy")}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
