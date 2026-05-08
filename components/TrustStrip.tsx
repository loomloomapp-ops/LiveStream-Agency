"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";

export default function TrustStrip() {
  const { t } = useLang();
  const items = [...t.trust.items, ...t.trust.items];

  return (
    <div className="relative overflow-hidden py-5 border-y border-[rgba(255,255,255,0.06)]">
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
        style={{ background: "linear-gradient(to right, #07070a, transparent)" }} />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
        style={{ background: "linear-gradient(to left, #07070a, transparent)" }} />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex gap-12 whitespace-nowrap w-max"
      >
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 flex-shrink-0">
            <span className="text-2xl font-bold gradient-text tracking-tight">
              {item.value}
            </span>
            <span className="text-sm text-muted">{item.label}</span>
            <span className="text-[rgba(255,255,255,0.15)] text-lg mx-2">·</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
