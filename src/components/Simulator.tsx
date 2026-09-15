"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bot,
  BookOpen,
  RotateCcw,
  Send,
  Sparkles,
  User,
  Wifi,
} from "lucide-react";
import {
  AGENT_PRESETS,
  type AgentId,
} from "@/lib/site";
import {
  resetMessage,
  simulateReply,
  welcomeMessage,
} from "@/lib/simulate";

type ChatMessage = {
  id: string;
  role: "user" | "model";
  text: string;
};

export function Simulator({
  selectedPreset,
  onSelectPreset,
}: {
  selectedPreset: AgentId;
  onSelectPreset: (id: AgentId) => void;
}) {
  const preset =
    AGENT_PRESETS.find((item) => item.id === selectedPreset) ?? AGENT_PRESETS[0];
  const [companyName, setCompanyName] = useState(preset.companyName);
  const [knowledge, setKnowledge] = useState(preset.profile);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [knowledgeOpen, setKnowledgeOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: welcomeMessage(preset.companyName),
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const next =
      AGENT_PRESETS.find((item) => item.id === selectedPreset) ?? AGENT_PRESETS[0];
    setCompanyName(next.companyName);
    setKnowledge(next.profile);
    setMessages([
      {
        id: "welcome",
        role: "model",
        text: welcomeMessage(next.companyName),
      },
    ]);
    setInput("");
  }, [selectedPreset]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, busy]);

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || busy) return;

    setMessages((current) => [
      ...current,
      { id: `u-${Date.now()}`, role: "user", text: content },
    ]);
    setInput("");
    setBusy(true);

    const delay = 650 + Math.floor(Math.random() * 500);
    await new Promise((resolve) => setTimeout(resolve, delay));

    const reply = simulateReply({
      message: content,
      companyName,
      knowledge,
      agentType: selectedPreset,
    });

    setMessages((current) => [
      ...current,
      { id: `b-${Date.now()}`, role: "model", text: reply },
    ]);
    setBusy(false);
  }

  function resetKnowledge() {
    setCompanyName(preset.companyName);
    setKnowledge(preset.profile);
    setMessages([
      {
        id: "reset",
        role: "model",
        text: resetMessage(preset.companyName),
      },
    ]);
  }

  return (
    <section id="simulator" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mb-8 flex flex-col gap-3 sm:mb-10">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            AIエージェント実機デモ
          </h2>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            LIVE SIMULATOR
          </span>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          作りたいAIエージェントを選択し、ナレッジを自由に書き換えて、その場の会話精度をお試しください。
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-2 md:grid-cols-4">
        {AGENT_PRESETS.map((item) => {
          const active = item.id === selectedPreset;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectPreset(item.id)}
              className={`rounded-2xl border px-3 py-3 text-left text-xs font-semibold transition sm:text-sm ${
                active
                  ? "border-sky-400/60 bg-sky-500/15 text-sky-100 shadow-[0_0_24px_rgba(56,189,248,0.18)]"
                  : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {item.tabLabel}
            </button>
          );
        })}
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-12">
        <div className="order-2 glow-border rounded-3xl lg:order-1 lg:col-span-5">
          <div className="rounded-3xl bg-navy/80 p-4 backdrop-blur-xl sm:p-5">
            <button
              type="button"
              className="mb-4 flex w-full items-center justify-between gap-3 lg:pointer-events-none"
              onClick={() => setKnowledgeOpen((value) => !value)}
            >
              <span className="inline-flex items-center gap-2 text-sm font-bold text-white">
                <BookOpen className="h-4 w-4 text-sky-300" />
                AI学習ナレッジ定義
              </span>
              <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-slate-400 lg:hidden">
                {knowledgeOpen ? "閉じる" : "編集する"}
              </span>
            </button>

            <div className={`${knowledgeOpen ? "block" : "hidden"} lg:block`}>
              <div className="mb-4 flex justify-end">
                <button
                  type="button"
                  onClick={resetKnowledge}
                  className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-400 transition hover:text-sky-200"
                >
                  <RotateCcw className="h-3 w-3" />
                  リセット
                </button>
              </div>

              <label className="mb-1.5 block text-[11px] font-semibold text-slate-400">
                会社名 / 店舗名 / チーム名
              </label>
              <input
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
                placeholder="例: 株式会社Synergyマニュファクチャ"
                className="mb-4 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-400/50 focus:ring-1 focus:ring-sky-500"
              />

              <label className="mb-1.5 block text-[11px] font-semibold text-slate-400">
                学習用マニュアル・FAQテキスト
              </label>
              <textarea
                rows={10}
                value={knowledge}
                onChange={(event) => setKnowledge(event.target.value)}
                placeholder="AIに学習させたい資料やルールを自由に記入してください。"
                className="mb-3 w-full resize-y rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm leading-relaxed text-slate-200 outline-none placeholder:text-slate-500 focus:border-sky-400/50 focus:ring-1 focus:ring-sky-500"
              />
              <p className="text-[11px] leading-relaxed text-slate-500">
                カスタマイズ方法:
                上記のテキストを書き換えると、AIエージェントが直ちにその最新データを覚えて回答します。
              </p>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-7">
          <div className="mx-auto flex min-h-[520px] w-full max-w-md flex-col overflow-hidden rounded-[32px] border-[5px] border-slate-700/80 bg-[#0c0e14] shadow-[0_24px_80px_rgba(56,189,248,0.12)]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-sky-500/20 text-sky-300">
                  <Bot className="h-4 w-4" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0c0e14] bg-emerald-400" />
                </div>
                <div>
                  <p className="max-w-[160px] truncate text-xs font-bold text-white">
                    {companyName || "AIアシスタント"}
                  </p>
                  <p className="text-[10px] font-semibold text-emerald-400">
                    Synergy AI Lab Agent Active
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-slate-400">
                <Wifi className="h-3 w-3 text-sky-300" />
                Simulated Room
              </span>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto bg-[#08090d] p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex max-w-[88%] gap-2 ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                        message.role === "user" ? "bg-slate-700" : "bg-sky-600"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="h-3.5 w-3.5 text-slate-200" />
                      ) : (
                        <Bot className="h-3.5 w-3.5 text-white" />
                      )}
                    </div>
                    <div
                      className={`whitespace-pre-wrap rounded-2xl px-3 py-2.5 text-[12px] leading-relaxed ${
                        message.role === "user"
                          ? "rounded-tr-none border border-sky-400/20 bg-sky-600 text-white"
                          : "rounded-tl-none border border-white/10 bg-white/5 text-slate-200"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                </div>
              ))}
              {busy && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-600">
                      <Sparkles className="h-3.5 w-3.5 animate-pulse text-white" />
                    </div>
                    <div className="flex gap-1 rounded-2xl rounded-tl-none border border-white/10 bg-white/5 px-3 py-3">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-400" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-400 [animation-delay:150ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-400 [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="flex gap-2 overflow-x-auto border-t border-white/10 bg-[#0a0c12] px-3 py-2">
              <span className="shrink-0 self-center text-[10px] font-semibold text-slate-500">
                お試し入力:
              </span>
              <button
                type="button"
                disabled={busy}
                onClick={() => send(preset.sampleMessage)}
                className="max-w-[240px] truncate rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-sky-200 transition hover:bg-white/10 disabled:opacity-50"
              >
                {preset.sampleMessage}
              </button>
            </div>

            <form
              className="flex gap-2 border-t border-white/10 bg-[#0c0e14] p-3"
              onSubmit={(event) => {
                event.preventDefault();
                void send();
              }}
            >
              <input
                value={input}
                disabled={busy}
                onChange={(event) => setInput(event.target.value)}
                placeholder="質問を入力してください..."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:ring-1 focus:ring-sky-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white transition hover:bg-sky-500 disabled:opacity-40"
                aria-label="送信"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

          <p className="mt-4 text-center text-xs text-slate-400">
            このような高度な対話システムを最短で構築します。
          </p>
          <div className="mt-3 flex justify-center">
            <a
              href="https://lin.ee/WJnMncF"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-line px-6 py-3 text-xs font-bold text-white shadow-[0_8px_24px_rgba(6,199,85,0.28)] transition hover:bg-line-hover"
            >
              LINEで本開発の無料見積を相談する
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
