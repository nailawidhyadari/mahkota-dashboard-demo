// Semua angka di file ini adalah DATA CONTOH untuk prototipe.
// Harga, luas, dan fasilitas mengikuti proposal (sumber: Rumah123, dapat berubah).

export type Tipe = {
  id: "t55" | "c" | "b" | "a";
  nama: string;
  hargaJuta: number;
  lt: number;
  lb: number;
  lantai?: number;
};

export const tipe: Tipe[] = [
  { id: "t55", nama: "Tipe 55", hargaJuta: 677, lt: 82, lb: 55 },
  { id: "c", nama: "Blok C (2 lantai)", hargaJuta: 871, lt: 84, lb: 80, lantai: 2 },
  { id: "b", nama: "Blok B (3 lantai)", hargaJuta: 1290, lt: 131, lb: 115, lantai: 3 },
  { id: "a", nama: "Blok A (3 lantai)", hargaJuta: 1360, lt: 124, lb: 135, lantai: 3 },
];

export const proyek = {
  nama: "Mahkota Cileunyi",
  pengembang: "PT Kanaya Cipta Lestari",
  lokasi: "Cileunyi, Kabupaten Bandung",
  status: "Tahap serah terima sejak Desember 2022",
  rentang: "Sekitar Rp677 juta sampai Rp1,36 miliar",
  akses: [
    { tempat: "RSU AMC", menit: 5 },
    { tempat: "Unpad", menit: 15 },
    { tempat: "ITB Jatinangor", menit: 17 },
  ],
  aksesCatatan: "Jalur kereta cepat di sekitar lokasi",
  fasilitas: ["Keamanan dan CCTV", "Masjid", "Taman hijau", "Area bermain anak"],
};

export const kprContoh = { bungaTahun: 0.075, tenorDefault: 20, dpDefaultPersen: 0.15 };

// ───────── Lead & percakapan ─────────

export type Skor = "panas" | "hangat" | "dingin";
export type Sumber = "Meta Ads" | "Google Ads" | "WhatsApp langsung";
export type Tahap =
  | "AI menjawab"
  | "Kualifikasi"
  | "Menghitung KPR"
  | "Survei dijadwalkan"
  | "Handover ke sales"
  | "Closing";

export type Pesan =
  | { dari: "lead" | "ai" | "sales"; jam: string; teks: string; detik?: number }
  | { dari: "ai"; jam: string; jenis: "kpr"; tipeId: Tipe["id"]; dpJuta: number; tenor: number }
  | { dari: "ai"; jam: string; jenis: "survei"; hari: string; jam2: string; sales: string };

export type Lead = {
  id: string;
  nama: string;
  sumber: Sumber;
  kampanye: string;
  tipeId: Tipe["id"];
  skor: Skor;
  poinSkor: number;
  tahap: Tahap;
  terakhir: string;
  waktu: string;
  anggaran: string;
  tujuan: string;
  dp: string;
  rencana: string;
  alasan: string[];
  pesan: Pesan[];
  ringkasan: string;
};

