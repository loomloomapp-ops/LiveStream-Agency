"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  HouseSimple,
  GraduationCap,
  CurrencyDollar,
  UsersThree,
  TrendUp,
  ArrowRight,
} from "@phosphor-icons/react";
import { useLang } from "@/context/LangContext";
import { useModal } from "@/context/ModalContext";

const ACCENTS = [
  { Icon: ShieldCheck,    color: "#d946ef" },
  { Icon: HouseSimple,    color: "#22d3ee" },
  { Icon: GraduationCap,  color: "#7c3aed" },
  { Icon: CurrencyDollar, color: "#d946ef" },
  { Icon: UsersThree,     color: "#22d3ee" },
  { Icon: TrendUp,        color: "#7c3aed" },
];

export default function WhoIsItFor() {
  const { t } = useLang();
  const { openModal } = useModal();
  const w = t.whoFor;

  return (
    <section
      id="who"
      className="bg-surface relative overflow-hidden py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="deco-ring-cyan absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-20" />
        <div
          className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #d946ef 0%, transparent 65%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #22d3ee 0%, transparent 65%)" }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-20"
          style={{ background: "linear-gradient(90deg, transparent, #22d3ee, #d946ef, transparent)" }}
        />
      </div>

      <div className="wrap relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 md:mb-16 max-w-2xl"
        >
          <span className="section-label">{w.label}</span>
          <h2 className="mt-4 text-4xl md:text-5xl xl:text-6xl font-bold tracking-tighter leading-none">
            {w.headline1}{" "}
            <span className="gradient-text">{w.headline2}</span>
          </h2>
          <p className="mt-5 text-muted text-base leading-relaxed max-w-md">
            Подивись, чи це про тебе — і подавай заявку.
          </p>

          <div className="mt-7">
            <button onClick={openModal} className="btn-primary">
              {t.nav.apply}
              <ArrowRight size={16} weight="bold" />
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {w.items.map((item, i) => {
            const { Icon, color } = ACCENTS[i % ACCENTS.length];
            const num = String(i + 1).padStart(2, "0");
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" as const }}
                viewport={{ once: true, margin: "-60px" }}
                className="relative rounded-3xl p-7 overflow-hidden group"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 0% 0%, ${color}15 0%, transparent 60%)`,
                  }}
                />

                <div className="relative flex items-start justify-between mb-5">
                  <span
                    className="text-5xl font-bold leading-none tracking-tighter"
                    style={{ color }}
                  >
                    {num}
                  </span>
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${color}28, ${color}0a)`,
                      border: `1px solid ${color}40`,
                    }}
                  >
                    <Icon size={20} weight="fill" style={{ color }} />
                  </div>
                </div>

                <h3 className="relative text-xl font-bold text-text leading-tight mb-2 tracking-tight">
                  {item.title}
                </h3>
                <p
                  className="relative text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.72)" }}
                >
                  {item.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
