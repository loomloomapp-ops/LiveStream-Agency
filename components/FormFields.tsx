"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowRight } from "@phosphor-icons/react";
import { useLang } from "@/context/LangContext";

interface FormState {
  name: string;
  age: string;
  city: string;
  gender: string;
  contact: string;
  check18: boolean;
  privacy: boolean;
}

interface FormErrors {
  name?: string;
  age?: string;
  city?: string;
  gender?: string;
  contact?: string;
  check18?: string;
  privacy?: string;
}

interface Props {
  onSuccess?: () => void;
  compact?: boolean;
}

export default function FormFields({ onSuccess, compact = false }: Props) {
  const { t } = useLang();
  const f = t.form;

  const [form, setForm] = useState<FormState>({
    name: "",
    age: "",
    city: "",
    gender: "",
    contact: "",
    check18: false,
    privacy: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (key: keyof FormState, value: string | boolean) =>
    setForm((p) => ({ ...p, [key]: value }));

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = f.errors.name;
    if (!form.age || parseInt(form.age) < 18) e.age = f.errors.age;
    if (!form.city.trim()) e.city = f.errors.city;
    if (!form.gender) e.gender = f.errors.gender;
    if (!form.contact.trim()) e.contact = f.errors.contact;
    if (!form.check18) e.check18 = f.errors.check18;
    if (!form.privacy) e.privacy = f.errors.privacy;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSuccess(true);
    if (onSuccess) setTimeout(onSuccess, 3000);
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center justify-center py-10 text-center gap-4"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)" }}
        >
          <CheckCircle size={32} weight="fill" style={{ color: "#4ade80" }} />
        </div>
        <h3 className="text-2xl font-bold text-text">{f.successTitle}</h3>
        <p className="text-muted leading-relaxed max-w-sm">{f.successBody}</p>
      </motion.div>
    );
  }

  const gap = compact ? "gap-3" : "gap-4";
  const inputClass = (field: keyof FormErrors) =>
    `field-input ${errors[field] ? "error" : ""}`;

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col ${gap}`} noValidate>
      {/* Name + Age */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted">{f.name}</label>
          <input
            type="text"
            className={inputClass("name")}
            placeholder={f.namePlaceholder}
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
          {errors.name && (
            <span className="text-xs" style={{ color: "#f87171" }}>{errors.name}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted">{f.age}</label>
          <input
            type="number"
            min={18}
            max={99}
            className={inputClass("age")}
            placeholder={f.agePlaceholder}
            value={form.age}
            onChange={(e) => set("age", e.target.value)}
          />
          {errors.age && (
            <span className="text-xs" style={{ color: "#f87171" }}>{errors.age}</span>
          )}
        </div>
      </div>

      {/* City + Gender */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted">{f.city}</label>
          <input
            type="text"
            className={inputClass("city")}
            placeholder={f.cityPlaceholder}
            value={form.city}
            onChange={(e) => set("city", e.target.value)}
          />
          {errors.city && (
            <span className="text-xs" style={{ color: "#f87171" }}>{errors.city}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted">{f.gender}</label>
          <select
            className={`${inputClass("gender")} field-input`}
            value={form.gender}
            onChange={(e) => set("gender", e.target.value)}
          >
            <option value="">{f.genderDefault}</option>
            {f.genderOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.gender && (
            <span className="text-xs" style={{ color: "#f87171" }}>{errors.gender}</span>
          )}
        </div>
      </div>

      {/* Contact */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-muted">{f.contact}</label>
        <input
          type="text"
          className={inputClass("contact")}
          placeholder={f.contactPlaceholder}
          value={form.contact}
          onChange={(e) => set("contact", e.target.value)}
        />
        {errors.contact && (
          <span className="text-xs" style={{ color: "#f87171" }}>{errors.contact}</span>
        )}
      </div>

      {/* Checkboxes */}
      <div className="flex flex-col gap-3 pt-1">
        <label className="field-check">
          <input
            type="checkbox"
            checked={form.check18}
            onChange={(e) => set("check18", e.target.checked)}
          />
          <span className="text-sm text-muted leading-snug">
            {f.check18}{" "}
            <span className="badge inline-flex align-middle ml-1 py-0.5 px-2 text-[10px]">18+</span>
          </span>
        </label>
        {errors.check18 && (
          <span className="text-xs pl-7" style={{ color: "#f87171" }}>{errors.check18}</span>
        )}

        <label className="field-check">
          <input
            type="checkbox"
            checked={form.privacy}
            onChange={(e) => set("privacy", e.target.checked)}
          />
          <span className="text-sm text-muted leading-snug">
            {f.checkPrivacy}
            <a href="#" className="underline hover:text-accent transition-colors ml-0.5" style={{ color: "#d946ef" }}>
              {f.privacyLink}
            </a>
          </span>
        </label>
        {errors.privacy && (
          <span className="text-xs pl-7" style={{ color: "#f87171" }}>{errors.privacy}</span>
        )}
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={submitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="btn-primary w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <span
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin flex-shrink-0"
              style={{ animation: "spin 0.8s linear infinite" }}
            />
            {f.submitting}
          </>
        ) : (
          <>
            {f.submit}
            <ArrowRight size={16} weight="bold" />
          </>
        )}
      </motion.button>
    </form>
  );
}
