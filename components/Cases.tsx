"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { useModal } from "@/context/ModalContext";
import { ArrowRight, TrendUp } from "@phosphor-icons/react";

const COLORS = [
  ["#d946ef", "#22d3ee"],
  ["#22d3ee", "#6366f1"],
  ["#f97316", "#d946ef"],
];

function CaseCard({
  item,
  index,
}: {
  item: {
    name: string;
    city: string;
    age: number;
    result: string;
    time: string;
    quote: string;
    before: string;
  };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 180, damping: 28 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 180, damping: 28 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const [c1, c2] = COLORS[index % COLORS.length];

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMove}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-60px" }}
      className="glass-card p-6 flex flex-col cursor-default"
    >
      {/* Avatar + name */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
        >
          {item.name[0]}
        </div>
        <div>
          <p className="font-semibold text-text">{item.name}</p>
          <p className="text-xs text-muted">
            {item.city}, {item.age} {item.age >= 18 ? "" : ""}р.
          </p>
        </div>
      </div>

      {/* Before → After */}
      <div className="flex items-center gap-3 mb-5 p-3 rounded-xl"
        style={{ background: "rgba(217,70,239,0.06)", border: "1px solid rgba(217,70,239,0.15)" }}>
        <div className="text-center flex-1">
          <p className="text-xs text-muted mb-0.5">До</p>
          <p className="text-sm font-medium text-muted">{item.before}</p>
        </div>
        <TrendUp size={20} style={{ color: "#d946ef" }} className="flex-shrink-0" />
        <div className="text-center flex-1">
          <p className="text-xs text-muted mb-0.5">Результат</p>
          <p className="text-sm font-bold" style={{ color: "#4ade80" }}>{item.result}</p>
        </div>
      </div>

      <p className="text-sm text-muted leading-relaxed italic flex-1">"{item.quote}"</p>

      <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
        <span className="text-xs text-muted">{item.time}</span>
      </div>
    </motion.div>
  );
}

export default function Cases() {
  const { t } = useLang();
  const { openModal } = useModal();
  const c = t.cases;

  return (
    <section id="cases" className="py-24 md:py-32 bg-surface">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14"
        >
          <span className="section-label">{c.label}</span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-none">
            {c.headline1}{" "}
            <span className="gradient-text">{c.headline2}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {c.items.map((item, i) => (
            <CaseCard key={item.name} item={item} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 text-center"
        >
          <button onClick={openModal} className="btn-primary text-base px-8 py-4">
            {c.cta}
            <ArrowRight size={18} weight="bold" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
