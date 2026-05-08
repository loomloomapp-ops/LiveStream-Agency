"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import { TelegramLogo, InstagramLogo, YoutubeLogo, TiktokLogo } from "@phosphor-icons/react";

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;

  return (
    <footer className="bg-surface border-t border-[rgba(255,255,255,0.06)] pt-16 pb-8">
      <div className="wrap">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="live-dot" />
              <span className="font-bold text-xl tracking-tight text-text">LiveStream Agency</span>
            </div>
            <p className="text-sm text-muted leading-relaxed">{f.tagline}</p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted mb-4">{f.navTitle}</p>
            <ul className="flex flex-col gap-2.5">
              {f.navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-text transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted mb-4">{f.contactsTitle}</p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href={`mailto:${f.email}`}
                  className="text-sm text-muted hover:text-text transition-colors"
                >
                  {f.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://t.me/${f.telegram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted hover:text-text transition-colors"
                >
                  {f.telegram}
                </a>
              </li>
            </ul>

            <p className="text-xs font-bold uppercase tracking-widest text-muted mb-4 mt-6">{f.socialsTitle}</p>
            <div className="flex gap-3">
              {[
                { Icon: TelegramLogo, href: "#" },
                { Icon: InstagramLogo, href: "#" },
                { Icon: TiktokLogo, href: "#" },
                { Icon: YoutubeLogo, href: "#" },
              ].map(({ Icon, href }) => (
                <a
                  key={href + Icon.name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-muted hover:text-text transition-all hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted mb-4">{f.docsTitle}</p>
            <ul className="flex flex-col gap-2.5">
              {f.docs.map((doc) => (
                <li key={doc.label}>
                  <a
                    href={doc.href}
                    className="text-sm text-muted hover:text-text transition-colors"
                  >
                    {doc.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-[rgba(255,255,255,0.06)] pt-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <p className="text-xs text-muted">{f.copy}</p>
          <div
            className="px-3 py-1.5 rounded-lg"
            style={{ background: "rgba(248,113,113,0.06)", border: "1px solid rgba(248,113,113,0.15)" }}
          >
            <p className="text-xs leading-relaxed max-w-sm" style={{ color: "#fca5a5" }}>
              {f.age}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
