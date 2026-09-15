import { Noto_Sans_JP, Outfit, JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const noto = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Synergy AI Lab | 問い合わせ対応、AIにまかせませんか？",
  description:
    "24時間365日、即時応答。手作業の返信業務を「ほぼゼロ」にするAIエージェント構築。",
  keywords: [
    "AIエージェント",
    "Dify",
    "LINE連携",
    "RAG",
    "業務自動化",
    "Synergy AI Lab",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${noto.variable} ${outfit.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-slate-100">{children}</body>
    </html>
  );
}
