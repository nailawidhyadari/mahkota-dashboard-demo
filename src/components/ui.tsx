import type { ReactNode } from "react";
import { skorWarna, type Skor } from "@/data/mahkota";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-line bg-surface p-5 shadow-[0_1px_0_rgba(20,33,61,0.03)] ${className}`}>
      {children}
    </section>
  );
}

export function CardTitle({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
      <h2 className="font-display text-[17px] font-semibold leading-tight tracking-tight">{children}</h2>
      {aside && <div className="text-xs text-ink-3">{aside}</div>}
    </div>
  );
}

export function PageHead({ kicker, title, children }: { kicker: string; title: string; children?: ReactNode }) {
  return (
    <header className="mb-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">{kicker}</p>
      <h1 className="mt-1 font-display text-[26px] font-semibold leading-tight tracking-tight sm:text-[30px]">{title}</h1>
      {children && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-2">{children}</p>}
    </header>
  );
}

export function Kpi({
  label,
  value,
  sub,
  target,
  tone = "ink",
}: {
  label: string;
  value: string;
  sub?: string;
  target?: string;
  tone?: "ink" | "ai" | "gold";
}) {
  const color = tone === "ai" ? "text-ai" : tone === "gold" ? "text-gold" : "text-ink";
  return (
    <Card className="!p-4">
      <p className="text-xs font-medium text-ink-3">{label}</p>
      <p className={`num mt-2 font-display text-[28px] font-semibold leading-none tracking-tight ${color}`}>{value}</p>
      {sub && <p className="mt-2 text-xs leading-snug text-ink-2">{sub}</p>}
      {target && (
        <p className="mt-3 border-t border-line pt-2 text-[11px] font-medium uppercase tracking-wide text-ink-3">{target}</p>
      )}
    </Card>
  );
}

export function SkorBadge({ skor }: { skor: Skor }) {
  const s = skorWarna[skor];
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold"
      style={{ color: s.fg, background: s.bg }}
    >
      <span className="size-1.5 rounded-full" style={{ background: s.fg }} />
      {s.label}
    </span>
  );
}

export function Chip({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "ai" | "gold" | "meta" | "google" | "wa" | "warn" }) {
  const map = {
    neutral: "bg-surface-2 text-ink-2 border-line",
    ai: "bg-ai-soft text-ai border-transparent",
    gold: "bg-gold-soft text-[#7a5a14] border-transparent",
    meta: "bg-[#e3ecfd] text-meta border-transparent",
    google: "bg-[#fdf0dc] text-[#a35a05] border-transparent",
    wa: "bg-[#dcf3e5] text-[#177a42] border-transparent",
    warn: "bg-[#fbf0d4] text-[#9a6700] border-transparent",
  } as const;
  return (
    <span className={`inline-flex items-center whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-semibold ${map[tone]}`}>
      {children}
    </span>
  );
}

export function SumberChip({ sumber }: { sumber: string }) {
  const tone = sumber === "Meta Ads" ? "meta" : sumber === "Google Ads" ? "google" : "wa";
  return <Chip tone={tone}>{sumber}</Chip>;
}

export function Bar({ value, max, color = "var(--navy)" }: { value: number; max: number; color?: string }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2 ring-1 ring-inset ring-line">
      <div className="h-full rounded-full" style={{ width: `${Math.max(2, (value / max) * 100)}%`, background: color }} />
    </div>
  );
}

export const btn =
  "inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors disabled:opacity-50";
export const btnPrimary = `${btn} bg-navy text-white hover:bg-navy-2`;
export const btnGhost = `${btn} border border-line bg-surface text-ink hover:bg-surface-2`;

export function Icon({ name, className = "size-5" }: { name: string; className?: string }) {
  const p: Record<string, ReactNode> = {
    home: <path d="M3 11.5 12 4l9 7.5M5.5 10v9.5h13V10" />,
    chat: <path d="M4 5h16v11H9l-5 4z" />,
    ads: <path d="M4 14V10l12-5v14L4 14Zm0 0 2 6h3l-1.5-5M19 9v6" />,
    cal: <path d="M4 7h16v13H4zM4 11h16M8 3v4M16 3v4" />,
    home2: <path d="M4 20V9l8-5 8 5v11M9 20v-6h6v6" />,
    coin: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4v10M9 9.5c0-1 1.3-1.5 3-1.5s3 .6 3 1.7c0 2.3-6 1.1-6 3.6 0 1.1 1.3 1.7 3 1.7s3-.6 3-1.5" />,
    back: <path d="M15 5l-7 7 7 7" />,
    check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
    bolt: <path d="M13 3 5 13h6l-1 8 8-10h-6z" />,
    clock: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4.5V12l3 2" />,
    send: <path d="M4 12 20 4l-4 16-4-7z" />,
    crown: <path d="M4 18 5.5 8l4.5 4 2-6 2 6 4.5-4L20 18zM4 20.5h16" />,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {p[name]}
    </svg>
  );
}
