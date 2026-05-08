"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { Plus, Minus } from "@phosphor-icons/react";

export default function FAQ() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(null);
  const f = t.faq;

  return (
    <section id="faq" className="py-24 md:py-32 bg-surface relative overflow-hidden">
      {/* Section ambient decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #22d3ee 0%, transparent 65%)" }}
        />
        <div className="deco-ring absolute top-1/2 right-[-5%] -translate-y-1/2 w-[500px] h-[500px] opacity-20" />
      </div>
      <div className="wrap relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <span className="section-label">{f.label}</span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-none">
            {f.headline1}{" "}
            <span className="gradient-text">{f.headline2}</span>
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 md:gap-x-12">
          {[0, 1].map((col) => {
            const half = Math.ceil(f.items.length / 2);
            const colItems =
              col === 0 ? f.items.slice(0, half) : f.items.slice(half);
            const offset = col === 0 ? 0 : half;
            return (
              <div
                key={col}
                className="flex flex-col divide-y divide-[rgba(255,255,255,0.06)]"
              >
                {colItems.map((item, idx) => {
                  const i = offset + idx;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" as const }}
                      viewport={{ once: true, margin: "-40px" }}
                    >
                      <button
                        onClick={() => setOpen(open === i ? null : i)}
                        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
                      >
                        <span
                          className={`font-medium text-base leading-snug transition-colors ${
                            open === i
                              ? "text-text"
                              : "text-text/75 group-hover:text-text"
                          }`}
                        >
                          {item.q}
                        </span>
                        <span className="flex-shrink-0 mt-0.5 text-muted transition-colors group-hover:text-accent">
                          {open === i ? (
                            <Minus size={18} style={{ color: "#d946ef" }} />
                          ) : (
                            <Plus size={18} />
                          )}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {open === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: "easeOut" as const }}
                            className="overflow-hidden"
                          >
                            <p className="pb-5 text-muted leading-relaxed text-sm">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
