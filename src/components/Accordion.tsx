"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Item = { q: string; a: string };

export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div
            key={item.q}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
            >
              <span className="text-sm font-semibold text-white sm:text-base">
                {item.q}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-sky-300 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-4 pb-4 text-sm leading-relaxed text-slate-300 sm:px-5">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
