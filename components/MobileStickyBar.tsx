"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { useModal } from "@/context/ModalContext";
import { useLang } from "@/context/LangContext";

export default function MobileStickyBar() {
  const { openModal } = useModal();
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4"
          style={{
            background: "linear-gradient(to top, rgba(7,7,10,0.98), rgba(7,7,10,0.7))",
            backdropFilter: "blur(16px)",
          }}
        >
          <button
            onClick={openModal}
            className="btn-primary w-full text-base py-4"
          >
            <span className="live-dot" />
            {t.mobilebar.cta}
            <ArrowRight size={18} weight="bold" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
