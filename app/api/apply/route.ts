import { NextResponse } from "next/server";

export const runtime = "nodejs";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

interface ApplyPayload {
  name?: string;
  age?: string;
  city?: string;
  gender?: string;
  contact?: string;
}

const GENDER_LABELS: Record<string, string> = {
  female: "Жінка / Female",
  male: "Чоловік / Male",
  other: "Інше / Other",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("Telegram credentials are not configured");
    return NextResponse.json(
      { ok: false, error: "Service not configured" },
      { status: 500 }
    );
  }

  let data: ApplyPayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  const name = (data.name ?? "").trim();
  const age = (data.age ?? "").trim();
  const city = (data.city ?? "").trim();
  const contact = (data.contact ?? "").trim();
  const gender = (data.gender ?? "").trim();

  if (!name || !age || !city || !contact || !gender) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }

  const genderLabel = GENDER_LABELS[gender] ?? gender;

  const text = [
    "🎬 <b>Нова заявка з сайту</b>",
    "",
    `👤 <b>Ім'я:</b> ${escapeHtml(name)}`,
    `🎂 <b>Вік:</b> ${escapeHtml(age)}`,
    `🏙 <b>Місто:</b> ${escapeHtml(city)}`,
    `⚧ <b>Стать:</b> ${escapeHtml(genderLabel)}`,
    `📨 <b>Контакт:</b> ${escapeHtml(contact)}`,
  ].join("\n");

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      }
    );

    if (!res.ok) {
      const detail = await res.text();
      console.error("Telegram API error:", detail);
      return NextResponse.json(
        { ok: false, error: "Failed to deliver" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Telegram request failed:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to deliver" },
      { status: 502 }
    );
  }
}
