"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ClipboardText,
  VideoCamera,
  GraduationCap,
  RocketLaunch,
  ArrowRight,
} from "@phosphor-icons/react";
import { useLang } from "@/context/LangContext";
import { useModal } from "@/context/ModalContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEP_ICONS = [ClipboardText, VideoCamera, GraduationCap, RocketLaunch];
const STEP_COLORS = ["#d946ef", "#22d3ee", "#7c3aed", "#d946ef"];

export default function HowItWorks() {
  const { t } = useLang();
  const { openModal } = useModal();
  const h = t.howItWorks;

  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      // Initial reveal: swipe overlays slide up with random stagger
      ScrollTrigger.create({
        trigger: hero,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(".how-anim-swipe", {
            yPercent: -110,
            delay: 0.15,
            duration: 1.6,
            stagger: { from: "random", each: 0.12 },
            ease: "sine.out",
          });
        },
      });

      // Scrub parallax: subtle scale + vertical drift on strip backgrounds
      gsap.to(".how-strip-bg", {
        scale: 1.1,
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=80%",
          scrub: true,
        },
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how" className="relative bg-surface">
      {/* ── Mobile: standard stagger ── */}
      <div className="md:hidden py-24">
        <div className="wrap">
          <div className="mb-14">
            <span className="section-label">{h.label}</span>
            <h2 className="mt-4 text-4xl font-bold tracking-tighter leading-none">
              {h.headline1}{" "}
              <span className="gradient-text">{h.headline2}</span>
            </h2>
          </div>

          <div className="relative">
            <div
              className="absolute left-9 top-0 bottom-0 w-px"
              style={{
                background:
                  "linear-gradient(to bottom, #d946ef, #22d3ee, transparent)",
              }}
            />
            <div className="flex flex-col gap-8">
              {h.steps.map((step, i) => {
                const Icon = STEP_ICONS[i];
                const color = STEP_COLORS[i];
                return (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1,
                      ease: "easeOut" as const,
                    }}
                    viewport={{ once: true, margin: "-40px" }}
                    className="flex gap-5 items-start"
                  >
                    <div
                      className="w-[72px] h-[72px] rounded-full flex items-center justify-center flex-shrink-0 relative z-10"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${color}22, ${color}0a)`,
                        backgroundColor: "var(--color-surface)",
                        border: `1px solid ${color}40`,
                      }}
                    >
                      <Icon size={26} weight="fill" style={{ color }} />
                    </div>
                    <div className="pt-4">
                      <p
                        className="text-xs font-bold tracking-widest uppercase mb-1"
                        style={{ color }}
                      >
                        {step.num}
                      </p>
                      <h3 className="text-lg font-semibold text-text mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-12 text-center">
            <button onClick={openModal} className="btn-primary text-base px-8 py-4">
              {t.nav.apply}
              <ArrowRight size={18} weight="bold" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Desktop: vertical strip reveal ── */}
      <div
        ref={heroRef}
        className="hidden md:flex flex-col relative overflow-hidden"
      >
        {/* Heading row */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" as const }}
          viewport={{ once: true }}
          className="wrap pt-16 pb-10 flex items-end justify-between gap-8"
        >
          <div className="max-w-2xl">
            <span className="section-label">{h.label}</span>
            <h2 className="mt-3 text-4xl xl:text-5xl font-bold tracking-tighter leading-none">
              {h.headline1}{" "}
              <span className="gradient-text">{h.headline2}</span>
            </h2>
            <p className="mt-4 text-muted text-sm leading-relaxed max-w-md">
              Чотири кроки від заявки до першого доходу. Прозоро і без надлишків.
            </p>
          </div>
          <button onClick={openModal} className="btn-primary flex-shrink-0">
            {t.nav.apply}
            <ArrowRight size={16} weight="bold" />
          </button>
        </motion.div>

        {/* Vertical strips */}
        <div className="relative grid grid-cols-4 h-[42vh] min-h-[380px]">
          {h.steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            const color = STEP_COLORS[i];
            const isLast = i === h.steps.length - 1;
            return (
              <div
                key={step.num}
                className="how-strip relative overflow-hidden"
                style={{
                  borderRight: !isLast
                    ? "2px solid var(--color-bg)"
                    : "none",
                }}
              >
                {/* Parallax background layer */}
                <div
                  className="how-strip-bg absolute inset-0"
                  style={{
                    background: `
                      radial-gradient(ellipse at 50% 110%, ${color}55 0%, transparent 60%),
                      linear-gradient(180deg, rgba(255,255,255,0.025) 0%, ${color}10 60%, ${color}22 100%)
                    `,
                  }}
                />

                {/* Subtle noise / inner border */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
                  }}
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6 xl:p-8">
                  {/* Watermark number */}
                  <div
                    className="font-bold leading-none tracking-tighter mb-3 select-none"
                    style={{
                      fontSize: "clamp(56px, 6vw, 100px)",
                      color: `${color}28`,
                    }}
                  >
                    {step.num}
                  </div>

                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{
                      background: `linear-gradient(135deg, ${color}30, ${color}0a)`,
                      border: `1px solid ${color}55`,
                    }}
                  >
                    <Icon size={20} weight="fill" style={{ color }} />
                  </div>

                  <span
                    className="text-[10px] font-bold tracking-[0.25em] uppercase mb-1.5"
                    style={{ color }}
                  >
                    {h.stepLabel} {step.num}
                  </span>

                  <h3 className="text-lg xl:text-xl font-bold text-text leading-tight mb-2 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs xl:text-sm text-muted leading-relaxed">
                    {step.body}
                  </p>
                </div>

                {/* Reveal swipe overlay */}
                <div
                  className="how-anim-swipe absolute inset-0 z-30"
                  style={{ background: "var(--color-bg)" }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