export const leads: Lead[] = [
  {
    id: "l1",
    nama: "Rizky Firmansyah",
    sumber: "Meta Ads",
    kampanye: "CTWA · Blok C · Pekerja Jatinangor",
    tipeId: "c",
    skor: "panas",
    poinSkor: 92,
    tahap: "Survei dijadwalkan",
    terakhir: "Sabtu 10.00 bisa",
    waktu: "21.52",
    anggaran: "Rp850–900 jt",
    tujuan: "Ditempati sendiri",
    dp: "± Rp150 jt siap",
    rencana: "Dalam 1–2 bulan",
    alasan: ["Menyebut DP siap", "Bekerja di Jatinangor", "Menerima jadwal survei"],
    pesan: [
      { dari: "lead", jam: "21.47", teks: "Malam, rumah di Mahkota Cileunyi yang 2 lantai harganya berapa ya?" },
      {
        dari: "ai",
        jam: "21.47",
        detik: 9,
        teks: "Selamat malam, Pak. Blok C (2 lantai) mulai Rp871 jt, luas tanah 84 m² dan luas bangunan 80 m². Harga ini dari listing dan bisa berubah, tim sales akan mengonfirmasi saat survei. Rencananya untuk ditempati sendiri atau investasi?",
      },
      { dari: "lead", jam: "21.49", teks: "Ditempati. Saya kerja di Jatinangor. DP ada sekitar 150 juta" },
      {
        dari: "ai",
        jam: "21.49",
        detik: 7,
        teks: "Dari Cileunyi ke Unpad sekitar 15 menit dan ke ITB Jatinangor sekitar 17 menit. Dengan DP Rp150 jt, ini simulasi cicilan Blok C:",
      },
      { dari: "ai", jam: "21.49", jenis: "kpr", tipeId: "c", dpJuta: 150, tenor: 20 },
      {
        dari: "ai",
        jam: "21.50",
        teks: "Simulasi memakai skema contoh; skema resmi mengikuti yang disetujui developer. Mau lihat langsung ke lokasi? Ada slot Sabtu pukul 10.00 atau 14.00.",
      },
      { dari: "lead", jam: "21.52", teks: "Sabtu 10.00 bisa" },
      { dari: "ai", jam: "21.52", jenis: "survei", hari: "Sabtu, 26 Sep", jam2: "10.00", sales: "Kang Dimas" },
    ],
    ringkasan:
      "Pak Rizky, pekerja di Jatinangor, mencari rumah untuk ditempati sendiri. Minat Blok C (Rp871 jt), DP siap ± Rp150 jt, simulasi 20 tahun sudah dikirim. Survei Sabtu 26 Sep pukul 10.00. Siapkan: info akses ke Jatinangor dan skema KPR resmi.",
  },
  {
    id: "l2",
    nama: "Dewi Anggraini",
    sumber: "Google Ads",
    kampanye: "Pencarian · perumahan dekat unpad",
    tipeId: "b",
    skor: "panas",
    poinSkor: 88,
    tahap: "Handover ke sales",
    terakhir: "Baik, saya tunggu telepon dari Teh Ayu",
    waktu: "20.15",
    anggaran: "Rp1,2–1,3 M",
    tujuan: "Ditempati keluarga",
    dp: "± Rp300 jt siap",
    rencana: "Bulan ini",
    alasan: ["Anggaran cocok Blok B", "Menanyakan proses akad", "Meminta dihubungi sales"],
    pesan: [
      { dari: "lead", jam: "20.02", teks: "Selamat malam, Blok B 3 lantai masih ada? Luas tanahnya berapa?" },
      {
        dari: "ai",
        jam: "20.02",
        detik: 11,
        teks: "Selamat malam, Bu. Blok B (3 lantai) mulai Rp1,29 M dengan luas tanah 131 m² dan luas bangunan 115 m². Ketersediaan unit terbaru akan dikonfirmasi tim sales. Untuk berapa anggota keluarga, Bu?",
      },
      { dari: "lead", jam: "20.10", teks: "Berlima. Kalau mau akad bulan ini bisa? DP saya siapkan 300 juta." },
      {
        dari: "ai",
        jam: "20.10",
        detik: 8,
        teks: "Baik, Bu. Proses akad dan ketersediaan unit paling tepat dijelaskan tim sales. Saya teruskan ringkasan percakapan ini ke Teh Ayu agar Ibu langsung ditelepon, ya.",
      },
      { dari: "lead", jam: "20.15", teks: "Baik, saya tunggu telepon dari Teh Ayu" },
    ],
    ringkasan:
      "Bu Dewi, keluarga 5 orang, minat Blok B (Rp1,29 M), DP siap ± Rp300 jt dan ingin akad bulan ini. Datang dari pencarian Google 'perumahan dekat unpad'. Minta ditelepon; belum ada jadwal survei.",
  },
  {
    id: "l3",
    nama: "Sinta Maharani",
    sumber: "Meta Ads",
    kampanye: "CTWA · Tipe 55 · Bandung Timur",
    tipeId: "t55",
    skor: "hangat",
    poinSkor: 64,
    tahap: "Menghitung KPR",
    terakhir: "Kalau DP 50 juta cicilannya berapa?",
    waktu: "19.31",
    anggaran: "Rp650–700 jt",
    tujuan: "Rumah pertama",
    dp: "± Rp50 jt",
    rencana: "3–6 bulan",
    alasan: ["Aktif menanyakan cicilan", "DP masih kecil", "Belum menyebut jadwal"],
    pesan: [
      { dari: "lead", jam: "19.24", teks: "Halo, rumah paling murah di sini berapa?" },
      {
        dari: "ai",
        jam: "19.24",
        detik: 6,
        teks: "Halo, Kak. Yang paling terjangkau Tipe 55, mulai Rp677 jt dengan luas tanah 82 m² dan luas bangunan 55 m². Untuk rumah pertama atau investasi, Kak?",
      },
      { dari: "lead", jam: "19.31", teks: "Kalau DP 50 juta cicilannya berapa?" },
      { dari: "ai", jam: "19.31", detik: 8, teks: "Ini simulasi Tipe 55 dengan DP Rp50 jt:" },
      { dari: "ai", jam: "19.31", jenis: "kpr", tipeId: "t55", dpJuta: 50, tenor: 20 },
    ],
    ringkasan:
      "Kak Sinta, rumah pertama, minat Tipe 55. DP baru ± Rp50 jt sehingga cicilan cukup tinggi. Perlu follow-up otomatis besok pagi dengan opsi tenor lebih panjang.",
  },
  {
    id: "l4",
    nama: "Hendra Gunawan",
    sumber: "WhatsApp langsung",
    kampanye: "Tautan WhatsApp di papan proyek",
    tipeId: "a",
    skor: "panas",
    poinSkor: 95,
    tahap: "Closing",
    terakhir: "Sudah transfer tanda jadi ya",
    waktu: "Kemarin",
    anggaran: "Rp1,3–1,4 M",
    tujuan: "Ditempati keluarga",
    dp: "± Rp400 jt",
    rencana: "Sudah memutuskan",
    alasan: ["Sudah survei", "Menanyakan unit tertentu", "Transfer tanda jadi"],
    pesan: [
      { dari: "lead", jam: "Kemarin 14.20", teks: "Terima kasih Pak Bagas, sudah transfer tanda jadi ya" },
      { dari: "sales", jam: "Kemarin 14.31", teks: "Diterima, Pak Hendra. Berkas akad kami kirim besok." },
    ],
    ringkasan:
      "Pak Hendra, Blok A (Rp1,36 M), sudah survei dan transfer tanda jadi. Menunggu konfirmasi bersama untuk dicatat sebagai closing.",
  },
  {
    id: "l5",
    nama: "Andika Pratama",
    sumber: "Google Ads",
    kampanye: "Pencarian · rumah cileunyi",
    tipeId: "t55",
    skor: "hangat",
    poinSkor: 58,
    tahap: "Kualifikasi",
    terakhir: "Lokasinya dekat stasiun gak?",
    waktu: "18.05",
    anggaran: "Rp700 jt",
    tujuan: "Belum jelas",
    dp: "Belum disebut",
    rencana: "Belum disebut",
    alasan: ["Menanyakan akses transportasi"],
    pesan: [
      { dari: "lead", jam: "18.02", teks: "Lokasinya dekat stasiun gak?" },
      {
        dari: "ai",
        jam: "18.02",
        detik: 5,
        teks: "Ada jalur kereta cepat di sekitar lokasi, Kak. Untuk akses harian, RSU AMC sekitar 5 menit dan Unpad sekitar 15 menit. Rencana huniannya untuk ditempati atau investasi?",
      },
      { dari: "lead", jam: "18.05", teks: "Ditempati sih, tapi masih lihat-lihat dulu" },
    ],
    ringkasan: "Andika masih membandingkan, minat Tipe 55. Belum menyebut DP atau jadwal. Follow-up otomatis 2 hari lagi.",
  },
  {
    id: "l6",
    nama: "Nurul Aini",
    sumber: "Meta Ads",
    kampanye: "Video 15 dtk · Akses Unpad/ITB",
    tipeId: "t55",
    skor: "dingin",
    poinSkor: 22,
    tahap: "AI menjawab",
    terakhir: "Cuma tanya harga kak",
    waktu: "17.40",
    anggaran: "Belum disebut",
    tujuan: "Belum disebut",
    dp: "Belum disebut",
    rencana: "Belum disebut",
    alasan: ["Hanya menanyakan harga", "Tidak membalas pertanyaan kualifikasi"],
    pesan: [
      { dari: "lead", jam: "17.39", teks: "Harga berapa kak" },
      {
        dari: "ai",
        jam: "17.39",
        detik: 4,
        teks: "Halo, Kak. Harga mulai Rp677 jt untuk Tipe 55 sampai Rp1,36 M untuk Blok A. Mau saya kirim rincian tipe yang sesuai anggaran Kakak?",
      },
      { dari: "lead", jam: "17.40", teks: "Cuma tanya harga kak" },
    ],
    ringkasan: "Lead dingin, hanya menanyakan harga. Tidak perlu waktu sales; masuk daftar nurturing.",
  },
  {
    id: "l7",
    nama: "Yoga Saputra",
    sumber: "Google Ads",
    kampanye: "Pencarian · rumah jatinangor cicilan",
    tipeId: "c",
    skor: "hangat",
    poinSkor: 67,
    tahap: "Menghitung KPR",
    terakhir: "Tenor 25 tahun bisa?",
    waktu: "16.12",
    anggaran: "Rp870 jt",
    tujuan: "Ditempati sendiri",
    dp: "± Rp100 jt",
    rencana: "3 bulan",
    alasan: ["Membandingkan tenor", "Anggaran sesuai Blok C"],
    pesan: [
      { dari: "lead", jam: "16.09", teks: "Blok C cicilannya berapa kalau DP 100 juta?" },
      { dari: "ai", jam: "16.09", detik: 7, teks: "Ini simulasi Blok C dengan DP Rp100 jt:" },
      { dari: "ai", jam: "16.09", jenis: "kpr", tipeId: "c", dpJuta: 100, tenor: 20 },
      { dari: "lead", jam: "16.12", teks: "Tenor 25 tahun bisa?" },
    ],
    ringkasan: "Yoga, Blok C, DP ± Rp100 jt, membandingkan tenor 20 dan 25 tahun. Siap diajak survei.",
  },
  {
    id: "l8",
    nama: "Ratna Kusuma",
    sumber: "Meta Ads",
    kampanye: "CTWA · Blok B/A · Keluarga",
    tipeId: "b",
    skor: "hangat",
    poinSkor: 61,
    tahap: "Kualifikasi",
    terakhir: "Ada kolam renang gak?",
    waktu: "15.48",
    anggaran: "Rp1,3 M",
    tujuan: "Ditempati keluarga",
    dp: "Belum disebut",
    rencana: "Belum disebut",
    alasan: ["Menanyakan fasilitas"],
    pesan: [
      { dari: "lead", jam: "15.46", teks: "Ada kolam renang gak?" },
      {
        dari: "ai",
        jam: "15.46",
        detik: 6,
        teks: "Untuk saat ini fasilitas yang tercatat: keamanan dan CCTV, masjid, taman hijau, dan area bermain anak. Kolam renang tidak ada di daftar, Bu. Apakah fasilitas anak menjadi prioritas?",
      },
    ],
    ringkasan: "Bu Ratna, minat Blok B, menanyakan fasilitas. Perlu kualifikasi DP dan waktu.",
  },
];

