"use client";

import { useState } from "react";
import { tipe, proyek, kprContoh } from "@/data/mahkota";
import { hargaJuta, rp, cicilan, pct } from "@/lib/fmt";
import { Card, CardTitle, PageHead, Chip, Icon } from "../ui";

export function Proyek() {
  const [tipeId, setTipeId] = useState<(typeof tipe)[number]["id"]>("c");
  const [dpPersen, setDpPersen] = useState(15);
  const [tenor, setTenor] = useState(20);
  const t = tipe.find((x) => x.id === tipeId)!;
  const dp = (t.hargaJuta * dpPersen) / 100;
  const pokok = t.hargaJuta - dp;
  const cic = cicilan(pokok, kprContoh.bungaTahun, tenor);

  return (
    <>
      <PageHead kicker="Knowledge base proyek" title="Empat tipe, satu agen yang hafal semuanya">
        Jawaban AI berdasar data resmi tipe, harga, promo, dan fasilitas. Ubah datanya di sini, agen langsung memakai versi terbaru.
      </PageHead>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardTitle aside="Sumber: Rumah123 (harga listing, dapat berubah)">Tipe rumah dan harga</CardTitle>
          <div className="scroll-thin overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-[11px] uppercase tracking-wide text-ink-3">
                  <th className="py-2 pr-3 font-semibold">Tipe</th>
                  <th className="px-2 py-2 text-right font-semibold">Harga mulai</th>
                  <th className="px-2 py-2 text-right font-semibold">Luas tanah</th>
                  <th className="pl-2 py-2 text-right font-semibold">Luas bangunan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {tipe.map((x) => (
                  <tr key={x.id}>
                    <td className="py-3 pr-3 font-medium">{x.nama}</td>
                    <td className="num px-2 text-right font-semibold">{hargaJuta(x.hargaJuta)}</td>
                    <td className="num px-2 text-right">{x.lt} m²</td>
                    <td className="num pl-2 text-right">{x.lb} m²</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-surface-2 p-3 ring-1 ring-inset ring-line">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-3">Fasilitas</p>
              <ul className="mt-1.5 flex flex-wrap gap-1.5">{proyek.fasilitas.map((f) => <li key={f}><Chip>{f}</Chip></li>)}</ul>
            </div>
            <div className="rounded-xl bg-surface-2 p-3 ring-1 ring-inset ring-line">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-3">Promo</p>
              <p className="mt-1.5 text-[13px] text-ink-2">Belum diisi. Promo resmi dimasukkan saat discovery agar AI tidak menjanjikan hal yang salah.</p>
            </div>
          </div>
        </Card>

        <Card>
          <CardTitle>Tentang proyek</CardTitle>
          <dl className="space-y-3 text-sm">
            <Row k="Pengembang" v={proyek.pengembang} />
            <Row k="Lokasi" v={proyek.lokasi} />
            <Row k="Status" v={proyek.status} />
            <Row k="Rentang harga" v={proyek.rentang} />
          </dl>
          <p className="mb-2 mt-4 text-[11px] font-semibold uppercase tracking-wide text-ink-3">Akses dekat</p>
          <ul className="space-y-1.5 text-sm">
            {proyek.akses.map((a) => (
              <li key={a.tempat} className="flex justify-between"><span>{a.tempat}</span><span className="num text-ink-2">± {a.menit} menit</span></li>
            ))}
            <li className="flex justify-between"><span>Kereta cepat</span><span className="text-ink-2">jalur di sekitar</span></li>
          </ul>
        </Card>
      </div>

      <Card className="mt-4">
        <CardTitle aside={<Chip tone="ai">Dipakai AI di WhatsApp</Chip>}>Simulasi KPR</CardTitle>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-5">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-ink-3" htmlFor="tipe">Tipe</label>
              <select id="tipe" value={tipeId} onChange={(e) => setTipeId(e.target.value as typeof tipeId)} className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm">
                {tipe.map((x) => <option key={x.id} value={x.id}>{x.nama} · {hargaJuta(x.hargaJuta)}</option>)}
              </select>
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold uppercase tracking-wide text-ink-3"><label htmlFor="dp">Uang muka (DP)</label><span className="num normal-case text-ink">{dpPersen}% · {hargaJuta(dp)}</span></div>
              <input id="dp" type="range" min={5} max={50} step={5} value={dpPersen} onChange={(e) => setDpPersen(+e.target.value)} className="mt-2 w-full accent-[var(--navy)]" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold uppercase tracking-wide text-ink-3"><label htmlFor="tenor">Tenor</label><span className="num normal-case text-ink">{tenor} tahun</span></div>
              <input id="tenor" type="range" min={5} max={25} step={5} value={tenor} onChange={(e) => setTenor(+e.target.value)} className="mt-2 w-full accent-[var(--navy)]" />
            </div>
          </div>
          <div className="rounded-2xl bg-navy p-5 text-white">
            <p className="text-xs text-white/60">Estimasi cicilan per bulan</p>
            <p className="num mt-1 font-display text-4xl font-semibold leading-none">{rp(cic)}</p>
            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-white/60">Harga</dt><dd className="num">{hargaJuta(t.hargaJuta)}</dd></div>
              <div className="flex justify-between"><dt className="text-white/60">Pokok pinjaman</dt><dd className="num">{hargaJuta(pokok)}</dd></div>
              <div className="flex justify-between"><dt className="text-white/60">Bunga (contoh, tetap)</dt><dd className="num">{pct(kprContoh.bungaTahun, 1)} / tahun</dd></div>
            </dl>
            <p className="mt-4 flex gap-2 text-xs leading-relaxed text-white/60"><Icon name="clock" className="mt-0.5 size-4 shrink-0" />Bunga di atas hanya contoh. Skema resmi mengikuti yang disetujui developer dan diisi saat discovery.</p>
          </div>
        </div>
      </Card>
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return <div><dt className="text-[11px] font-semibold uppercase tracking-wide text-ink-3">{k}</dt><dd className="mt-0.5">{v}</dd></div>;
}
