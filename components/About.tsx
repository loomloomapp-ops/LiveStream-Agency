"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  TrendUp,
  CurrencyDollar,
  UserCircle,
  ShieldCheck,
  UsersThree,
} from "@phosphor-icons/react";
import { useLang } from "@/context/LangContext";
import { useModal } from "@/context/ModalContext";
import BentoGallery from "./BentoGallery";

const NODES = [
  {
    angle: -90,
    Icon: GraduationCap,
    color: "#d946ef",
    titleKey: 0,
    descKey: 0,
  },
  {
    angle: -30,
    Icon: TrendUp,
    color: "#22d3ee",
    titleKey: 1,
    descKey: 1,
  },
  {
    angle: 30,
    Icon: CurrencyDollar,
    color: "#7c3aed",
    titleKey: 2,
    descKey: 2,
  },
  {
    angle: 90,
    Icon: UserCircle,
    color: "#d946ef",
    titleKey: 3,
    descKey: 3,
  },
  {
    angle: 150,
    Icon: ShieldCheck,
    color: "#22d3ee",
    titleKey: 4,
    descKey: 4,
  },
  {
    angle: 210,
    Icon: UsersThree,
    color: "#7c3aed",
    titleKey: 5,
    descKey: 5,
  },
];

const HUB_TITLES = [
  "Навчання з нуля",
  "Просування",
  "Виплати",
  "Особистий менеджер",
  "Підтримка 24/7",
  "Спільнота",
];

const HUB_DESCS = [
  "Відеоуроки, живі сесії та ментор від першого дня. Без досвіду — норма.",
  "Стратегія контенту, SEO для стримів і крос-промоція з першого тижня.",
  "Виплати кожні 2 тижні. Прозора схема, без затримок і прихованих відсотків.",
  "Один менеджер — один стример. Завжди на зв'язку, допомагає з будь-яким питанням.",
  "Технічний відділ і особистий куратор доступні цілодобово, 7 днів на тиждень.",
  "Закрита спільнота стримерів, досвід і підтримка від колег по команді.",
];

const R = 270;
const CX = 380;
const CY = 380;
const TOTAL = 760;

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

