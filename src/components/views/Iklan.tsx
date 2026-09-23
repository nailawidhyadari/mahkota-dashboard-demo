"use client";

import { useState } from "react";
import { meta, google, langsung, type Kampanye } from "@/data/mahkota";
import { totalMeta, totalGoogle, total, cpClosing } from "@/data/stats";
import { rp, num, pct } from "@/lib/fmt";
import { Card, CardTitle, PageHead, Chip, Bar, Icon, btnPrimary, btnGhost } from "../ui";

export function Iklan() {
  const [diterapkan, setDiterapkan] = useState(false);

  return (
    <>
      <PageHead kicker="Iklan lintas kanal" title="Meta Ads dan Google Ads dikelola satu otak">
        Data closing dikembalikan ke iklan, sehingga anggaran bergeser ke kampanye yang menghasilkan lead serius, bukan sekadar klik murah.
      </PageHead>

      <div className="grid gap-3 sm:grid-cols-3">
        <ChannelCard nama="Meta Ads" catatan="Facebook dan Instagram · Click-to-WhatsApp" warna="var(--meta)" t={totalMeta} />
        <ChannelCard nama="Google Ads" catatan="Pencarian · klik ke WhatsApp dan formulir" warna="var(--google)" t={totalGoogle} />
        <Card className="!p-4">
          <p className="text-sm font-semibold">Biaya per closing</p>
          <p className="num mt-2 font-display text-[28px] font-semibold leading-none">{rp(cpClosing)}</p>
          <p className="mt-2 text-xs leading-snug text-ink-2">Total belanja iklan {rp(total.belanja)} dibagi {total.closing} closing. Belanja iklan dibayar developer langsung ke Meta dan Google.</p>
          <p className="mt-3 border-t border-line pt-2 text-[11px] font-medium uppercase tracking-wide text-ink-3">Termasuk lead WhatsApp langsung: {langsung.lead}</p>
        </Card>
      </div>

      <Card className="mt-4">
        <CardTitle aside="bukan hanya klik murah">Kualitas lead per kampanye</CardTitle>
        <p className="mb-4 -mt-2 max-w-2xl text-sm leading-relaxed text-ink-2">
          Kampanye video termurah per lead, tetapi hanya {pct(meta[3].serius / meta[3].lead)} yang menjadi lead serius. Kampanye Blok C lebih mahal per lead, namun {pct(meta[1].serius / meta[1].lead)} serius dan menghasilkan closing.
        </p>
        <KampanyeTabel judul="Meta Ads" data={meta} warna="var(--meta)" />
        <div className="h-5" />
        <KampanyeTabel judul="Google Ads" data={google} warna="var(--google)" />
      </Card>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <CardTitle aside={<Chip tone="ai">Saran AI</Chip>}>Pergeseran anggaran berdasarkan data closing</CardTitle>
          <div className="space-y-4">
            <Geser nama="Video 15 dtk · Akses Unpad/ITB" dari={meta[3].belanja} ke={diterapkan ? meta[3].belanja * 0.5 : meta[3].belanja} />
            <Geser nama="CTWA · Blok C · Pekerja Jatinangor" dari={meta[1].belanja} ke={diterapkan ? meta[1].belanja + 0.6 * 0.5 * meta[3].belanja : meta[1].belanja} naik={diterapkan} />
            <Geser nama="Google · perumahan dekat unpad" dari={google[1].belanja} ke={diterapkan ? google[1].belanja + 0.4 * 0.5 * meta[3].belanja : google[1].belanja} naik={diterapkan} />
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-ink-2">
            Kampanye video menghabiskan {rp(meta[3].belanja)} untuk {meta[3].survei} survei. Separuh anggarannya dialihkan ke kampanye yang menghasilkan survei dan closing.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <button className={diterapkan ? btnGhost : btnPrimary} onClick={() => setDiterapkan((v) => !v)}>
              {diterapkan ? "Batalkan pergeseran" : "Terapkan saran"}
            </button>
            {diterapkan && <span className="rise inline-flex items-center gap-1 text-xs font-semibold text-ai"><Icon name="check" className="size-4" /> Diterapkan ke Meta dan Google</span>}
          </div>
        </Card>

        <Card>
          <CardTitle>Yang dikerjakan di tiap kanal</CardTitle>
          <div className="space-y-4 text-sm leading-relaxed text-ink-2">
            <div>
              <p className="mb-1 flex items-center gap-2 font-semibold text-ink"><span className="size-2.5 rounded-sm bg-meta" />Meta Ads</p>
              Audiens sekitar Bandung Timur, kreatif dan copy bervariasi, iklan Click-to-WhatsApp, laporan biaya per lead.
            </div>
            <div>
              <p className="mb-1 flex items-center gap-2 font-semibold text-ink"><span className="size-2.5 rounded-sm bg-google" />Google Ads</p>
              Pencarian rumah di Bandung Timur dan Cileunyi, kata kunci dan copy iklan, pelacakan klik ke WhatsApp dan formulir.
            </div>
            <div>
              <p className="mb-1 flex items-center gap-2 font-semibold text-ink"><span className="size-2.5 rounded-sm bg-wa" />WhatsApp langsung</p>
              {langsung.lead} lead datang dari tautan di papan proyek dan brosur, dicatat sebagai sumber sendiri.
            </div>
          </div>
        </Card>
      </div>
      <p className="mt-6 text-xs text-ink-3">Belanja iklan dan seluruh angka kampanye adalah data contoh.</p>
    </>
  );
}