export const skorWarna: Record<Skor, { label: string; fg: string; bg: string }> = {
  panas: { label: "Panas", fg: "#b42318", bg: "#fdeae7" },
  hangat: { label: "Hangat", fg: "#9a6700", bg: "#fbf0d4" },
  dingin: { label: "Dingin", fg: "#3d5a80", bg: "#e6edf5" },
};

// ───────── Iklan ─────────

export type Kampanye = {
  nama: string;
  target: string;
  belanja: number; // rupiah
  lead: number;
  serius: number;
  survei: number;
  closing: number;
};

export const meta: Kampanye[] = [
  { nama: "CTWA · Tipe 55 · Bandung Timur", target: "Audiens Bandung Timur, 25–40 th", belanja: 5_200_000, lead: 158, serius: 34, survei: 9, closing: 0 },
  { nama: "CTWA · Blok C · Pekerja Jatinangor", target: "Pekerja & dosen sekitar Jatinangor", belanja: 6_100_000, lead: 121, serius: 47, survei: 14, closing: 2 },
  { nama: "CTWA · Blok B/A · Keluarga", target: "Keluarga, minat properti", belanja: 4_700_000, lead: 78, serius: 33, survei: 8, closing: 1 },
  { nama: "Video 15 dtk · Akses Unpad/ITB", target: "Audiens luas Bandung Timur", belanja: 2_100_000, lead: 59, serius: 8, survei: 1, closing: 0 },
];

