"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { Quotes } from "@phosphor-icons/react";

const COLORS = [
  ["#d946ef", "#22d3ee"],
  ["#22d3ee", "#6366f1"],
  ["#f97316", "#d946ef"],
  ["#6366f1", "#d946ef"],
];

export default function Testimonials() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const items = t.testimonials.items;

  useEffect(() => {
    const id = setInterval(() => {
      setActive((v) => (v + 1) % items.length);
    }, 5000);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <section id="testimonials" className="py-24 md:py-32 relative overflow-hidden">
      {/* Section ambient decoration */}
      <div className="pointer-events-none absolute inset-0">
        {/* Giant fuchsia quote mark watermark */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 select-none font-bold leading-none"
          style={{
            fontSize: "clamp(240px, 30vw, 480px)",
            background: "linear-gradient(180deg, rgba(217,70,239,0.08) 0%, transparent 80%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 0.8,
          }}
        >
          "
        </div>
        {/* Blurred blobs */}
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #d946ef 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)" }}
        />
        {/* Decorative ring */}
        <div className="deco-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-20" />
      </div>

      <div className="wrap relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <span className="section-label">{t.testimonials.label}</span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-none">
            {t.testimonials.headline1}{" "}
            <span className="gradient-text">{t.testimonials.headline2}</span>
          </h2>
        </motion.div>

        {/* Main quote area */}
        <div className="relative max-w-3xl mx-auto min-h-[280px] md:min-h-[240px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="glass-card p-8 md:p-10 relative overflow-hidden"
            >
              {/* Card ambient glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 0% 0%, ${COLORS[active % COLORS.length][0]}12 0%, transparent 60%)`,
                }}
              />
              <Quotes
                size={36}
                weight="fill"
                className="mb-5 relative"
                style={{ color: COLORS[active % COLORS.length][0], opacity: 0.7 }}
              />
              <p className="relative text-xl md:text-2xl text-text leading-relaxed font-medium">
                "{items[active].text}"
              </p>

              <div className="relative flex items-center gap-3 mt-8">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${COLORS[active % COLORS.length][0]}, ${COLORS[active % COLORS.length][1]})` }}
                >
                  {items[active].name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">{items[active].name}</p>
                  <p className="text-xs text-muted">
                    {items[active].city} · {items[active].months}{" "}
                    {items[active].months < 5 ? "місяці" : "місяців"}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === active ? 24 : 8,
                height: 8,
                background: i === active
                  ? "linear-gradient(135deg, #d946ef, #22d3ee)"
                  : "rgba(255,255,255,0.15)",
              }}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* All cards — mobile scroll row */}
        <div className="flex gap-4 mt-10 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible">
          {items.map((item, i) => (
            <button
              key={item.name}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 w-52 md:w-auto glass-card p-4 text-left transition-all duration-300 ${
                i === active ? "border-accent/40" : ""
              }`}
              style={i === active ? { borderColor: "rgba(217,70,239,0.4)" } : {}}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${COLORS[i % COLORS.length][0]}, ${COLORS[i % COLORS.length][1]})` }}
                >
                  {item.name[0]}
                </div>
                <div>
                  <p className="text-xs font-semibold text-text">{item.name}</p>
                  <p className="text-xs text-muted">{item.city}</p>
                </div>
              </div>
              <p className="text-xs text-muted line-clamp-2 leading-relaxed">"{item.text}"</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
