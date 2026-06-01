"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "@phosphor-icons/react";
import { useLang } from "@/context/LangContext";

interface Section {
  title: string;
  body?: string;
  items?: string[];
}

interface PolicyContent {
  back: string;
  title: string;
  intro: string;
  sections: Section[];
}

const CONTENT: Record<"ua" | "en", PolicyContent> = {
  ua: {
    back: "На головну",
    title: "Політика конфіденційності",
    intro:
      "Ця Політика конфіденційності описує, як сайт https://noir-media.net обробляє персональні дані користувачів.",
    sections: [
      {
        title: "1. Які дані ми збираємо",
        body: "На сайті користувач може залишити заявку. Для цього ми можемо збирати такі дані:",
        items: ["ім'я", "номер телефону"],
      },
      {
        title: "",
        body: "Інші персональні дані ми не збираємо.",
      },
      {
        title: "2. Для чого ми використовуємо дані",
        body: "Ми використовуємо надані дані лише для того, щоб:",
        items: [
          "зв'язатися з користувачем",
          "уточнити деталі заявки",
          "надати інформацію щодо наших послуг",
        ],
      },
      {
        title: "3. Як користувач надає дані",
        body: "Користувач самостійно залишає свої дані через форму заявки на сайті https://noir-media.net. Надсилаючи заявку, користувач підтверджує, що добровільно надає свої персональні дані та погоджується з цією Політикою конфіденційності.",
      },
      {
        title: "4. Передача даних третім особам",
        body: "Ми не продаємо, не передаємо та не розповсюджуємо персональні дані користувачів третім особам, крім випадків, передбачених законом.",
      },
      {
        title: "5. Зберігання даних",
        body: "Ми зберігаємо персональні дані лише протягом часу, необхідного для обробки заявки та зв'язку з користувачем.",
      },
      {
        title: "6. Захист даних",
        body: "Ми вживаємо розумних заходів для захисту персональних даних від втрати, несанкціонованого доступу або розголошення.",
      },
      {
        title: "7. Права користувача",
        body: "Користувач має право звернутися до нас, щоб:",
        items: [
          "дізнатися, які його дані ми зберігаємо",
          "попросити виправити або видалити свої дані",
          "відкликати згоду на обробку даних",
        ],
      },
      {
        title: "8. Контакти",
        body: "З усіх питань щодо обробки персональних даних користувач може звернутися через контактні дані, вказані на сайті https://noir-media.net.",
      },
      {
        title: "9. Зміни до Політики",
        body: "Ми можемо час від часу оновлювати цю Політику конфіденційності. Актуальна версія завжди розміщується на сайті https://noir-media.net.",
      },
    ],
  },
  en: {
    back: "Back to home",
    title: "Privacy Policy",
    intro:
      "This Privacy Policy explains how the website https://noir-media.net processes users' personal data.",
    sections: [
      {
        title: "1. What data we collect",
        body: "On the website, users may submit a request form. For this purpose, we may collect the following data:",
        items: ["name", "phone number"],
      },
      {
        title: "",
        body: "We do not collect any other personal data through the request form.",
      },
      {
        title: "2. How we use the data",
        body: "We use the provided data only to:",
        items: [
          "contact the user",
          "clarify the details of the request",
          "provide information about our services",
        ],
      },
      {
        title: "3. How users provide data",
        body: "Users voluntarily provide their data by submitting a request form on https://noir-media.net. By submitting the form, the user confirms that they voluntarily provide their personal data and agree to this Privacy Policy.",
      },
      {
        title: "4. Sharing data with third parties",
        body: "We do not sell, transfer, or distribute users' personal data to third parties, except where required by law.",
      },
      {
        title: "5. Data storage",
        body: "We store personal data only for as long as necessary to process the request and contact the user.",
      },
      {
        title: "6. Data protection",
        body: "We take reasonable measures to protect personal data from loss, unauthorized access, or disclosure.",
      },
      {
        title: "7. User rights",
        body: "The user has the right to contact us to:",
        items: [
          "find out what data we store about them",
          "request correction or deletion of their data",
          "withdraw consent to the processing of their data",
        ],
      },
      {
        title: "8. Contacts",
        body: "For any questions regarding the processing of personal data, users may contact us using the contact details provided on https://noir-media.net.",
      },
      {
        title: "9. Changes to this Privacy Policy",
        body: "We may update this Privacy Policy from time to time. The current version is always available on https://noir-media.net.",
      },
    ],
  },
};

export default function PrivacyPage() {
  const { lang } = useLang();
  const c = CONTENT[lang];

  return (
    <main className="min-h-screen bg-bg py-20 md:py-28">
      <div className="wrap max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-text transition-colors mb-10"
        >
          <ArrowLeft size={16} weight="bold" />
          {c.back}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-5">
            <span className="gradient-text">{c.title}</span>
          </h1>
          <p className="text-muted leading-relaxed mb-12">{c.intro}</p>

          <div className="flex flex-col gap-8">
            {c.sections.map((s, i) => (
              <section key={i}>
                {s.title && (
                  <h2 className="text-lg md:text-xl font-bold text-text mb-2.5">
                    {s.title}
                  </h2>
                )}
                {s.body && (
                  <p className="text-muted leading-relaxed">{s.body}</p>
                )}
                {s.items && (
                  <ul className="mt-3 flex flex-col gap-2 pl-1">
                    {s.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-muted leading-relaxed"
                      >
                        <span
                          className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: "#d946ef" }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
