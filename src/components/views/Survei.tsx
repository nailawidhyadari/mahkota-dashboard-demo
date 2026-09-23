"use client";

import { useState } from "react";
import { survei, sales, hariKalender } from "@/data/mahkota";
import { Card, CardTitle, PageHead, Chip, Icon } from "../ui";

export function Survei() {
  const [filterSales, setFilterSales] = useState<string>("Semua");
  const list = survei.filter((s) => filterSales === "Semua" || s.sales === filterSales);
  const hari = ["Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

  return (
    <>
      <PageHead kicker="Booking survei" title="Calon serius dijadwalkan visit bersama sales">
        Jadwal masuk ke sales, lalu pengingat dikirim otomatis ke calon pembeli. Sales tidak perlu mencatat manual.
      </PageHead>

      <div className="mb-4 flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter sales">
        {["Semua", ...sales].map((n) => (
          <button key={n} role="tab" aria-selected={filterSales === n} onClick={() => setFilterSales(n)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium ${filterSales === n ? "border-navy bg-navy text-white" : "border-line bg-surface text-ink-2 hover:bg-surface-2"}`}>
            {n}
          </button>
        ))}
        <span className="ml-auto text-xs text-ink-3">{list.length} kunjungan minggu ini</span>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardTitle aside="23 – 27 September 2026">Kalender kunjungan</CardTitle>
          <div className="scroll-thin overflow-x-auto">
            <div className="grid min-w-[640px] grid-cols-5 gap-2">
              {hariKalender.map((h, i) => (
                <div key={h.tgl} className="rounded-xl bg-surface-2 p-2 ring-1 ring-inset ring-line">
                  <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-wide text-ink-3">{h.hari} <span className="num text-ink">{h.tgl}</span></p>
                  <div className="space-y-2">
                    {list.filter((s) => s.hari === hari[i]).map((s) => (
                      <div key={s.id} className={`rounded-lg border-l-4 bg-white p-2 text-xs shadow-sm ${s.status === "Terkonfirmasi" ? "border-l-ai" : "border-l-gold"}`}>
                        <p className="num font-semibold">{s.jam}</p>
                        <p className="truncate font-medium">{s.lead.replace(/^(Pak|Bu) /, "")}</p>
                        <p className="truncate text-ink-3">{s.tipe} · {s.sales}</p>
                      </div>
                    ))}
                    {list.filter((s) => s.hari === hari[i]).length === 0 && <p className="py-6 text-center text-[11px] text-ink-3">Tidak ada jadwal</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex gap-4 text-xs text-ink-2">
            <span className="flex items-center gap-1.5"><span className="h-3 w-1 rounded bg-ai" /> Terkonfirmasi</span>
            <span className="flex items-center gap-1.5"><span className="h-3 w-1 rounded bg-gold" /> Menunggu konfirmasi lead</span>
          </div>
        </Card>

        <Card>
          <CardTitle aside="dikirim otomatis">Pengingat</CardTitle>
          <ul className="divide-y divide-line">
            {list.map((s) => (
              <li key={s.id} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold">{s.lead}</p>
                    <p className="num text-xs text-ink-2">{s.hari}, {s.tgl} · {s.jam} · {s.sales}</p>
                  </div>
                  <Chip tone={s.status === "Terkonfirmasi" ? "ai" : "warn"}>{s.status}</Chip>
                </div>
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-ink-3"><Icon name="bolt" className="size-3.5" />{s.pengingat}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
