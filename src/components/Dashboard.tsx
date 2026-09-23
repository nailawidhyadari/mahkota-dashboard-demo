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
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const h = window.location.hash.slice(1) as View;
    if (nav.some((n) => n.id === h)) queueMicrotask(() => setView(h));
  }, []);

  useEffect(() => {
    if (!menu) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    const wide = () => window.innerWidth >= 1024 && setMenu(false);
    window.addEventListener("keydown", esc);
    window.addEventListener("resize", wide);
    return () => {
      window.removeEventListener("keydown", esc);
      window.removeEventListener("resize", wide);
    };
  }, [menu]);

  function go(v: View) {
    setView(v);
    setMenu(false);
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
        {/* Header mobile & tablet: menu hamburger di kanan atas */}
        <div className="sticky top-0 z-30 bg-navy text-white lg:hidden">
          <div className="flex items-center gap-3 px-4 py-3">
            <Brand compact />
            <div className="ml-auto flex items-center gap-2">
              <Chip tone="gold">Prototipe</Chip>
              <button
                onClick={() => setMenu((m) => !m)}
                aria-expanded={menu}
                aria-controls="menu-mobile"
                aria-label={menu ? "Tutup menu" : "Buka menu"}
                className="grid size-10 place-items-center rounded-lg bg-white/10 hover:bg-white/15"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  {menu ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
                </svg>
              </button>
            </div>
          </div>
          {menu && (
            <nav id="menu-mobile" className="rise absolute inset-x-0 top-full border-t border-white/10 bg-navy px-3 pb-4 pt-2 shadow-xl" aria-label="Menu utama">
              {nav.map((n) => (
                <button
                  key={n.id}
                  onClick={() => go(n.id)}
                  aria-current={view === n.id ? "page" : undefined}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-[15px] font-medium ${
                    view === n.id ? "bg-white/12 text-white" : "text-white/70 hover:bg-white/8"
                  }`}
                >
                  <Icon name={n.icon} className="size-5" />
                  <span className="flex-1">{n.label}</span>
                  {"badge" in n && n.badge && (
                    <span className="rounded-full bg-gold px-1.5 py-px text-[10px] font-bold text-navy">{n.badge}</span>
                  )}
                </button>
              ))}
            </nav>
          )}
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
