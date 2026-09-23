import { meta, google, langsung, closingList, tipe } from "./mahkota";

const sum = (a: { belanja: number; lead: number; serius: number; survei: number; closing: number }[], k: "belanja" | "lead" | "serius" | "survei" | "closing") =>
  a.reduce((t, x) => t + x[k], 0);

export const totalMeta = {
  belanja: sum(meta, "belanja"), lead: sum(meta, "lead"), serius: sum(meta, "serius"), survei: sum(meta, "survei"), closing: sum(meta, "closing"),
};
export const totalGoogle = {
  belanja: sum(google, "belanja"), lead: sum(google, "lead"), serius: sum(google, "serius"), survei: sum(google, "survei"), closing: sum(google, "closing"),
};

export const total = {
  belanja: totalMeta.belanja + totalGoogle.belanja,
  lead: totalMeta.lead + totalGoogle.lead + langsung.lead,
  serius: totalMeta.serius + totalGoogle.serius + langsung.serius,
  survei: totalMeta.survei + totalGoogle.survei + langsung.survei,
  closing: totalMeta.closing + totalGoogle.closing + langsung.closing,
};

export const cpl = total.belanja / (total.lead - langsung.lead);
export const cpSurvei = total.belanja / (total.survei - langsung.survei);
export const cpClosing = total.belanja / total.closing;

export function nilaiClosing(id: string) {
  return tipe.find((t) => t.id === id)!.hargaJuta;
}
export const totalNilaiClosing = closingList.reduce((t, c) => t + nilaiClosing(c.tipeId), 0);
export const totalFee = totalNilaiClosing * 0.07;
export const feeTerkonfirmasi = closingList
  .filter((c) => c.status === "Dikonfirmasi bersama")
  .reduce((t, c) => t + nilaiClosing(c.tipeId) * 0.07, 0);
