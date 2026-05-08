"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { useModal } from "@/context/ModalContext";
import { useLang } from "@/context/LangContext";

export default function FloatingWidget() {
  const { openModal } = useModal();
  const { t } = useLang();
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="hidden md:flex fixed right-6 bottom-8 z-50 flex-col items-end gap-2"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="glass-card px-4 py-3 text-sm font-medium text-text whitespace-nowrap"
              >
                {t.widget.tooltip}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <motion.button
            onClick={openModal}
            onHoverStart={() => setExpanded(true)}
            onHoverEnd={() => setExpanded(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="btn-primary glow-accent flex items-center gap-2 py-3.5 px-5"
            style={{ boxShadow: "0 0 40px rgba(217,70,239,0.4)" }}
          >
            <span className="live-dot" />
            {t.widget.cta}
            <ArrowRight size={16} weight="bold" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
