"use client";

import { useEffect, useState } from "react";

interface PreloaderProps {
  minDuration?: number;
  statuses?: string[];
  finalMessage?: string;
  brandLead?: string;
  brandTrail?: string;
}

export default function Preloader({
  minDuration = 700,
  statuses = ["SIGNAL LOCKING", "SYNCING STREAM", "BROADCAST READY"],
  finalMessage = "GOING LIVE",
  brandLead = "LiveStream",
  brandTrail = "Agency",
}: PreloaderProps) {
  const [hidden, setHidden] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const start = Date.now();

    const begin = () => {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, minDuration - elapsed);
      window.setTimeout(() => {
        setExiting(true);
        // tell rest of the app the hero can start
        document.documentElement.classList.add("preloader-exiting");
        window.setTimeout(() => {
          setHidden(true);
          document.documentElement.classList.add("preloader-done");
          document.documentElement.classList.remove("preloader-exiting");
        }, 400);
      }, wait);
    };

    if (document.readyState === "complete") {
      begin();
    } else {
      window.addEventListener("load", begin, { once: true });
      return () => window.removeEventListener("load", begin);
    }
  }, [minDuration]);

  useEffect(() => {
    if (hidden) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PRELOADER_CSS }} />
      <div
        className={`preloader${exiting ? " preloader--exit" : ""}`}
        role="status"
        aria-live="polite"
        aria-label="Loading"
      >
        <div className="preloader__scanlines" aria-hidden="true" />
        <div className="preloader__vignette" aria-hidden="true" />

        <div className="preloader__core">
          <div className="preloader__rings" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className="preloader__brand">
            <span className="preloader__dot" />
            <span className="preloader__brand-text">
              {brandLead}
              <em>{brandTrail}</em>
            </span>
          </div>

          <div className="preloader__waveform" aria-hidden="true">
            {Array.from({ length: 11 }).map((_, i) => (
              <span key={i} style={{ animationDelay: `${i * 0.07}s` }} />
            ))}
          </div>

          <div className="preloader__status">
            {statuses.map((s, i) => (
              <span
                key={s}
                className="preloader__status-item"
                style={{
                  animationDelay: `${(i * 1) / statuses.length}s`,
                  animationDuration: `${statuses.length}s`,
                }}
              >
                {s}
              </span>
            ))}
            <span className="preloader__status-final">{finalMessage}</span>
          </div>
        </div>
      </div>
    </>
  );
}

