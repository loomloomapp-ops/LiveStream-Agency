"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { type Lang, translations } from "@/lib/translations";

type AnyTranslations = (typeof translations)["ua"] | (typeof translations)["en"];

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: AnyTranslations;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ua");
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