function ChannelCard({ nama, catatan, warna, t }: { nama: string; catatan: string; warna: string; t: { belanja: number; lead: number; serius: number; survei: number; closing: number } }) {
  return (
    <Card className="!p-4">
      <div className="flex items-center gap-2"><span className="size-2.5 rounded-sm" style={{ background: warna }} /><p className="text-sm font-semibold">{nama}</p></div>
      <p className="text-[11px] text-ink-3">{catatan}</p>
      <p className="num mt-3 font-display text-[28px] font-semibold leading-none">{rp(t.belanja / t.lead)}<span className="text-xs font-normal text-ink-3"> / lead</span></p>
      <dl className="mt-3 grid grid-cols-3 gap-2 border-t border-line pt-2 text-center">
        <div><dt className="text-[10px] uppercase tracking-wide text-ink-3">Lead</dt><dd className="num text-sm font-semibold">{num(t.lead)}</dd></div>
        <div><dt className="text-[10px] uppercase tracking-wide text-ink-3">Survei</dt><dd className="num text-sm font-semibold">{t.survei}</dd></div>
        <div><dt className="text-[10px] uppercase tracking-wide text-ink-3">Closing</dt><dd className="num text-sm font-semibold">{t.closing}</dd></div>
      </dl>
    </Card>
  );
}

function KampanyeTabel({ judul, data, warna }: { judul: string; data: Kampanye[]; warna: string }) {
  return (
    <div>
      <p className="mb-2 flex items-center gap-2 text-sm font-semibold"><span className="size-2.5 rounded-sm" style={{ background: warna }} />{judul}</p>
      <div className="scroll-thin overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-[13px]">
          <thead>
            <tr className="border-b border-line text-[11px] uppercase tracking-wide text-ink-3">
              <th className="py-2 pr-3 font-semibold">Kampanye</th>
              <th className="px-2 py-2 text-right font-semibold">Belanja</th>
              <th className="px-2 py-2 text-right font-semibold">Lead</th>
              <th className="px-2 py-2 text-right font-semibold">Per lead</th>
              <th className="w-32 px-2 py-2 font-semibold">Lead serius</th>
              <th className="px-2 py-2 text-right font-semibold">Survei</th>
              <th className="pl-2 py-2 text-right font-semibold">Closing</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {data.map((k) => (
              <tr key={k.nama}>
                <td className="py-2.5 pr-3"><p className="font-medium">{k.nama}</p><p className="text-[11px] text-ink-3">{k.target}</p></td>
                <td className="num px-2 text-right">{rp(k.belanja)}</td>
                <td className="num px-2 text-right">{k.lead}</td>
                <td className="num px-2 text-right">{rp(k.belanja / k.lead)}</td>
                <td className="px-2">
                  <div className="flex items-center gap-2"><Bar value={k.serius} max={k.lead} color={warna} /><span className="num w-9 text-right text-xs">{pct(k.serius / k.lead)}</span></div>
                </td>
                <td className="num px-2 text-right">{k.survei}</td>
                <td className="num pl-2 text-right font-semibold">{k.closing}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Geser({ nama, dari, ke, naik }: { nama: string; dari: number; ke: number; naik?: boolean }) {
  const berubah = Math.round(ke) !== Math.round(dari);
  return (
    <div>
      <div className="mb-1 flex justify-between gap-3 text-[13px]">
        <span className="font-medium">{nama}</span>
        <span className={`num ${berubah ? (naik ? "text-ai" : "text-[#b42318]") : "text-ink-2"} font-semibold`}>
          {rp(ke)}{berubah && ` (${naik ? "+" : "−"}${rp(Math.abs(ke - dari))})`}
        </span>
      </div>
      <Bar value={ke} max={8_000_000} color={berubah ? (naik ? "var(--ai)" : "#c9483a") : "var(--navy)"} />
    </div>
  );
}
