"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { Plus, Minus } from "@phosphor-icons/react";

export default function Services() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  const s = t.services;

  return (
    <section id="services" className="py-24 md:py-32">
      <div className="wrap">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
          {/* Left: sticky label */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-80px" }}
            className="md:sticky md:top-24 self-start"
          >
            <span className="section-label">{s.label}</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tighter leading-none">
              {s.headline1}
              <br />
              <span className="gradient-text">{s.headline2}</span>
            </h2>
          </motion.div>

          {/* Right: accordion rows */}
          <div className="flex flex-col divide-y divide-[rgba(255,255,255,0.06)]">
            {s.items.map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                viewport={{ once: true, margin: "-60px" }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left py-6 flex items-start gap-5 group"
                >
                  <span
                    className="font-mono text-xs font-bold mt-1.5 flex-shrink-0"
                    style={{ color: "#d946ef" }}
                  >
                    {item.num}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`text-xl md:text-2xl font-semibold tracking-tight transition-colors ${
                          open === i ? "text-text" : "text-text/70 group-hover:text-text"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <span className="ml-4 flex-shrink-0 text-muted">
                        {open === i ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </div>

                    <AnimatePresence initial={false}>
                      {open === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <p className="mt-3 text-muted leading-relaxed text-base">
                            {item.body}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 rounded-full text-xs font-semibold"
                                style={{
                                  background: "rgba(217,70,239,0.08)",
                                  border: "1px solid rgba(217,70,239,0.2)",
                                  color: "#d946ef",
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
