"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import {
  CurrencyDollar,
  HouseSimple,
  GraduationCap,
  UserCircle,
  TrendUp,
  ShieldCheck,
} from "@phosphor-icons/react";
import { useLang } from "@/context/LangContext";

const ICONS = [
  CurrencyDollar,
  HouseSimple,
  GraduationCap,
  UserCircle,
  TrendUp,
  ShieldCheck,
];

const ICON_COLORS = [
  "#d946ef",
  "#22d3ee",
  "#7c3aed",
  "#d946ef",
  "#22d3ee",
  "#7c3aed",
];

export default function Benefits() {
  const { t, lang } = useLang();
  const b = t.benefits;

  const listRef = useRef<HTMLUListElement | null>(null);
  const selectorRef = useRef<HTMLDivElement | null>(null);

  // Osmo looping-words effect, adapted to React + Tailwind
  useEffect(() => {
    const list = listRef.current;
    const selector = selectorRef.current;
    if (!list || !selector) return;

    const words = Array.from(list.children) as HTMLElement[];
    const totalWords = words.length;
    if (totalWords === 0) return;

    const wordHeight = 100 / totalWords; // % offset per step
    let currentIndex = 0;
    let mutableWords = [...words];

    const updateEdgeWidth = () => {
      const centerIndex = (currentIndex + 1) % totalWords;
      const centerWord = mutableWords[centerIndex];
      if (!centerWord) return;
      const centerWordWidth = centerWord.getBoundingClientRect().width;
      const listWidth = list.getBoundingClientRect().width || 1;
      const percentageWidth = (centerWordWidth / listWidth) * 100;
      gsap.to(selector, {
        width: `${percentageWidth}%`,
        duration: 0.5,
        ease: "expo.out",
      });
    };

    const moveWords = () => {
      currentIndex++;
      gsap.to(list, {
        yPercent: -wordHeight * currentIndex,
        duration: 1.2,
        ease: "elastic.out(1, 0.85)",
        onStart: updateEdgeWidth,
        onComplete: () => {
          if (currentIndex >= totalWords - 3) {
            list.appendChild(list.children[0]);
            currentIndex--;
            gsap.set(list, { yPercent: -wordHeight * currentIndex });
            mutableWords.push(mutableWords.shift()!);
          }
        },
      });
    };

    updateEdgeWidth();
    const tl = gsap
      .timeline({ repeat: -1, delay: 1 })
      .call(moveWords)
      .to({}, { duration: 2 })
      .repeat(-1);

    const onResize = () => updateEdgeWidth();
    window.addEventListener("resize", onResize);

    return () => {
      tl.kill();
      window.removeEventListener("resize", onResize);
      gsap.set(list, { clearProps: "transform" });
    };
  }, [lang, b.loopWords]);

  return (
    <section id="benefits" className="py-24 md:py-32 relative overflow-hidden">
      {/* Section ambient decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -bottom-32 right-0 w-[600px] h-[600px] rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle, #d946ef 0%, transparent 65%)" }}
        />
        <div
          className="absolute -top-20 left-0 w-[400px] h-[400px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 65%)" }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-30"
          style={{ background: "linear-gradient(90deg, transparent, #7c3aed, #d946ef, transparent)" }}
        />
      </div>

      <div className="wrap relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <span className="section-label">{b.label}</span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-none">
            {b.headline1}{" "}
            <span className="gradient-text">{b.headline2}</span>
          </h2>
        </motion.div>

        {/* Looping words (Osmo) */}
        <div className="relative mb-16 md:mb-24 select-none">
          <div
            className="relative mx-auto"
            style={{
              height: "2.7em",
              fontSize: "clamp(48px, 11vw, 180px)",
              lineHeight: 0.9,
            }}
          >
            <div className="relative w-full h-full overflow-hidden">
              <ul
                ref={listRef}
                className="m-0 p-0 list-none flex flex-col items-center text-center uppercase whitespace-nowrap font-bold tracking-tighter"
                style={{ willChange: "transform" }}
              >
                {b.loopWords.map((word, i) => (
                  <li key={`${word}-${i}`}>
                    <p
                      className="m-0"
                      style={{
                        color:
                          i % 3 === 0
                            ? "#d946ef"
                            : i % 3 === 1
                            ? "rgba(255,255,255,0.92)"
                            : "#22d3ee",
                      }}
                    >
                      {word}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Top/bottom fade */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, var(--color-bg) 5%, transparent 38%, transparent 62%, var(--color-bg) 95%)",
              }}
            />

            {/* Corner-bracket selector */}
            <div
              ref={selectorRef}
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ width: "30%", height: "0.9em" }}
            >
              <span
                className="absolute top-0 left-0"
                style={{
                  width: "0.125em",
                  height: "0.125em",
                  borderTop: "0.035em solid #d946ef",
                  borderLeft: "0.035em solid #d946ef",
                }}
              />
              <span
                className="absolute top-0 right-0"
                style={{
                  width: "0.125em",
                  height: "0.125em",
                  borderTop: "0.035em solid #d946ef",
                  borderLeft: "0.035em solid #d946ef",
                  transform: "rotate(90deg)",
                }}
              />
              <span
                className="absolute bottom-0 right-0"
                style={{
                  width: "0.125em",
                  height: "0.125em",
                  borderTop: "0.035em solid #22d3ee",
                  borderLeft: "0.035em solid #22d3ee",
                  transform: "rotate(180deg)",
                }}
              />
              <span
                className="absolute bottom-0 left-0"
                style={{
                  width: "0.125em",
                  height: "0.125em",
                  borderTop: "0.035em solid #22d3ee",
                  borderLeft: "0.035em solid #22d3ee",
                  transform: "rotate(270deg)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Cards grid — only on mobile */}
        <div className="md:hidden relative grid grid-cols-1 sm:grid-cols-2 gap-px bg-[rgba(255,255,255,0.05)] rounded-2xl overflow-hidden">
          {b.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            const color = ICON_COLORS[i % ICON_COLORS.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" as const }}
                viewport={{ once: true, margin: "-60px" }}
                className="bg-surface-2 p-7 group cursor-default relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 0% 0%, ${color}18 0%, transparent 60%)`,
                  }}
                />

                <div
                  className="relative w-11 h-11 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${color}22, ${color}0a)`,
                    border: `1px solid ${color}30`,
                  }}
                >
                  <Icon size={22} weight="fill" style={{ color }} />
                </div>

                <h3 className="relative text-base font-semibold text-text mb-2">
                  {item.title}
                </h3>
                <p className="relative text-sm text-muted leading-relaxed">
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
