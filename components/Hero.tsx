"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight, HouseLine } from "@phosphor-icons/react";
import { useLang } from "@/context/LangContext";
import { useModal } from "@/context/ModalContext";

const HERO_INTRO_DELAY = 0.9; // matches Preloader minDuration (0.7s) + start of exit fade

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: HERO_INTRO_DELAY + i * 0.1,
      duration: 0.7,
      ease: "easeOut" as const,
    },
  }),
};

export default function Hero() {
  const { t } = useLang();
  const { openModal } = useModal();
  const h = t.hero;
  const { scrollY } = useScroll();
  const blob1Y = useTransform(scrollY, [0, 800], [0, -110]);
  const blob2Y = useTransform(scrollY, [0, 800], [0, 70]);
  const blob3Y = useTransform(scrollY, [0, 800], [0, -50]);

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden">
      {/* ── Background layers ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: blob1Y, background: "radial-gradient(circle, #d946ef 0%, transparent 65%)" }}
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-18"
        />
        <motion.div
          style={{ y: blob2Y, background: "radial-gradient(circle, #22d3ee 0%, transparent 65%)" }}
          className="absolute top-1/3 -left-60 w-[600px] h-[600px] rounded-full opacity-12"
        />
        <motion.div
          style={{ y: blob3Y, background: "radial-gradient(circle, #7c3aed 0%, transparent 60%)" }}
          className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full opacity-10"
        />

        {/* Decorative rings */}
        <div className="deco-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-25" />
        <div className="deco-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] opacity-40" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] opacity-30"
          style={{ background: "linear-gradient(90deg, transparent, #d946ef, #22d3ee, transparent)" }}
        />
      </div>

      {/* ── Hero image — absolute on desktop, in-flow on mobile ── */}
      <div className="lg:absolute lg:top-0 lg:right-0 lg:bottom-0 lg:w-[52%] flex items-end justify-center lg:justify-end lg:pr-0 order-first lg:order-none">
        <motion.div
          initial={{ opacity: 0, y: -120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: HERO_INTRO_DELAY + 0.3, ease: "easeOut" as const }}
          className="relative"
        >
          <div
            className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[340px] h-[200px] blur-3xl opacity-30"
            style={{ background: "radial-gradient(ellipse, #7c3aed 0%, #d946ef 50%, transparent 75%)" }}
          />
          <motion.div
            animate={{ rotate: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "50% 0%" }}
          >
            <Image
              src="/hero-claw.png"
              alt="Твій старт у стримінгу"
              width={680}
              height={1020}
              priority
              className="relative"
              style={{ maxHeight: "clamp(420px, 75vw, 100vh)", width: "auto", objectFit: "contain" }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* ── Main content ── */}
      <div className="relative wrap py-16 md:py-24 pt-28 md:pt-36">
        <div className="lg:max-w-[52%]">
          <div className="text-center lg:text-left">
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="show"
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6"
            >
              <span className="badge">
                <span className="live-dot" />
                {h.liveBadge}
              </span>
              <span
                className="badge"
                style={{
                  color: "rgba(255,255,255,0.55)",
                  background: "linear-gradient(160deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)",
                  borderColor: "rgba(255,255,255,0.18)",
                  borderTopColor: "rgba(255,255,255,0.28)",
                  boxShadow: "0 1px 0 0 rgba(255,255,255,0.08) inset, 0 -1px 0 0 rgba(0,0,0,0.3) inset, 0 4px 12px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.4)",
                }}
              >
                <HouseLine size={12} weight="bold" />
                {h.remoteBadge}
              </span>
              <span
                className="badge"
                style={{
                  color: "#fca5a5",
                  background: "linear-gradient(160deg, rgba(248,113,113,0.2) 0%, rgba(248,113,113,0.06) 100%)",
                  borderColor: "rgba(248,113,113,0.35)",
                  borderTopColor: "rgba(248,113,113,0.55)",
                  boxShadow: "0 1px 0 0 rgba(255,255,255,0.08) inset, 0 -1px 0 0 rgba(0,0,0,0.3) inset, 0 4px 16px rgba(248,113,113,0.15), 0 1px 3px rgba(0,0,0,0.4)",
                }}
              >
                {h.ageBadge}
              </span>
            </motion.div>

            <div className="overflow-hidden">
              {[h.headline1, h.headline2, h.headline3].filter(Boolean).map((line, i) => (
                <motion.h1
                  key={i}
                  custom={i + 1}
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="show"
                  className={`text-[clamp(2rem,9vw,3.75rem)] lg:text-6xl xl:text-7xl font-bold tracking-tighter leading-[1.05] ${
                    i === 1 ? "gradient-text" : "text-text"
                  }`}
                >
                  {line}
                </motion.h1>
              ))}
            </div>

            <motion.p
              custom={4}
              variants={fadeUpVariants}
              initial="hidden"
              animate="show"
              className="mt-6 text-lg text-muted leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              {h.sub}
            </motion.p>

            <motion.div
              custom={5}
              variants={fadeUpVariants}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start"
            >
              <button onClick={openModal} className="btn-primary text-base px-7 py-4">
                {h.cta}
                <ArrowRight size={18} weight="bold" />
              </button>
              <a href="#about" className="btn-ghost text-base px-7 py-4">
                {h.ctaLearn}
              </a>
            </motion.div>

            <motion.div
              custom={6}
              variants={fadeUpVariants}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-[rgba(255,255,255,0.06)] justify-center lg:justify-start"
            >
              {[h.stat1, h.stat2, h.stat3].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-2xl font-bold tracking-tight gradient-text">
                    {s.value}
                  </span>
                  <span className="text-sm text-muted mt-0.5">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
