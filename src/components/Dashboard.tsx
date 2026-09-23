"use client";

import { useState, useEffect, type ReactNode } from "react";
import { Icon, Chip } from "./ui";
import { Ringkasan } from "./views/Ringkasan";
import { Percakapan } from "./views/Percakapan";
import { Iklan } from "./views/Iklan";
import { Survei } from "./views/Survei";
import { Proyek } from "./views/Proyek";
import { KerjaSama } from "./views/KerjaSama";

const nav = [
  { id: "ringkasan", label: "Ringkasan", icon: "home" },
  { id: "percakapan", label: "Percakapan", icon: "chat", badge: "3" },
  { id: "iklan", label: "Iklan", icon: "ads" },
  { id: "survei", label: "Survei", icon: "cal" },
  { id: "proyek", label: "Proyek & KPR", icon: "home2" },
  { id: "kerjasama", label: "Kerja sama & fee", icon: "coin" },
] as const;

type View = (typeof nav)[number]["id"];

export function Dashboard() {
  const [view, setView] = useState<View>("ringkasan");

  useEffect(() => {
    const h = window.location.hash.slice(1) as View;
    if (nav.some((n) => n.id === h)) queueMicrotask(() => setView(h));
  }, []);

  function go(v: View) {
    setView(v);
    window.history.replaceState(null, "", `#${v}`);
    window.scrollTo({ top: 0 });
  }

  const pages: Record<View, ReactNode> = {
    ringkasan: <Ringkasan go={go} />,
    percakapan: <Percakapan />,
    iklan: <Iklan />,
    survei: <Survei />,
    proyek: <Proyek />,
    kerjasama: <KerjaSama />,
  };

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[248px_1fr]">
      {/* Sidebar desktop */}
      <aside className="sticky top-0 hidden h-screen flex-col bg-navy px-4 py-6 text-white lg:flex">
        <Brand />
        <nav className="mt-8 flex flex-1 flex-col gap-1" aria-label="Menu utama">
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              aria-current={view === n.id ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                view === n.id ? "bg-white/12 text-white" : "text-white/65 hover:bg-white/8 hover:text-white"
              }`}
            >
              <Icon name={n.icon} className="size-[18px]" />
              <span className="flex-1">{n.label}</span>
              {"badge" in n && n.badge && (
                <span className="rounded-full bg-gold px-1.5 py-px text-[10px] font-bold text-navy">{n.badge}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="rounded-xl bg-white/8 p-3 text-xs leading-relaxed text-white/70">
          <div className="mb-1 flex items-center gap-2 font-semibold text-white">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Agen aktif 24 jam
          </div>
          WhatsApp resmi terhubung. Balasan pertama rata-rata 22 detik.
        </div>
      </aside>

      <div className="min-w-0">
        {/* Header mobile */}
        <div className="sticky top-0 z-30 bg-navy text-white lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <Brand compact />
            <Chip tone="gold">Prototipe</Chip>
          </div>
          <nav className="scroll-thin flex gap-1 overflow-x-auto px-3 pb-2" aria-label="Menu utama">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                aria-current={view === n.id ? "page" : undefined}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium ${
                  view === n.id ? "bg-white text-navy" : "text-white/70"
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Bar atas desktop */}
        <div className="hidden items-center justify-between border-b border-line bg-surface/70 px-8 py-3 backdrop-blur lg:flex">
          <p className="text-sm text-ink-2">
            Periode <span className="font-semibold text-ink">24 Agu – 23 Sep 2026</span> · 30 hari terakhir
          </p>
          <div className="flex items-center gap-2">
            <Chip tone="gold">Prototipe · data contoh</Chip>
            <span className="text-xs text-ink-3">Disusun PT Cipherion Corp Indonesia</span>
          </div>
        </div>

        <main className="rise mx-auto max-w-[1180px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8" key={view}>
          {pages[view]}
        </main>
      </div>
    </div>
  );
}

function Brand({ compact }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-9 place-items-center rounded-lg bg-gold/95 text-navy">
        <Icon name="crown" className="size-5" />
      </span>
      <div className="leading-tight">
        <p className="font-display text-[15px] font-semibold">Mahkota Cileunyi</p>
        {!compact && <p className="text-[11px] text-white/55">AI Sales Agent</p>}
      </div>
    </div>
  );
}
