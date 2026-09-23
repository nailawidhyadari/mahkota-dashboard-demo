"use client";

import { useState } from "react";
import { leads, tipe, kprContoh, type Lead, type Pesan } from "@/data/mahkota";
import { hargaJuta, rp, cicilan, pct } from "@/lib/fmt";
import { Card, PageHead, SkorBadge, SumberChip, Chip, Icon, Bar, btnPrimary, btnGhost } from "../ui";
import { skorWarna } from "@/data/mahkota";

const filters = [
  { id: "semua", label: "Semua" },
  { id: "panas", label: "Panas" },
  { id: "hangat", label: "Hangat" },
  { id: "dingin", label: "Dingin" },
] as const;

export function Percakapan() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("semua");
  const [aktif, setAktif] = useState<string>(leads[0].id);
  const [detail, setDetail] = useState(false); // mobile: tampilkan chat
  const list = leads.filter((l) => filter === "semua" || l.skor === filter);
  const lead = leads.find((l) => l.id === aktif)!;

  return (
    <>
      <PageHead kicker="Percakapan WhatsApp" title="Semua chat, sudah disaring dan diberi skor">
        AI menjawab dari data resmi proyek, menghitung simulasi cicilan, lalu memberi label panas, hangat, atau dingin agar sales tahu siapa yang dihubungi lebih dulu.
      </PageHead>

      <div className="grid gap-4 xl:grid-cols-[300px_1fr_290px]">
        {/* Daftar lead */}
        <Card className={`!p-0 ${detail ? "hidden xl:block" : ""}`}>
          <div className="flex gap-1 border-b border-line p-3" role="tablist" aria-label="Filter lead">
            {filters.map((f) => {
              const n = f.id === "semua" ? leads.length : leads.filter((l) => l.skor === f.id).length;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={filter === f.id}
                  onClick={() => setFilter(f.id)}
                  className={`flex-1 rounded-lg px-2 py-1.5 text-xs font-semibold ${filter === f.id ? "bg-navy text-white" : "text-ink-2 hover:bg-surface-2"}`}
                >
                  {f.label} <span className="opacity-60">{n}</span>
                </button>
              );
            })}
          </div>
          <ul className="scroll-thin max-h-[640px] divide-y divide-line overflow-y-auto">
            {list.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => { setAktif(l.id); setDetail(true); }}
                  className={`flex w-full gap-3 px-4 py-3 text-left transition-colors ${aktif === l.id ? "bg-gold-soft/60" : "hover:bg-surface-2"}`}
                >
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full text-xs font-bold" style={{ background: skorWarna[l.skor].bg, color: skorWarna[l.skor].fg }}>
                    {l.nama.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-semibold">{l.nama}</span>
                      <span className="num shrink-0 text-[11px] text-ink-3">{l.waktu}</span>
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-ink-2">{l.terakhir}</span>
                    <span className="mt-1.5 flex items-center gap-1.5">
                      <SkorBadge skor={l.skor} />
                      <span className="truncate text-[11px] text-ink-3">{l.tahap}</span>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Card>

        {/* Chat */}
        <div className={`min-w-0 space-y-4 ${detail ? "" : "hidden xl:block xl:space-y-4"}`}>
          <ChatPanel lead={lead} onBack={() => setDetail(false)} />
        </div>

        {/* Profil */}
        <div className={`${detail ? "" : "hidden xl:block"}`}>
          <Profil key={lead.id} lead={lead} />
        </div>
      </div>
    </>
  );
}

function ChatPanel({ lead, onBack }: { lead: Lead; onBack: () => void }) {
  const detikList = lead.pesan.filter((p): p is Extract<Pesan, { detik?: number }> & { detik: number } => "detik" in p && !!p.detik);
  return (
    <Card className="!p-0 overflow-hidden">
      <div className="flex items-center gap-3 border-b border-line bg-surface-2 px-4 py-3">
        <button onClick={onBack} className="-ml-1 rounded-lg p-1.5 text-ink-2 hover:bg-line xl:hidden" aria-label="Kembali ke daftar">
          <Icon name="back" className="size-5" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{lead.nama}</p>
          <p className="truncate text-xs text-ink-3">{lead.kampanye}</p>
        </div>
        <SumberChip sumber={lead.sumber} />
      </div>
      <div className="scroll-thin flex max-h-[720px] min-h-[320px] flex-col gap-3 overflow-y-auto bg-[#efeae0] p-4">
        {lead.pesan.map((p, i) => (
          <Bubble key={i} p={p} />
        ))}
      </div>
      <div className="flex items-center gap-2 border-t border-line px-4 py-3 text-xs text-ink-2">
        <Chip tone="ai">Dijawab AI</Chip>
        {detikList.length > 0 ? (
          <span>Rata-rata balasan {Math.round(detikList.reduce((t, x) => t + x.detik, 0) / detikList.length)} detik pada percakapan ini.</span>
        ) : (
          <span>Percakapan sudah diambil alih sales.</span>
        )}
      </div>
    </Card>
  );
}