const PRELOADER_CSS = `
.preloader {
  --pl-bg: #07070a;
  --pl-accent: #d946ef;
  --pl-accent-2: #22d3ee;
  --pl-live: #ef4444;
  --pl-text: rgba(255,255,255,0.92);
  --pl-muted: rgba(255,255,255,0.45);
  --pl-exit: 0.4s;

  position: fixed;
  inset: 0;
  z-index: 99999;
  background: var(--pl-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  isolation: isolate;
  animation: pl-fade-in 0.2s ease-out both;
}

.preloader::before {
  content: "";
  position: absolute;
  inset: -10%;
  background:
    radial-gradient(ellipse at 30% 20%, rgba(217,70,239,0.18), transparent 55%),
    radial-gradient(ellipse at 70% 80%, rgba(34,211,238,0.14), transparent 55%);
  filter: blur(40px);
  z-index: -2;
}

.preloader__vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%);
  pointer-events: none;
  z-index: -1;
}

.preloader__scanlines {
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    0deg,
    rgba(255,255,255,0.025) 0,
    rgba(255,255,255,0.025) 1px,
    transparent 1px,
    transparent 3px
  );
  pointer-events: none;
  opacity: 0.7;
  animation: pl-scan 6s linear infinite;
  z-index: 0;
}

@keyframes pl-scan {
  from { background-position-y: 0; }
  to   { background-position-y: 60px; }
}

.preloader__core {
  position: relative;
  width: min(420px, 86vw);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  padding: 56px 32px;
  z-index: 1;
}

.preloader__rings {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.preloader__rings span {
  position: absolute;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  border: 1px solid var(--pl-accent);
  opacity: 0;
  animation: pl-ring 2.6s cubic-bezier(0.22, 1, 0.36, 1) infinite;
  box-shadow: 0 0 24px rgba(217,70,239,0.22);
}
.preloader__rings span:nth-child(1) { animation-delay: 0s;   border-color: var(--pl-accent); }
.preloader__rings span:nth-child(2) { animation-delay: 0.6s; border-color: var(--pl-accent-2); }
.preloader__rings span:nth-child(3) { animation-delay: 1.2s; border-color: var(--pl-accent); }

@keyframes pl-ring {
  0%   { transform: scale(0.4); opacity: 0; }
  10%  { opacity: 0.6; }
  100% { transform: scale(3.6); opacity: 0; }
}

.preloader__brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  border-radius: 999px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  position: relative;
  z-index: 2;
  animation: pl-brand-flicker 4s ease-in-out infinite;
}

.preloader__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--pl-live);
  animation: pl-pulse 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  flex-shrink: 0;
}

@keyframes pl-pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(239,68,68,0.55), 0 0 14px rgba(239,68,68,0.7);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 0 9px rgba(239,68,68,0), 0 0 20px rgba(239,68,68,0.9);
    transform: scale(1.08);
  }
}

.preloader__brand-text {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--pl-text);
  white-space: nowrap;
}

.preloader__brand-text em {
  font-style: normal;
  font-weight: 500;
  margin-left: 6px;
  background: linear-gradient(135deg, var(--pl-accent), var(--pl-accent-2));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

@keyframes pl-brand-flicker {
  0%, 95%, 100% { opacity: 1; }
  96%           { opacity: 0.55; }
  97%           { opacity: 1; }
  98%           { opacity: 0.7; }
}

.preloader__waveform {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 32px;
  position: relative;
  z-index: 2;
}

.preloader__waveform span {
  display: block;
  width: 3px;
  height: 8px;
  border-radius: 2px;
  background: linear-gradient(180deg, var(--pl-accent), var(--pl-accent-2));
  transform-origin: center;
  animation: pl-wave 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  box-shadow: 0 0 6px rgba(217,70,239,0.4);
}

@keyframes pl-wave {
  0%, 100% { transform: scaleY(0.45); }
  50%      { transform: scaleY(2.6); }
}

.preloader__status {
  position: relative;
  height: 18px;
  min-width: 200px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 11px;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--pl-muted);
  z-index: 2;
}

.preloader__status-item {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  animation-name: pl-status;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

@keyframes pl-status {
  0%, 30%   { opacity: 1; transform: translateY(0); }
  35%, 100% { opacity: 0; transform: translateY(-4px); }
}

.preloader__status-final {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  letter-spacing: 0.4em;
  background: linear-gradient(135deg, var(--pl-accent), var(--pl-accent-2));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  opacity: 0;
}

.preloader--exit {
  animation: pl-exit var(--pl-exit) cubic-bezier(0.65, 0, 0.35, 1) forwards;
}

.preloader--exit .preloader__core {
  animation: pl-core-exit var(--pl-exit) cubic-bezier(0.65, 0, 0.35, 1) forwards;
}

.preloader--exit .preloader__rings span {
  animation: pl-ring-burst calc(var(--pl-exit) * 0.9) ease-out forwards;
}

.preloader--exit .preloader__status-item {
  animation: pl-fade-out 0.2s ease-out forwards;
}

.preloader--exit .preloader__status-final {
  animation: pl-final 0.55s ease-out forwards;
}

@keyframes pl-exit {
  0%   { opacity: 1; }
  60%  { opacity: 1; }
  100% { opacity: 0; pointer-events: none; visibility: hidden; }
}

@keyframes pl-core-exit {
  0%   { transform: scale(1);    filter: blur(0); }
  50%  { transform: scale(1.04); filter: blur(0); }
  100% { transform: scale(0.94); filter: blur(6px); opacity: 0; }
}

@keyframes pl-ring-burst {
  0%   { transform: scale(1);   opacity: 0.9; border-width: 1px; }
  100% { transform: scale(5.5); opacity: 0;   border-width: 2px; }
}

@keyframes pl-final {
  0%   { opacity: 0; transform: translateY(6px); }
  30%  { opacity: 1; transform: translateY(0); }
  80%  { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes pl-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes pl-fade-out {
  to { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .preloader__rings span,
  .preloader__waveform span,
  .preloader__brand,
  .preloader__scanlines,
  .preloader__status-item {
    animation: none;
  }
  .preloader__rings span { opacity: 0.25; transform: scale(1); }
  .preloader__waveform span { transform: scaleY(1); }
  .preloader__status-item:first-child { opacity: 1; }
  .preloader__dot {
    animation: pl-pulse 2.4s ease-in-out infinite;
  }
  .preloader--exit { animation-duration: 0.4s; }
}
`;
