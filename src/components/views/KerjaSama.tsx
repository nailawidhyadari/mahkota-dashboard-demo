"use client";

import { useState } from "react";
import { tipe, closingList, investasi, paket, jadwal } from "@/data/mahkota";
import { totalNilaiClosing, totalFee, feeTerkonfirmasi, nilaiClosing } from "@/data/stats";
import { hargaJuta, juta1 } from "@/lib/fmt";
import { Card, CardTitle, PageHead, Chip, SumberChip, Bar, Icon, Kpi } from "../ui";

export function KerjaSama() {
  const [jumlah, setJumlah] = useState<Record<string, number>>({ t55: 0, c: 0, b: 0, a: 0 });
  const simFee = tipe.reduce((t, x) => t + x.hargaJuta * 0.07 * jumlah[x.id], 0);
  const totalInv = investasi.reduce((t, x) => t + x.juta, 0);

  return (
    <>
      <PageHead kicker="Kerja sama dan fee" title="Modal Rp50 juta ditambah fee 7% per closing">
        Sumber lead tercatat di dashboard dan closing dikonfirmasi bersama, sehingga fee hanya muncul saat ada penjualan.
      </PageHead>

      <div className="grid gap-3 sm:grid-cols-3">
        <Kpi label="Biaya pembuatan sistem" value="Rp50 jt" sub="Dibayar bertahap sesuai progres pekerjaan." />
        <Kpi label="Fee dari closing bulan ini" value={juta1(totalFee)} tone="gold" sub={`${juta1(feeTerkonfirmasi)} sudah dikonfirmasi bersama, sisanya menunggu.`} target="7% dari nilai transaksi" />
        <Kpi label="Nilai transaksi" value={hargaJuta(totalNilaiClosing)} sub={`${closingList.length} unit dari lead iklan dan AI Sales Agent.`} />
      </div>

      <Card className="mt-4">
        <CardTitle aside="dikonfirmasi bersama">Catatan closing dan fee</CardTitle>
        <div className="scroll-thin overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-[13px]">
            <thead>
              <tr className="border-b border-line text-[11px] uppercase tracking-wide text-ink-3">
                <th className="py-2 pr-3 font-semibold">Pembeli</th>
                <th className="px-2 py-2 font-semibold">Sumber lead</th>
                <th className="px-2 py-2 font-semibold">Tipe</th>
                <th className="px-2 py-2 text-right font-semibold">Nilai</th>
                <th className="px-2 py-2 text-right font-semibold">Fee 7%</th>
                <th className="pl-2 py-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {closingList.map((c) => {
                const t = tipe.find((x) => x.id === c.tipeId)!;
                return (
                  <tr key={c.id}>
                    <td className="py-3 pr-3"><p className="font-medium">{c.lead}</p><p className="text-[11px] text-ink-3">{c.tanggal} · {c.kampanye}</p></td>
                    <td className="px-2"><SumberChip sumber={c.sumber} /></td>
                    <td className="px-2">{t.nama}</td>
                    <td className="num px-2 text-right">{hargaJuta(t.hargaJuta)}</td>
                    <td className="num px-2 text-right font-semibold">{juta1(nilaiClosing(c.tipeId) * 0.07)}</td>
                    <td className="pl-2"><Chip tone={c.status === "Dikonfirmasi bersama" ? "ai" : "warn"}>{c.status}</Chip></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-ink-3">Definisi closing (mis. akad atau DP terkonfirmasi), masa atribusi lead, dan jadwal pembayaran fee dituangkan dalam perjanjian kerja sama.</p>
      </Card>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardTitle aside="ilustrasi dari harga listing">Simulasi fee</CardTitle>
          <ul className="divide-y divide-line">
            {tipe.map((x) => (
              <li key={x.id} className="flex items-center gap-3 py-2.5 text-sm">
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{x.nama}</p>
                  <p className="num text-xs text-ink-3">{hargaJuta(x.hargaJuta)} → fee {juta1(x.hargaJuta * 0.07)}</p>
                </div>
                <div className="flex items-center gap-1" role="group" aria-label={`Jumlah unit ${x.nama}`}>
                  <button className="grid size-8 place-items-center rounded-lg border border-line text-lg leading-none hover:bg-surface-2 disabled:opacity-40" disabled={jumlah[x.id] === 0} onClick={() => setJumlah((j) => ({ ...j, [x.id]: j[x.id] - 1 }))} aria-label="Kurangi">−</button>
                  <span className="num w-7 text-center font-semibold">{jumlah[x.id]}</span>
                  <button className="grid size-8 place-items-center rounded-lg border border-line text-lg leading-none hover:bg-surface-2" onClick={() => setJumlah((j) => ({ ...j, [x.id]: j[x.id] + 1 }))} aria-label="Tambah">+</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-baseline justify-between rounded-xl bg-gold-soft px-4 py-3">
            <span className="text-sm font-semibold text-[#7a5a14]">Fee dari unit terjual</span>
            <span className="num font-display text-2xl font-semibold text-[#7a5a14]">{juta1(simFee)}</span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-ink-3">Tanpa closing dari AI, tidak ada fee tambahan di luar biaya pembuatan dan paket bulanan.</p>
        </Card>

        <Card>
          <CardTitle aside={`Total Rp${totalInv} jt`}>Rincian biaya pembuatan</CardTitle>
          <ul className="space-y-3">
            {investasi.map((x) => (
              <li key={x.nama}>
                <div className="mb-1 flex justify-between gap-3 text-[13px]"><span>{x.nama}</span><span className="num font-semibold">Rp{x.juta} jt</span></div>
                <Bar value={x.juta} max={15} color="var(--gold)" />
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-ink-3">Rincian bersifat usulan awal dan dapat disesuaikan saat discovery. Biaya iklan Meta dan Google, WhatsApp API, dan server bulanan dibahas terpisah.</p>
        </Card>
      </div>

      <div className="mt-4">
        <h2 className="mb-3 font-display text-[17px] font-semibold">Tiga pilihan paket bulanan</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {paket.map((p) => (
            <div key={p.nama} className={`relative rounded-2xl border p-5 ${p.rekomendasi ? "border-navy bg-navy text-white" : "border-line bg-surface"}`}>
              {p.rekomendasi && <span className="absolute -top-2.5 right-4 rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy">Direkomendasikan</span>}
              <p className="font-display text-lg font-semibold">{p.nama}</p>
              <p className="num mt-1 font-display text-3xl font-semibold">{p.harga}<span className={`text-sm font-normal ${p.rekomendasi ? "text-white/60" : "text-ink-3"}`}> per bulan</span></p>
              <ul className="mt-4 space-y-2 text-[13px]">
                {p.fitur.map((f) => <li key={f} className="flex gap-2"><Icon name="check" className={`mt-0.5 size-4 shrink-0 ${p.rekomendasi ? "text-gold" : "text-ai"}`} />{f}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-ink-3">Semua paket: pembuatan sistem Rp50 juta dan fee 7% per closing. Biaya iklan dibayar developer langsung ke Meta dan Google; biaya WhatsApp API sesuai tagihan nyata.</p>
      </div>

      <Card className="mt-4">
        <CardTitle aside="lima minggu sampai agen aktif">Jadwal implementasi</CardTitle>
        <ol className="grid gap-3 sm:grid-cols-4">
          {jadwal.map((j, i) => (
            <li key={j.minggu} className="rounded-xl bg-surface-2 p-4 ring-1 ring-inset ring-line">
              <p className="font-mono text-[11px] text-gold">{j.minggu}</p>
              <p className="mt-1 font-display text-base font-semibold">{j.judul}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-2">{j.isi}</p>
              {i === jadwal.length - 1 && <div className="mt-2"><Chip tone="ai">Agen aktif</Chip></div>}
            </li>
          ))}
        </ol>
      </Card>
    </>
  );
}