export const google: Kampanye[] = [
  { nama: "rumah cileunyi", target: "Pencarian · frasa", belanja: 3_600_000, lead: 41, serius: 15, survei: 5, closing: 0 },
  { nama: "perumahan dekat unpad", target: "Pencarian · frasa", belanja: 2_900_000, lead: 33, serius: 12, survei: 4, closing: 0 },
  { nama: "rumah jatinangor cicilan", target: "Pencarian · frasa", belanja: 1_800_000, lead: 27, serius: 6, survei: 2, closing: 0 },
  { nama: "rumah bandung timur dp ringan", target: "Pencarian · frasa", belanja: 2_400_000, lead: 34, serius: 5, survei: 1, closing: 0 },
];

export const langsung = { lead: 61, serius: 21, survei: 6, closing: 1 };

export const iklanTayang = 412_800; // impresi Meta + Google, 30 hari
export const hadirSurvei = 34;

// Lead masuk per hari (14 hari) dan chat masuk per jam
export const trenLead = [
  { hari: "10", meta: 22, google: 7, wa: 3 },
  { hari: "11", meta: 25, google: 8, wa: 4 },
  { hari: "12", meta: 31, google: 9, wa: 2 },
  { hari: "13", meta: 27, google: 11, wa: 5 },
  { hari: "14", meta: 19, google: 6, wa: 3 },
  { hari: "15", meta: 17, google: 5, wa: 4 },
  { hari: "16", meta: 29, google: 10, wa: 3 },
  { hari: "17", meta: 33, google: 12, wa: 4 },
  { hari: "18", meta: 30, google: 9, wa: 6 },
  { hari: "19", meta: 35, google: 11, wa: 3 },
  { hari: "20", meta: 28, google: 8, wa: 5 },
  { hari: "21", meta: 21, google: 7, wa: 4 },
  { hari: "22", meta: 24, google: 8, wa: 2 },
  { hari: "23", meta: 26, google: 9, wa: 3 },
];

