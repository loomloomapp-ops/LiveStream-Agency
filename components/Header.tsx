"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { useModal } from "@/context/ModalContext";
import { List, X } from "@phosphor-icons/react";

export default function Header() {
  const { lang, setLang, t } = useLang();
  const { openModal } = useModal();
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 20);
      setHidden(y > lastY && y > 80);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.howItWorks, href: "#how" },
    { label: t.nav.cases, href: "#cases" },
    { label: t.nav.faq, href: "#faq" },
  ];

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div
          className={`transition-all duration-300 ${
            atTop ? "bg-transparent" : "glass"
          }`}
        >
          <div className="wrap flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 flex-shrink-0">
              <span className="live-dot" />
              <span className="text-text font-bold text-base sm:text-lg tracking-tight">
                LiveStream<span className="hidden sm:inline"> Agency</span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted hover:text-text transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Language switcher */}
              <div className="flex items-center gap-0.5 rounded-full border border-[rgba(255,255,255,0.1)] p-0.5 sm:gap-1 sm:p-1">
                {(["ua", "en"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                      lang === l
                        ? "gradient-bg text-white shadow-sm"
                        : "text-muted hover:text-text"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>

              {/* CTA button — desktop */}
              <button
                onClick={openModal}
                className="btn-primary hidden xl:inline-flex py-2.5 px-5 text-sm"
              >
                {t.nav.apply}
              </button>

              {/* Mobile/tablet burger */}
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="lg:hidden p-2 rounded-lg text-muted hover:text-text transition-colors"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={22} /> : <List size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-16 left-0 right-0 z-40 glass border-b border-[rgba(255,255,255,0.06)] py-4"
          >
            <div className="wrap flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 text-text text-base font-medium border-b border-[rgba(255,255,255,0.05)] last:border-0"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  openModal();
                }}
                className="btn-primary mt-3 w-full"
              >
                {t.nav.apply}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
