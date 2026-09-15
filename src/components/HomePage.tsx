"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowDown,
  Bot,
  Check,
  Menu,
  MessageCircle,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { Accordion } from "@/components/Accordion";
import { Simulator } from "@/components/Simulator";
import {
  CASES,
  FAQS,
  FEATURES,
  LINE_URL,
  NAV,
  PLANS,
  SITE,
  type AgentId,
} from "@/lib/site";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function LineMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.631 0 .348-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.383-.09-.49-.25l-2.424-3.298v2.921c0 .345-.286.629-.631.629-.345 0-.627-.284-.627-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.218 0 .387.09.496.25l2.426 3.296V8.108c0-.345.282-.63.627-.63.349 0 .63.285.63.63v4.771zm-5.741 0c0 .345-.282.629-.631.629-.345 0-.627-.284-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.77.038 1.08l-.164 1.02c-.05.303-.242 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  );
}

export default function HomePage() {
  const [preset, setPreset] = useState<AgentId>("faq");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowCta(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function openSimulator(id: AgentId) {
    setPreset(id);
    setMenuOpen(false);
    setTimeout(() => scrollToId("simulator"), 60);
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="pointer-events-none absolute -left-[20%] top-[-12%] h-[520px] w-[520px] rounded-full bg-sky-600/20 blur-[140px]" />
      <div className="pointer-events-none absolute right-[-18%] top-[18%] h-[460px] w-[460px] rounded-full bg-violet-600/20 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-[8%] left-[10%] h-[360px] w-[360px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-violet-600 shadow-[0_0_24px_rgba(56,189,248,0.35)]">
              <Bot className="h-4 w-4 text-white" />
            </span>
            <span>
              <span className="block font-display text-sm font-black tracking-[0.18em] text-white">
                {SITE.name}
              </span>
              <span className="block text-[10px] uppercase tracking-[0.22em] text-slate-400">
                {SITE.shortName}
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-slate-300 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-line px-4 py-2 text-sm font-bold text-white transition hover:bg-line-hover"
            >
              <LineMark className="h-4 w-4" />
              無料相談
            </a>
          </nav>

          <div className="flex items-center gap-3 lg:hidden">
            <span className="hidden items-center gap-1.5 text-[11px] text-slate-400 sm:inline-flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              24/365
            </span>
            <button
              type="button"
              aria-label="メニュー"
              onClick={() => setMenuOpen((value) => !value)}
              className="rounded-xl border border-white/10 bg-white/5 p-2"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-navy/95 px-4 py-4 backdrop-blur-xl lg:hidden">
            <div className="flex flex-col gap-2">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm text-slate-200 hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-line px-4 py-3 text-sm font-bold text-white"
              >
                <LineMark className="h-4 w-4" />
                LINEで無料相談する
              </a>
            </div>
          </div>
        )}
      </header>

      <main id="top" className="relative z-10 mx-auto max-w-6xl px-4 pb-40 sm:px-6">
        <section className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:py-20">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-sky-200 backdrop-blur-xl sm:text-xs">
                <Sparkles className="h-3.5 w-3.5 text-sky-300" />
                AIエージェント自動化・次世代Dify構築
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-medium text-emerald-300 sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                自動受付可能 24/365
              </span>
            </div>
            <h1 className="font-display text-[1.7rem] font-extrabold leading-[1.25] tracking-tight text-white sm:text-[2.35rem] lg:text-[2.75rem] lg:leading-[1.25]">
              <span className="block">問い合わせ対応、</span>
              <span className="mt-1 inline-block whitespace-nowrap bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                AIにまかせませんか？
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-slate-300 sm:text-lg">
              24時間365日、即時応答。
              <br className="sm:hidden" />
              手作業の返信業務を
              <span className="mx-0.5 inline-block whitespace-nowrap font-extrabold text-cyan-300">
                「ほぼゼロ」
              </span>
              にするAIエージェント構築。
            </p>
            <div className="mt-8 flex max-w-md flex-col gap-3">
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-line text-base font-bold text-white shadow-[0_12px_32px_rgba(6,199,85,0.28)] transition hover:bg-line-hover"
              >
                <LineMark className="h-5 w-5" />
                LINEで無料相談する
              </a>
              <p className="text-center text-[11px] text-slate-500 sm:text-xs">
                ※ AI導入の可否も含めて無料で相談できます。
              </p>
            </div>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => scrollToId("simulator")}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-sky-100 backdrop-blur-md transition hover:border-white/20 hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4" />
                AIエージェントをその場で試す
              </button>
              <button
                type="button"
                onClick={() => scrollToId("features")}
                className="inline-flex items-center gap-1.5 px-2 py-2 text-sm text-slate-400 transition hover:text-white"
              >
                <ArrowDown className="h-4 w-4 animate-bounce text-sky-400" />
                AIでできることを見る
              </button>
            </div>
          </div>

          <div className="animate-float hidden lg:block">
            <div className="glow-border rounded-[28px]">
              <div className="rounded-[28px] bg-navy/80 p-5 backdrop-blur-xl">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-xs font-semibold tracking-[0.2em] text-slate-400">
                    AGENT CONSOLE
                  </p>
                  <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                    ONLINE
                  </span>
                </div>
                <div className="space-y-3 rounded-2xl border border-white/10 bg-black/30 p-4">
                  <div className="max-w-[90%] rounded-2xl rounded-tl-none border border-white/10 bg-white/5 px-3 py-2 text-xs leading-relaxed text-slate-200">
                    こんにちは。Matcha BakehouseのAIです。営業時間やメニューをすぐにお答えできます。
                  </div>
                  <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-none bg-sky-600 px-3 py-2 text-xs text-white">
                    水曜日は空いていますか？
                  </div>
                  <div className="max-w-[92%] rounded-2xl rounded-tl-none border border-white/10 bg-white/5 px-3 py-2 text-xs leading-relaxed text-slate-200">
                    毎週水曜日は定休日です。営業は11:00〜19:00、水曜以外はご来店いただけます。
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px] text-slate-400">
                  <div className="rounded-xl border border-white/10 bg-white/5 py-3">
                    <p className="font-mono text-sky-300">24/365</p>
                    自動応答
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 py-3">
                    <p className="font-mono text-violet-300">RAG</p>
                    ナレッジ学習
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 py-3">
                    <p className="font-mono text-cyan-300">LINE</p>
                    公式連携
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="scroll-mt-24 border-t border-white/10 py-16 sm:py-20">
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              AIでできること
            </h2>
            <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-2.5 py-0.5 text-xs text-sky-300">
              提供機能
            </span>
          </div>
          <p className="mb-8 max-w-2xl text-sm text-slate-400 sm:text-base">
            よくあるルーティン・定型業務をAIエージェントが代わりにこなします。
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {FEATURES.map((feature) => (
              <article
                key={feature.id}
                className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 sm:p-6"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-500/10 text-xl">
                      {feature.emoji}
                    </span>
                    <span className="rounded-md border border-sky-400/20 bg-sky-500/10 px-2.5 py-1 text-[10px] font-semibold text-sky-200">
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">{feature.title}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-slate-400">
                    {feature.desc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openSimulator(feature.id)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-slate-200 transition group-hover:border-sky-400/40 group-hover:text-sky-100"
                >
                  インタラクティブAIを試す
                </button>
              </article>
            ))}
          </div>
        </section>

        <Simulator selectedPreset={preset} onSelectPreset={setPreset} />

        <section id="cases" className="scroll-mt-24 border-t border-white/10 py-16 sm:py-20">
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">導入事例</h2>
            <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-2.5 py-0.5 text-xs text-violet-300">
              実績
            </span>
          </div>
          <p className="mb-8 text-sm text-slate-400 sm:text-base">
            AIエージェントの導入によって、劇的に業務パフォーマンスが改善された事例です。
          </p>
          <div className="grid gap-5 lg:grid-cols-2">
            {CASES.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-5 py-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-sky-300">
                    {item.category}
                  </span>
                  <span className="rounded-md border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
                    {item.impact}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="mb-4 text-lg font-bold text-white">
                    <span className="mr-2 text-violet-300">#{item.id}</span>
                    {item.title}
                  </h3>
                  <div className="space-y-3">
                    <div className="rounded-2xl border border-red-400/15 bg-red-500/5 p-4">
                      <p className="mb-1 text-[11px] font-bold text-red-300">BEFORE</p>
                      <p className="text-sm leading-relaxed text-slate-400">{item.before}</p>
                    </div>
                    <div className="rounded-2xl border border-emerald-400/15 bg-emerald-500/5 p-4">
                      <p className="mb-1 text-[11px] font-bold text-emerald-300">AFTER</p>
                      <p className="text-sm leading-relaxed text-slate-100">{item.after}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="pricing" className="scroll-mt-24 border-t border-white/10 py-16 sm:py-20">
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">料金プラン</h2>
            <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-2.5 py-0.5 text-xs text-sky-300">
              目安価格
            </span>
          </div>
          <p className="mb-8 text-sm text-slate-400 sm:text-base">
            企業の規模や、自動化したい業務フローの複雑さに応じた柔軟なプラン。
          </p>
          <div className="grid gap-5 lg:grid-cols-2">
            {PLANS.map((plan) => (
              <article
                key={plan.id}
                className={`relative flex flex-col rounded-3xl border p-5 backdrop-blur-xl sm:p-6 ${
                  plan.recommended
                    ? "border-sky-400/40 bg-sky-500/10 shadow-[0_16px_60px_rgba(56,189,248,0.16)]"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {plan.recommended && (
                  <span className="absolute right-5 top-0 -translate-y-1/2 rounded-md bg-gradient-to-r from-sky-500 to-violet-500 px-2.5 py-1 text-[10px] font-bold text-white">
                    一番人気 / LINE連携対応
                  </span>
                )}
                <div className="mb-4 flex items-end justify-between gap-3">
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                  <p className="font-display text-2xl font-extrabold text-sky-200">
                    {plan.price}
                  </p>
                </div>
                <p className="mb-5 border-b border-white/10 pb-4 text-xs text-slate-400">
                  要件のカスタマイズももちろん可能です
                </p>
                <ul className="mb-6 space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-300">
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          plan.recommended ? "text-sky-300" : "text-slate-400"
                        }`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => openSimulator(plan.preset)}
                  className={`mt-auto w-full rounded-xl py-3 text-sm font-bold transition ${
                    plan.recommended
                      ? "bg-gradient-to-r from-sky-500 to-blue-700 text-white hover:brightness-110"
                      : "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                  }`}
                >
                  このプランベースでAIシミュレーションする
                </button>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="mb-4 font-display text-xl font-bold text-white">よくある質問</h3>
            <Accordion items={FAQS} />
          </div>
        </section>

        <section id="profile" className="scroll-mt-24 border-t border-white/10 py-16 sm:py-20">
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">開発者紹介</h2>
            <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-2.5 py-0.5 text-xs text-violet-300">
              構築家
            </span>
          </div>
          <p className="mb-8 text-sm text-slate-400 sm:text-base">
            「設計 × デザイン × AI自動化」でお客様に最適な仕組みを丁寧に提供します。
          </p>
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:flex-row md:items-start">
            <div className="relative shrink-0">
              <div className="h-24 w-24 overflow-hidden rounded-full border border-sky-400/30 bg-slate-900 shadow-xl sm:h-28 sm:w-28">
                <Image
                  src="/profile.png"
                  alt="横堀 勝則"
                  width={112}
                  height={112}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-slate-900 bg-lime-400" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white">横堀 勝則</h3>
              <p className="mt-2 inline-flex rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1 text-xs font-bold tracking-wide text-sky-200">
                AIエージェント構築家 / Aidea Lab
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300">
                ブランド設計とWeb制作を軸に、「AI × デザイン ×
                自動化」で企業の業務を最適化。主に
                <strong className="text-white"> Dify</strong>・
                <strong className="text-white">LINE連携</strong>・
                <strong className="text-white">高度RAG</strong>・
                <strong className="text-white">Make自動化</strong>
                を自在に組み合わせ、“AIが自律的に働く仕組み”を一気通貫で構築しています。お客様の課題をじっくりヒアリングして、無駄なツールコストを最小化しながら最速で開発します。
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 border-t border-white/10 py-16 text-center sm:py-20">
          <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              LINEで相談する
            </h2>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-xs text-emerald-300">
              QR窓口
            </span>
          </div>
          <p className="mb-8 text-sm text-slate-400">
            QRコードをタップ、または読み込むとLINE友だち追加ページが開きます。
          </p>
          <div className="mx-auto flex max-w-sm flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-300">
              <LineMark className="h-3.5 w-3.5 text-line" />
              Synergy AI Lab 公式LINE
            </span>
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="block">
              <Image
                src="/line-qr.png"
                alt="LINE QRコード"
                width={176}
                height={176}
                className="rounded-2xl border border-white/10 bg-slate-900 p-2"
              />
            </a>
            <p className="text-[11px] text-slate-500">AI導入のご検討は無料でお答えします。</p>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-line py-3 text-sm font-semibold text-white transition hover:bg-line-hover"
            >
              友だち追加して繋がる
              <Zap className="h-4 w-4" />
            </a>
          </div>
        </section>

        <footer className="border-t border-white/10 py-10 text-center text-[11px] text-slate-500">
          <p>© 2026 Synergy AI Lab. All Rights Reserved.</p>
          <p className="mx-auto mt-2 max-w-lg leading-relaxed">
            Dify、Make、各社LLMを組み合わせた高精度AIエージェントのコンサルティングから開発、LINE公式連携設定までトータルでご支援します。
          </p>
        </footer>
      </main>

      {showCta && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink/90 px-4 py-3 shadow-[0_-12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="mx-auto max-w-md">
            <p className="mb-1.5 text-center text-[10px] text-slate-400 sm:text-[11px]">
              AI導入の可否も含めて、無料でお見積もり・ご相談いただけます。
            </p>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-line text-sm font-bold text-white shadow-[0_8px_24px_rgba(6,199,85,0.28)] transition hover:bg-line-hover"
            >
              <LineMark className="h-5 w-5" />
              LINEで無料相談する
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