export const chatPerJam = [
  1, 1, 0, 0, 0, 1, 3, 6, 9, 11, 10, 8, 9, 10, 9, 8, 7, 6, 9, 13, 16, 15, 9, 4,
];

// ───────── Survei ─────────

export type Survei = {
  id: string;
  hari: string;
  tgl: string;
  jam: string;
  lead: string;
  tipe: string;
  sales: string;
  status: "Terkonfirmasi" | "Menunggu konfirmasi";
  pengingat: string;
};

export const sales = ["Kang Dimas", "Teh Ayu", "Pak Bagas"];

export const survei: Survei[] = [
  { id: "s1", hari: "Rabu", tgl: "23 Sep", jam: "16.00", lead: "Bu Ratna Kusuma", tipe: "Blok B", sales: "Teh Ayu", status: "Terkonfirmasi", pengingat: "Pengingat hari-H terkirim 08.00" },
  { id: "s2", hari: "Kamis", tgl: "24 Sep", jam: "10.00", lead: "Pak Yoga Saputra", tipe: "Blok C", sales: "Kang Dimas", status: "Terkonfirmasi", pengingat: "Pengingat H-1 terkirim" },
  { id: "s3", hari: "Jumat", tgl: "25 Sep", jam: "15.00", lead: "Bu Dewi Anggraini", tipe: "Blok B", sales: "Teh Ayu", status: "Menunggu konfirmasi", pengingat: "Menunggu balasan lead" },
  { id: "s4", hari: "Sabtu", tgl: "26 Sep", jam: "10.00", lead: "Pak Rizky Firmansyah", tipe: "Blok C", sales: "Kang Dimas", status: "Terkonfirmasi", pengingat: "Pengingat H-1 dijadwalkan" },
  { id: "s5", hari: "Sabtu", tgl: "26 Sep", jam: "13.00", lead: "Bu Melati Sari", tipe: "Tipe 55", sales: "Pak Bagas", status: "Terkonfirmasi", pengingat: "Pengingat H-1 dijadwalkan" },
  { id: "s6", hari: "Sabtu", tgl: "26 Sep", jam: "14.00", lead: "Pak Doni Kurniawan", tipe: "Blok A", sales: "Teh Ayu", status: "Menunggu konfirmasi", pengingat: "Menunggu balasan lead" },
  { id: "s7", hari: "Minggu", tgl: "27 Sep", jam: "09.30", lead: "Pak Irfan Maulana", tipe: "Blok C", sales: "Pak Bagas", status: "Terkonfirmasi", pengingat: "Pengingat H-1 dijadwalkan" },
  { id: "s8", hari: "Minggu", tgl: "27 Sep", jam: "11.00", lead: "Bu Lestari Wulan", tipe: "Tipe 55", sales: "Kang Dimas", status: "Terkonfirmasi", pengingat: "Pengingat H-1 dijadwalkan" },
];

