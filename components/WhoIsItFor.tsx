"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShieldCheck,
  HouseSimple,
  GraduationCap,
  CurrencyDollar,
  UsersThree,
  TrendUp,
  ArrowRight,
  MouseSimple,
} from "@phosphor-icons/react";
import { useLang } from "@/context/LangContext";
import { useModal } from "@/context/ModalContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip, ScrollTrigger);
}

const ACCENTS = [
  { Icon: ShieldCheck,    color: "#d946ef" },
  { Icon: HouseSimple,    color: "#22d3ee" },
  { Icon: GraduationCap,  color: "#7c3aed" },
  { Icon: CurrencyDollar, color: "#d946ef" },
  { Icon: UsersThree,     color: "#22d3ee" },
  { Icon: TrendUp,        color: "#7c3aed" },
];

const STACK_OFFSET = 22;

// Build order array where last element is the front card.
// step ∈ [0, n-1] selects which item is on top.
function buildOrder(n: number, step: number): number[] {
  const arr: number[] = [];
  for (let i = 0; i < n; i++) {
    arr.push((step + 1 + i) % n);
  }
  // last element is now `step` itself → that's the front card
  return arr;
}

export default function WhoIsItFor() {
  const { t } = useLang();
  const { openModal } = useModal();
  const w = t.whoFor;
  const n = w.items.length;

  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const pendingState = useRef<Flip.FlipState | null>(null);
  const stepRef = useRef(0);

  const [step, setStep] = useState(0);
  const order = buildOrder(n, step);

  // Animate stack on order change
  useLayoutEffect(() => {
    if (!pendingState.current || !sliderRef.current) return;
    Flip.from(pendingState.current, {
      targets: sliderRef.current.querySelectorAll(".stack-item"),
      duration: 0.7,
      ease: "sine.inOut",
      absolute: true,
      onEnter: (els) =>
        gsap.from(els, { duration: 0.4, yPercent: 16, opacity: 0, ease: "expo.out" }),
      onLeave: (els) =>
        gsap.to(els, { duration: 0.4, yPercent: 6, xPercent: -6, opacity: 0, ease: "expo.out" }),
    });
    pendingState.current = null;
  }, [step]);

  const goTo = (next: number) => {
    if (next === stepRef.current || !sliderRef.current) return;
    pendingState.current = Flip.getState(sliderRef.current.querySelectorAll(".stack-item"));
    stepRef.current = next;
    setStep(next);
  };

  // Pin only the cards block + drive step from scroll
  useEffect(() => {
    if (!pinRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top top",
        end: `+=${n * 480}`,
        pin: pinRef.current,
        pinSpacing: true,
        scrub: true,
        snap: {
          snapTo: 1 / (n - 1),
          duration: { min: 0.15, max: 0.4 },
          ease: "power1.inOut",
        },
        onUpdate: (self) => {
          const next = Math.round(self.progress * (n - 1));
          if (next !== stepRef.current) goTo(next);
        },
      });
    }, pinRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Heading = (
    <>
      <span className="section-label">{w.label}</span>
      <h2 className="mt-4 text-4xl md:text-5xl xl:text-6xl font-bold tracking-tighter leading-none">
        {w.headline1}{" "}
        <span className="gradient-text">{w.headline2}</span>
      </h2>
      <p className="mt-5 text-muted text-base leading-relaxed max-w-md">
        Скролл прокручує колоду карток. Знайди свій пункт — і подавай заявку.
      </p>

      <div className="flex flex-wrap items-center gap-3 mt-8">
        <button onClick={openModal} className="btn-primary">
          {t.nav.apply}
          <ArrowRight size={16} weight="bold" />
        </button>

        <div
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.65)",
          }}
        >
          <MouseSimple size={14} weight="bold" />
          Скролль для перегортання
        </div>
      </div>

      <div className="flex gap-1.5 mt-7">
        {w.items.map((_, i) => (
          <span
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === step ? 28 : 8,
              height: 8,
              display: "inline-block",
              background:
                i === step
                  ? "linear-gradient(90deg, #d946ef, #22d3ee)"
                  : "rgba(255,255,255,0.18)",
            }}
          />
        ))}
      </div>

      <div className="mt-5 text-xs uppercase tracking-[0.25em] text-muted">
        {String(step + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
      </div>
    </>
  );

  return (
    <section
      ref={sectionRef}
      id="who"
      className="bg-surface relative overflow-hidden"
    >
      {/* Mobile heading — scrolls naturally above pinned cards */}
      <div className="lg:hidden wrap pt-20 pb-8 relative">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" as const }}
          viewport={{ once: true, margin: "-80px" }}
        >
          {Heading}
        </motion.div>
      </div>

      <div ref={pinRef} className="relative h-screen flex items-center">
        {/* ambient */}
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

        <div className="wrap relative w-full">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">
            {/* Desktop heading inside pinned area */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" as const }}
              viewport={{ once: true, margin: "-80px" }}
              className="hidden lg:block"
            >
              {Heading}
            </motion.div>

            {/* Right: GSAP Flip card stack */}
            <div className="relative w-full flex justify-center">
              <div
                ref={sliderRef}
                className="relative select-none"
                style={{
                  width: 360,
                  height: 460,
                  perspective: 1000,
                }}
              >
                {order.map((idx, i) => {
                  const item = w.items[idx];
                  const { Icon, color } = ACCENTS[idx % ACCENTS.length];
                  const num = String(idx + 1).padStart(2, "0");
                  const stackPos = i;
                  const fromFront = order.length - 1 - stackPos;
                  const x = -fromFront * STACK_OFFSET;
                  const y = -fromFront * STACK_OFFSET;
                  const rot = fromFront * -2;
                  const isFront = fromFront === 0;

                  return (
                    <div
                      key={idx}
                      data-flip-id={`item-${idx}`}
                      className="stack-item absolute rounded-3xl overflow-hidden"
                      style={{
                        left: "50%",
                        top: "50%",
                        width: 320,
                        height: 420,
                        marginLeft: -160,
                        marginTop: -210,
                        transform: `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg)`,
                        background:
                          "linear-gradient(160deg, rgba(255,255,255,0.08), rgba(255,255,255,0.025))",
                        backdropFilter: "blur(20px) saturate(160%)",
                        WebkitBackdropFilter: "blur(20px) saturate(160%)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        boxShadow: isFront
                          ? "0 30px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05) inset"
                          : "0 18px 40px rgba(0,0,0,0.4)",
                        zIndex: stackPos + 1,
                      }}
                    >
                      <div
                        className="absolute inset-x-0 top-0 h-1"
                        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                      />

                      <div className="relative h-full p-7 flex flex-col">
                        <div className="flex items-start justify-between">
                          <span
                            className="text-6xl font-bold leading-none tracking-tighter"
                            style={{ color }}
                          >
                            {num}
                          </span>
                          <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg, ${color}28, ${color}0a)`,
                              border: `1px solid ${color}40`,
                            }}
                          >
                            <Icon size={22} weight="fill" style={{ color }} />
                          </div>
                        </div>

                        <div className="mt-auto">
                          <h3 className="text-2xl font-bold text-text leading-tight mb-3 tracking-tight">
                            {item.title}
                          </h3>
                          <p
                            className="text-base font-medium leading-relaxed"
                            style={{ color: "rgba(255,255,255,0.88)" }}
                          >
                            {item.body}
                          </p>
                        </div>

                        {isFront && (
                          <div className="mt-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted/70">
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ background: color }}
                            />
                            {String(idx + 1).padStart(2, "0")} • {w.label}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
