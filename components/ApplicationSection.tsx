"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { HouseLine, Clock, CurrencyDollar } from "@phosphor-icons/react";
import FormFields from "./FormFields";

export default function ApplicationSection() {
  const { t } = useLang();
  const f = t.form;

  const perks = [
    { icon: <HouseLine size={18} weight="bold" />, label: t.benefits.items[1].title },
    { icon: <Clock size={18} weight="bold" />, label: t.benefits.items[5].title },
    { icon: <CurrencyDollar size={18} weight="bold" />, label: t.benefits.items[0].title },
  ];

  return (
    <section id="apply" className="py-24 md:py-32 relative overflow-hidden">
      {/* Ambient decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #d946ef, transparent 65%)" }}
        />
        <div
          className="absolute -bottom-20 right-0 w-[400px] h-[400px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #22d3ee 0%, transparent 65%)" }}
        />
        <div className="deco-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20" />
        <div className="deco-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-30" />
      </div>

      <div className="wrap relative">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left: headline + perks */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <span className="section-label">{f.label}</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
              {f.headline1}
              <br />
              <span className="gradient-text">{f.headline2}</span>
            </h2>
            <p className="mt-4 text-muted text-lg leading-relaxed">{f.sub}</p>

            <div className="mt-8 flex flex-col gap-3">
              {perks.map((p) => (
                <div key={p.label} className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(217,70,239,0.12)", color: "#d946ef" }}
                  >
                    {p.icon}
                  </div>
                  <span className="text-sm font-medium text-text">{p.label}</span>
                </div>
              ))}
            </div>

            {/* 18+ notice */}
            <div
              className="mt-8 p-4 rounded-xl flex items-start gap-3"
              style={{ background: "rgba(248,113,113,0.06)", border: "1px solid rgba(248,113,113,0.2)" }}
            >
              <span className="text-lg mt-0.5" style={{ color: "#f87171" }}>⚠️</span>
              <p className="text-sm leading-relaxed" style={{ color: "#f87171" }}>
                {t.age18notice}
              </p>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, margin: "-80px" }}
            className="glass-card p-6 md:p-8"
          >
            <FormFields />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