export const hariKalender = [
  { hari: "Rab", tgl: "23" },
  { hari: "Kam", tgl: "24" },
  { hari: "Jum", tgl: "25" },
  { hari: "Sab", tgl: "26" },
  { hari: "Min", tgl: "27" },
];

// ───────── Follow-up otomatis ─────────

export const followUp = [
  { lead: "Sinta Maharani", kapan: "Besok 09.00", isi: "Kirim opsi tenor 25 tahun dan simulasi DP Rp75 jt" },
  { lead: "Andika Pratama", kapan: "Jumat 10.00", isi: "Tanya kembali rencana hunian, tawarkan survei akhir pekan" },
  { lead: "Ratna Kusuma", kapan: "Kamis 19.00", isi: "Kirim foto fasilitas anak dan tanya ketersediaan survei" },
];

// ───────── Kerja sama ─────────

export const investasi = [
  { nama: "Discovery dan knowledge base proyek", juta: 5 },
  { nama: "Pengembangan AI agent dan alur percakapan", juta: 15 },
  { nama: "Integrasi WhatsApp Business API dan CRM", juta: 8 },
  { nama: "Integrasi Meta Ads dan Google Ads (pelacakan, optimasi, laporan)", juta: 10 },
  { nama: "Dashboard lintas kanal", juta: 5 },
  { nama: "Pengujian, pelatihan tim sales, dan go-live", juta: 4 },
  { nama: "Cadangan dan dukungan awal", juta: 3 },
];

export const paket = [
  {
    nama: "Starter",
    harga: "Rp2,5 jt",
    fitur: ["AI Sales Agent WhatsApp 24 jam", "Lead scoring dan booking survei", "Dashboard lintas kanal", "Iklan dikelola tim developer"],
    rekomendasi: false,
  },
  {
    nama: "Growth",
    harga: "Rp7,5 jt",
    fitur: ["Semua isi Starter", "Pengelolaan Meta Ads dan Google Ads", "Optimasi berdasarkan data closing", "Laporan mingguan"],
    rekomendasi: true,
  },
  {
    nama: "Premium",
    harga: "Rp12,5 jt",
    fitur: ["Semua isi Growth", "Kreatif iklan: gambar dan video pendek", "Retargeting dan landing page", "Evaluasi bulanan dengan tim"],
    rekomendasi: false,
  },
];

export const jadwal = [
  { minggu: "Minggu 1", judul: "Discovery", isi: "Kumpulkan katalog, FAQ, skema KPR, dan alur sales." },
  { minggu: "Minggu 2–3", judul: "Pengembangan", isi: "Bangun agen, alur percakapan, serta integrasi WhatsApp, Meta, dan Google." },
  { minggu: "Minggu 4", judul: "Pengujian", isi: "Uji dengan skenario nyata dan latih tim sales." },
  { minggu: "Minggu 5", judul: "Go-live", isi: "Aktif di WhatsApp resmi, pemantauan intensif." },
];

export type Closing = {
  id: string;
  lead: string;
  tipeId: Tipe["id"];
  sumber: Sumber;
  kampanye: string;
  tanggal: string;
  status: "Dikonfirmasi bersama" | "Menunggu konfirmasi";
};

export const closingList: Closing[] = [
  { id: "c1", lead: "Cecep Sutisna", tipeId: "c", sumber: "Meta Ads", kampanye: "CTWA · Blok C · Pekerja Jatinangor", tanggal: "3 Sep", status: "Dikonfirmasi bersama" },
  { id: "c2", lead: "Wulan Handayani", tipeId: "c", sumber: "Meta Ads", kampanye: "CTWA · Blok C · Pekerja Jatinangor", tanggal: "9 Sep", status: "Dikonfirmasi bersama" },
  { id: "c3", lead: "Bambang Ardiansyah", tipeId: "b", sumber: "Meta Ads", kampanye: "CTWA · Blok B/A · Keluarga", tanggal: "15 Sep", status: "Dikonfirmasi bersama" },
  { id: "c4", lead: "Hendra Gunawan", tipeId: "a", sumber: "WhatsApp langsung", kampanye: "Tautan WhatsApp di papan proyek", tanggal: "22 Sep", status: "Menunggu konfirmasi" },
];