export default function About() {
  const { t } = useLang();
  const { openModal } = useModal();
  const a = t.about;
  const [active, setActive] = useState<number | null>(null);
  const [hinted, setHinted] = useState(false);

  const positions = NODES.map((n) => ({
    x: CX + R * Math.cos(toRad(n.angle)),
    y: CY + R * Math.sin(toRad(n.angle)),
  }));

  const activeColor = active !== null ? NODES[active].color : "#d946ef";

  return (
    <>
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* ambient */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #d946ef 0%, transparent 65%)" }}
        />
        <div className="deco-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-[0.12]" />
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-20"
          style={{ background: "linear-gradient(90deg, transparent, #7c3aed, #d946ef, transparent)" }}
        />
      </div>

      <div className="wrap relative">
        {/* Section header — centered */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <span className="section-label">{a.label}</span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-none">
            {a.headline1}{" "}
            <span className="gradient-text">{a.headline2}</span>
          </h2>
          <p className="mt-4 text-muted text-lg leading-relaxed max-w-xl mx-auto">{a.sub}</p>
        </motion.div>

        {/* Hub diagram — desktop */}
        <div className="hidden md:flex justify-center mb-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
            viewport={{ once: true, margin: "-80px" }}
            className="relative select-none"
            style={{ width: TOTAL, height: TOTAL }}
          >
            {/* SVG: orbit ring + connecting lines */}
            <svg
              className="absolute inset-0 pointer-events-none"
              width={TOTAL}
              height={TOTAL}
            >
              {/* Orbit ring */}
              <circle
                cx={CX}
                cy={CY}
                r={R}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
                strokeDasharray="6 6"
              />
              {/* Connecting lines */}
              {NODES.map((n, i) => {
                const isActive = active === i;
                const nx = positions[i].x;
                const ny = positions[i].y;
                const dx = nx - CX;
                const dy = ny - CY;
                const len = Math.sqrt(dx * dx + dy * dy);
                const ux = dx / len;
                const uy = dy / len;
                return (
                  <line
                    key={i}
                    x1={CX + ux * 92}
                    y1={CY + uy * 92}
                    x2={nx - ux * 58}
                    y2={ny - uy * 58}
                    stroke={isActive ? n.color : "rgba(255,255,255,0.1)"}
                    strokeWidth={isActive ? 1.5 : 1}
                    strokeDasharray={isActive ? "none" : "4 5"}
                    style={{ transition: "stroke 0.25s, stroke-width 0.25s" }}
                  />
                );
              })}
            </svg>

            {/* Center node */}
            <div
              className="absolute flex flex-col items-center justify-center text-center"
              style={{
                left: CX - 88,
                top: CY - 88,
                width: 176,
                height: 176,
              }}
            >
              {/* Outer pulse ring */}
              <motion.div
                animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.1, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${activeColor}55 0%, transparent 70%)` }}
              />
              {/* Center circle */}
              <div
                className="relative w-full h-full rounded-full flex flex-col items-center justify-center overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(217,70,239,0.18), rgba(124,58,237,0.1))",
                  border: `1px solid ${activeColor}55`,
                  boxShadow: `0 0 40px ${activeColor}33`,
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
              >
                <AnimatePresence mode="wait">
                  {active === null ? (
                    <motion.div
                      key="logo"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col items-center"
                    >
                      <span
                        className="text-2xl font-extrabold tracking-wider"
                        style={{
                          background: "linear-gradient(135deg, #d946ef, #22d3ee)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        LiveStream
                      </span>
                      <span className="text-xs text-muted mt-1 leading-none">Agency</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`node-${active}`}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.2 }}
                      className="px-3 text-center"
                    >
                      <p className="text-sm font-bold text-text leading-snug">
                        {HUB_TITLES[active]}
                      </p>
                      <p className="text-[11px] text-muted mt-1.5 leading-snug">
                        {HUB_DESCS[active]}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Orbit nodes */}
            {NODES.map((n, i) => {
              const { x, y } = positions[i];
              const isActive = active === i;
              return (
                <motion.div
                  key={i}
                  className="absolute flex flex-col items-center cursor-pointer"
                  style={{ left: x - 56, top: y - 56, width: 112, height: 112 }}
                  onMouseEnter={() => { setActive(i); setHinted(true); }}
                  onMouseLeave={() => setActive(null)}
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Node circle */}
                  <div
                    className="w-[68px] h-[68px] rounded-2xl flex items-center justify-center"
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, ${n.color}40, ${n.color}15)`
                        : "rgba(255,255,255,0.04)",
                      border: `1px solid ${isActive ? n.color + "70" : "rgba(255,255,255,0.1)"}`,
                      boxShadow: isActive ? `0 0 20px ${n.color}40` : "none",
                      transition: "all 0.25s",
                    }}
                  >
                    <n.Icon
                      size={28}
                      weight="fill"
                      style={{ color: isActive ? n.color : "rgba(255,255,255,0.4)", transition: "color 0.25s" }}
                    />
                  </div>
                  {/* Label */}
                  <span
                    className="text-xs font-semibold mt-2 text-center leading-tight"
                    style={{ color: isActive ? n.color : "rgba(255,255,255,0.45)", transition: "color 0.25s", maxWidth: 100 }}
                  >
                    {HUB_TITLES[i]}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Hover hint */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: hinted ? 0 : 1, y: hinted ? -4 : 0 }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          whileInView={{ opacity: hinted ? 0 : 1 }}
          viewport={{ once: false }}
          className="hidden md:flex justify-center -mt-4 mb-4 pointer-events-none"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <motion.svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M12 5v.01M12 8a4 4 0 014 4v5a2 2 0 01-2 2H10a2 2 0 01-2-2v-5a4 4 0 014-4z" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="12" cy="10" r="1.5" fill="rgba(217,70,239,0.7)"/>
            </motion.svg>
            <span className="text-xs text-muted">Наведи мишку на будь-який елемент</span>
          </div>
        </motion.div>

        {/* Mobile: simple 2×3 grid */}
        <div className="grid grid-cols-2 gap-3 md:hidden mb-12">
          {NODES.map((n, i) => (
            <div
              key={i}
              className="glass-card p-4 flex items-start gap-3"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${n.color}18`, border: `1px solid ${n.color}30` }}
              >
                <n.Icon size={18} weight="fill" style={{ color: n.color }} />
              </div>
              <div>
                <p className="text-xs font-semibold text-text">{HUB_TITLES[i]}</p>
                <p className="text-[11px] text-muted mt-0.5 leading-snug line-clamp-2">{HUB_DESCS[i]}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
    {/* Scrubbed bento gallery — desktop only, expands from center on scroll */}
    <BentoGallery />
    </>
  );
}
