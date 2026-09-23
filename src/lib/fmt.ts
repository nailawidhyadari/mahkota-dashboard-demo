/** Harga rumah dalam juta rupiah, mengikuti tulisan di proposal: Rp677 jt, Rp1,29 M. */
export function hargaJuta(juta: number): string {
  if (juta >= 1000) {
    return `Rp${(juta / 1000).toFixed(2).replace(".", ",")} M`;
  }
  return `Rp${Math.round(juta)} jt`;
}

/** Fee / nilai menengah dengan satu desimal: Rp47,4 jt. */
export function juta1(juta: number): string {
  return `Rp${juta.toFixed(1).replace(".", ",")} jt`;
}

/** Rupiah penuh: Rp38.500. */
export function rp(n: number): string {
  return `Rp${Math.round(n).toLocaleString("id-ID")}`;
}

export function num(n: number): string {
  return Math.round(n).toLocaleString("id-ID");
}

export function pct(n: number, d = 0): string {
  return `${(n * 100).toFixed(d).replace(".", ",")}%`;
}

/** Cicilan anuitas per bulan, hasil dalam rupiah. */
export function cicilan(pokokJuta: number, bungaTahun: number, tahun: number): number {
  const r = bungaTahun / 12;
  const n = tahun * 12;
  const p = pokokJuta * 1_000_000;
  return (p * r) / (1 - Math.pow(1 + r, -n));
}
