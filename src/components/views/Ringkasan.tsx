import { Card, CardTitle, Kpi, PageHead, SkorBadge, SumberChip, Icon, btnGhost } from "../ui";
import { leads, trenLead, chatPerJam, followUp, iklanTayang, hadirSurvei, closingList } from "@/data/mahkota";
import { total, cpl, cpSurvei, totalMeta, totalGoogle } from "@/data/stats";
import { langsung } from "@/data/mahkota";
import { num, rp, pct } from "@/lib/fmt";

export function Ringkasan({ go }: { go: (v: "percakapan" | "iklan" | "survei" | "kerjasama") => void }) {
  const langkah = [
    { n: "01", judul: "Iklan tayang", angka: num(iklanTayang), ket: "tayangan Meta + Google" },
    { n: "02", judul: "Lead masuk", angka: num(total.lead), ket: "ke WhatsApp" },
    { n: "03", judul: "AI menjawab", angka: num(total.lead), ket: `${num(total.serius)} lead serius` },
    { n: "04", judul: "Jadwal survei", angka: num(total.survei), ket: `${hadirSurvei} sudah hadir` },
    { n: "05", judul: "Handover & closing", angka: num(total.closing), ket: "closing dari lead AI" },
  ];
  const panas = leads.filter((l) => l.skor === "panas" && l.tahap !== "Closing");
  const maxTren = Math.max(...trenLead.map((d) => d.meta + d.google + d.wa));
  const luarJam = chatPerJam.reduce((t, v, h) => t + (h < 8 || h >= 17 ? v : 0), 0);
  const totalChat = chatPerJam.reduce((t, v) => t + v, 0);
  const maxJam = Math.max(...chatPerJam);

  return (
    <>
      <PageHead kicker="Ringkasan" title="Apa yang dikerjakan agen bulan ini">
        Empat angka yang dipantau bersama, ditambah alur dari iklan sampai handover ke sales.
      </PageHead>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="Waktu respons" value="22 dtk" tone="ai" sub="Median balasan pertama. 97% lead dibalas di bawah 1 menit, termasuk malam hari." target="Target: di bawah 1 menit" />
        <Kpi label="Biaya per lead" value={rp(cpl)} sub={`Per survei terjadwal ${rp(cpSurvei)}. Meta dan Google digabung.`} target="Meta Ads + Google Ads" />
        <Kpi label="Survei terjadwal" value={num(total.survei)} tone="gold" sub={`${hadirSurvei} sudah hadir di lokasi, ${total.survei - hadirSurvei} akan datang.`} target="Dipesan lewat AI" />
        <Kpi label="Closing" value={num(total.closing)} sub={`${closingList.filter((c) => c.status === "Dikonfirmasi bersama").length} dikonfirmasi bersama, ${closingList.filter((c) => c.status === "Menunggu konfirmasi").length} menunggu.`} target="Dasar fee 7%" />
      </div>

      <Card className="mt-4">
        <CardTitle aside="30 hari terakhir">Dari iklan sampai survei</CardTitle>
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-5">
          {langkah.map((l, i) => (
            <li key={l.n} className="relative rounded-xl bg-surface-2 p-3 ring-1 ring-inset ring-line">
              <p className="font-mono text-[11px] text-gold">{l.n}</p>
              <p className="mt-1 text-[13px] font-semibold">{l.judul}</p>
              <p className="num mt-2 font-display text-2xl font-semibold leading-none">{l.angka}</p>
              <p className="mt-1 text-[11px] leading-snug text-ink-3">{l.ket}</p>
              {i < 4 && <span className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 text-ink-3 sm:block">›</span>}
            </li>
          ))}
        </ol>
        <p className="mt-3 text-xs text-ink-3">
          Lead serius = skor panas dan hangat. Dari {num(total.lead)} lead, {pct(total.serius / total.lead)} lolos kualifikasi AI dan sisanya tetap dijawab dan dirawat otomatis.
        </p>
      </Card>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <Card>
          <CardTitle aside="14 hari terakhir">Lead masuk per kanal</CardTitle>
          <div className="mb-3 flex flex-wrap gap-4 text-xs text-ink-2">
            <Legend c="var(--meta)" t={`Meta Ads · ${num(totalMeta.lead)}`} />
            <Legend c="var(--google)" t={`Google Ads · ${num(totalGoogle.lead)}`} />
            <Legend c="var(--wa)" t={`WhatsApp langsung · ${num(langsung.lead)}`} />
          </div>
          <div className="flex h-44 items-end gap-1.5 sm:gap-2" role="img" aria-label="Grafik batang lead masuk per hari, 14 hari terakhir">
            {trenLead.map((d) => {
              const t = d.meta + d.google + d.wa;
              return (
                <div key={d.hari} className="flex flex-1 flex-col items-center gap-1">
                  <div className="flex w-full flex-col-reverse overflow-hidden rounded-t-md" style={{ height: `${(t / maxTren) * 100}%` }} title={`${d.hari} Sep: ${t} lead`}>
                    <div style={{ flex: d.meta, background: "var(--meta)" }} />
                    <div style={{ flex: d.google, background: "var(--google)" }} />
                    <div style={{ flex: d.wa, background: "var(--wa)" }} />
                  </div>
                  <span className="num text-[10px] text-ink-3">{d.hari}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <CardTitle aside="chat masuk per jam">Balas 24 jam</CardTitle>
          <div className="flex h-24 items-end gap-[3px]" role="img" aria-label="Grafik jumlah chat masuk per jam">
            {chatPerJam.map((v, h) => {
              const luar = h < 8 || h >= 17;
              return <div key={h} className="flex-1 rounded-t-sm" style={{ height: `${Math.max(4, (v / maxJam) * 100)}%`, background: luar ? "var(--ai)" : "var(--line)" }} title={`${String(h).padStart(2, "0")}.00 · ${v} chat`} />;
            })}
          </div>
          <div className="mt-1 flex justify-between font-mono text-[10px] text-ink-3"><span>00</span><span>06</span><span>12</span><span>18</span><span>23</span></div>
          <p className="mt-4 text-sm leading-relaxed text-ink-2">
            <span className="num font-display text-2xl font-semibold text-ai">{pct(luarJam / totalChat)}</span>{" "}
            chat masuk di luar jam kerja (17.00–08.00). Semuanya dijawab AI dalam hitungan detik, tanpa menunggu sales.
          </p>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardTitle aside={<button className="font-semibold text-navy underline underline-offset-2" onClick={() => go("percakapan")}>Buka percakapan</button>}>
            Prioritas sales hari ini
          </CardTitle>
          <ul className="divide-y divide-line">
            {panas.map((l) => (
              <li key={l.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold">{l.nama}</p>
                    <SkorBadge skor={l.skor} />
                    <SumberChip sumber={l.sumber} />
                  </div>
                  <p className="mt-1 truncate text-xs text-ink-2">{l.tahap} · “{l.terakhir}”</p>
                </div>
                <span className="num text-xs text-ink-3">{l.waktu}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardTitle aside="tidak ada yang terlewat">Follow-up otomatis terjadwal</CardTitle>
          <ul className="space-y-3">
            {followUp.map((f) => (
              <li key={f.lead} className="flex gap-3">
                <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-ai-soft text-ai"><Icon name="clock" className="size-4" /></span>
                <div>
                  <p className="text-sm font-semibold">{f.lead} <span className="font-normal text-ink-3">· {f.kapan}</span></p>
                  <p className="text-xs leading-relaxed text-ink-2">{f.isi}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className={btnGhost} onClick={() => go("survei")}>Lihat jadwal survei</button>
            <button className={btnGhost} onClick={() => go("iklan")}>Lihat kinerja iklan</button>
          </div>
        </Card>
      </div>
      <p className="mt-6 text-xs text-ink-3">Semua angka pada prototipe ini adalah contoh untuk menggambarkan tampilan dashboard, bukan hasil nyata.</p>
    </>
  );
}

function Legend({ c, t }: { c: string; t: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="size-2.5 rounded-sm" style={{ background: c }} />
      {t}
    </span>
  );
}
