import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/context/LangContext";
import { ModalProvider } from "@/context/ModalContext";
import Preloader from "@/components/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LiveStream Agency — Streaming Agency | Work From Home",
  description:
    "Professional streaming agency. We launch streaming careers — training, support, monetisation. 18+ only. Remote work from home.",
  keywords: ["streaming agency", "work from home", "streamer", "онлайн заробіток", "стрімінг"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}>
      <body className="bg-bg text-text">
        <Preloader />
        <LangProvider>
          <ModalProvider>{children}</ModalProvider>
        </LangProvider>
      </body>
    </html>
  );
}