function Bubble({ p }: { p: Pesan }) {
  const lead = p.dari === "lead";
  const wrap = lead ? "self-start" : "self-end";
  if ("jenis" in p && p.jenis === "kpr") {
    const t = tipe.find((x) => x.id === p.tipeId)!;
    const pokok = t.hargaJuta - p.dpJuta;
    const cic = cicilan(pokok, kprContoh.bungaTahun, p.tenor);
    return (
      <div className={`${wrap} w-full max-w-[86%] rounded-2xl rounded-br-sm border border-ai/25 bg-white p-3.5 text-sm shadow-sm`}>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-ai">Simulasi cicilan · {t.nama}</p>
        <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-[13px]">
          <dt className="text-ink-3">Harga</dt><dd className="num text-right font-medium">{hargaJuta(t.hargaJuta)}</dd>
          <dt className="text-ink-3">DP ({pct(p.dpJuta / t.hargaJuta)})</dt><dd className="num text-right font-medium">{hargaJuta(p.dpJuta)}</dd>
          <dt className="text-ink-3">Pokok pinjaman</dt><dd className="num text-right font-medium">{hargaJuta(pokok)}</dd>
          <dt className="text-ink-3">Tenor · bunga contoh</dt><dd className="num text-right font-medium">{p.tenor} th · {pct(kprContoh.bungaTahun, 1)}</dd>
        </dl>
        <p className="mt-2 flex items-baseline justify-between border-t border-line pt-2">
          <span className="text-xs text-ink-3">Estimasi cicilan</span>
          <span className="num font-display text-lg font-semibold">{rp(cic)}<span className="text-xs font-normal text-ink-3"> / bln</span></span>
        </p>
        <p className="mt-1 text-right text-[10px] text-ink-3">{p.jam}</p>
      </div>
    );
  }
  if ("jenis" in p && p.jenis === "survei") {
    return (
      <div className={`${wrap} w-full max-w-[86%] rounded-2xl rounded-br-sm border border-gold/40 bg-gold-soft p-3.5 text-sm`}>
        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#7a5a14]"><Icon name="check" className="size-3.5" /> Survei terjadwal</p>
        <p className="mt-1.5 font-semibold">{p.hari}, pukul {p.jam2}</p>
        <p className="text-[13px] text-ink-2">Bersama {p.sales} di kantor pemasaran Mahkota Cileunyi. Pengingat dikirim H-1.</p>
        <p className="mt-1 text-right text-[10px] text-ink-3">{p.jam}</p>
      </div>
    );
  }
  const t = p as Extract<Pesan, { teks: string }>;
  const bg = lead ? "bg-white rounded-bl-sm" : t.dari === "ai" ? "bg-[#d9f0ec] rounded-br-sm" : "bg-[#dfe6f5] rounded-br-sm";
  return (
    <div className={`${wrap} max-w-[86%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${bg}`}>
      {!lead && <p className="mb-0.5 text-[11px] font-semibold text-ai">{t.dari === "ai" ? "AI Sales Agent" : "Sales"}</p>}
      <p>{t.teks}</p>
      <p className="mt-1 text-right text-[10px] text-ink-3">
        {t.jam}
        {t.detik ? ` · dibalas ${t.detik} dtk` : ""}
      </p>
    </div>
  );
}

function Profil({ lead }: { lead: Lead }) {
  const [ringkasan, setRingkasan] = useState(false);
  const t = tipe.find((x) => x.id === lead.tipeId)!;
  const rows: [string, string][] = [
    ["Minat", `${t.nama} · ${hargaJuta(t.hargaJuta)}`],
    ["Anggaran", lead.anggaran],
    ["Tujuan", lead.tujuan],
    ["DP", lead.dp],
    ["Rencana beli", lead.rencana],
  ];
  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-3">Lead scoring</p>
          <SkorBadge skor={lead.skor} />
        </div>
        <p className="num mt-2 font-display text-4xl font-semibold leading-none">{lead.poinSkor}<span className="text-base font-normal text-ink-3"> / 100</span></p>
        <div className="mt-3"><Bar value={lead.poinSkor} max={100} color={skorWarna[lead.skor].fg} /></div>
        <ul className="mt-3 space-y-1.5 text-[13px] text-ink-2">
          {lead.alasan.map((a) => (
            <li key={a} className="flex gap-2"><Icon name="check" className="mt-0.5 size-3.5 shrink-0 text-ai" />{a}</li>
          ))}
        </ul>
      </Card>
      <Card>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-3">Hasil kualifikasi</p>
        <dl className="space-y-2 text-[13px]">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3"><dt className="text-ink-3">{k}</dt><dd className="text-right font-medium">{v}</dd></div>
          ))}
        </dl>
      </Card>
      <Card>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-3">Handover ke sales</p>
        {ringkasan ? (
          <div className="rise rounded-lg bg-surface-2 p-3 text-[13px] leading-relaxed ring-1 ring-inset ring-line">
            {lead.ringkasan}
            <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-ai"><Icon name="check" className="size-3.5" /> Ringkasan dikirim ke sales</p>
          </div>
        ) : (
          <p className="text-[13px] text-ink-2">Sales menerima ringkasan chat, bukan harus membaca ulang seluruh percakapan.</p>
        )}
        <button className={`${ringkasan ? btnGhost : btnPrimary} mt-3 w-full`} onClick={() => setRingkasan((v) => !v)}>
          <Icon name="send" className="size-4" /> {ringkasan ? "Sembunyikan ringkasan" : "Buat ringkasan handover"}
        </button>
      </Card>
    </div>
  );
}
