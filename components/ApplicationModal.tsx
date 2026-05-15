"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "@phosphor-icons/react";
import { useModal } from "@/context/ModalContext";
import { useLang } from "@/context/LangContext";
import FormFields from "./FormFields";

export default function ApplicationModal() {
  const { isOpen, closeModal } = useModal();
  const { t } = useLang();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeModal}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="glass-card w-full max-w-lg max-h-[90vh] overflow-y-auto pointer-events-auto"
              style={{ padding: "28px" }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="section-label">{t.form.label}</span>
                  <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-text">
                    {t.form.headline1}
                  </h2>
                  <p className="text-sm text-muted mt-1">{t.form.sub}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-xl text-muted hover:text-text hover:bg-white/5 transition-colors flex-shrink-0 ml-4"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              <FormFields onSuccess={closeModal} compact />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
