"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type Lang, translations } from "@/lib/translations";

type AnyTranslations = (typeof translations)["ua"] | (typeof translations)["en"];

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: AnyTranslations;
}

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ua");

  // Restore the saved language so it persists across page navigations.
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "ua" || stored === "en") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore storage errors (e.g. private mode)
    }
  };

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
