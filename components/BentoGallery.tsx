"use client";

import {
  GraduationCap,
  Wrench,
  TrendUp,
  UserCircle,
} from "@phosphor-icons/react";
import { useLang } from "@/context/LangContext";

const ICONS = [GraduationCap, Wrench, TrendUp, UserCircle];
const ACCENTS = [
  "linear-gradient(135deg, rgba(217,70,239,0.35), rgba(124,58,237,0.15))",
  "linear-gradient(135deg, rgba(34,211,238,0.32), rgba(34,211,238,0.05))",
  "linear-gradient(135deg, rgba(124,58,237,0.4), rgba(217,70,239,0.12))",
  "linear-gradient(135deg, rgba(34,211,238,0.4), rgba(124,58,237,0.18))",
];
const ICON_COLORS = ["#d946ef", "#22d3ee", "#7c3aed", "#22d3ee"];

export default function BentoGallery() {
  const { t } = useLang();
  const s = t.services;

  return (
    <div className="bento-wrap hidden md:flex md:flex-col">
      <div className="relative w-full px-6 text-center z-10 flex-shrink-0">
        <span className="section-label">{s.label}</span>
        <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-none">
          {s.headline1}{" "}
          <span className="gradient-text">{s.headline2}</span>
        </h2>
      </div>

      <div className="bento-grid">
        {s.items.map((item, i) => {
          const Icon = ICONS[i % ICONS.length];
          const color = ICON_COLORS[i % ICON_COLORS.length];
          return (
            <div
              key={item.num}
              className="bento-item"
              style={{
                background: ACCENTS[i % ACCENTS.length],
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="absolute inset-0 p-[3vw] flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span
                    className="font-mono uppercase tracking-[0.25em]"
                    style={{
                      fontSize: "clamp(11px, 1vw, 16px)",
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    {item.num}
                  </span>
                  <div
                    className="rounded-2xl flex items-center justify-center"
                    style={{
                      width: "3vw",
                      height: "3vw",
                      minWidth: 40,
                      minHeight: 40,
                      background: `linear-gradient(135deg, ${color}28, ${color}0a)`,
                      border: `1px solid ${color}40`,
                    }}
                  >
                    <Icon size={22} weight="fill" style={{ color }} />
                  </div>
                </div>

                <div>
                  <h3
                    className="font-bold leading-tight tracking-tight text-text mb-2"
                    style={{ fontSize: "clamp(15px, 1.55vw, 26px)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="leading-snug"
                    style={{
                      fontSize: "clamp(11px, 0.92vw, 15px)",
                      color: "rgba(255,255,255,0.78)",
                    }}
                  >
                    {item.body}
                  </p>
                  {item.tags && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full"
                          style={{
                            padding: "0.4vw 0.9vw",
                            fontSize: "clamp(10px, 0.8vw, 13px)",
                            background: "rgba(0,0,0,0.3)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "rgba(255,255,255,0.7)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 30% 0%, rgba(255,255,255,0.08), transparent 60%)",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
