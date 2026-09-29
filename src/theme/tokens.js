// ============================================================
// DESIGN TOKENS — SATU-SATUNYA SUMBER KEBENARAN
// Jangan hardcode warna/jarak/ukuran di komponen.
// Selalu import dari sini.
// ============================================================

// ---------- WARNA ----------
// Skala netral + aksen. Tidak boleh tambah warna baru tanpa alasan kuat.
export const warna = {
  // Aksen — SATU warna saja (merah). Alias kuning kini memakai merah.
  merah: "#db0007",
  merahGelap: "#a80005",
  merahLembut: "#fff1f1",
  kuning: "#db0007",
  kuningGelap: "#a80005",
  kuningLembut: "#fff1f1",

  // Netral
  putih: "#ffffff",
  bg: "#ffffff",
  bgAbu: "#f6f7f9",
  abuMuda: "#eceef1",
  garis: "#e8eaee",
  abu: "#71767f",
  abuTua: "#3f434a",
  teks: "#141414",
  teksLembut: "#5a5f68",

  // Status
  hijau: "#1a9e4b",
  hijauLembut: "#e8f8ee",
  hitam: "#111111",
};

// ---------- JARAK ----------
// Semua jarak kelipatan 4. Gunakan skala ini saja.
export const spasi = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
};

// ---------- SUDUT ----------
export const sudut = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  bulat: 999,
};

// ---------- TIPOGRAFI ----------
// Maksimal 3 tingkat judul + 2 tingkat teks isi. Tidak boleh lebih.
// Font: Inter (netral, paling bersih, dipakai startup kelas atas).
const F = {
  reguler: "Inter_400Regular",
  sedang: "Inter_500Medium",
  tebal: "Inter_600SemiBold",
  ekstra: "Inter_700Bold",
  hitam: "Inter_800ExtraBold",
};

export const fontFamily = F;

export const font = {
  // Judul
  judulBesar: { fontFamily: F.hitam, fontSize: 26, letterSpacing: -0.7 },
  judul: { fontFamily: F.hitam, fontSize: 21, letterSpacing: -0.5 },
  subJudul: { fontFamily: F.ekstra, fontSize: 16.5, letterSpacing: -0.3 },
  // Isi
  isi: { fontFamily: F.sedang, fontSize: 15, lineHeight: 22 },
  isiKecil: { fontFamily: F.sedang, fontSize: 13, lineHeight: 19 },
  // Label
  label: { fontFamily: F.ekstra, fontSize: 11.5, letterSpacing: 0.6 },
  // Harga
  harga: { fontFamily: F.hitam, fontSize: 17, letterSpacing: -0.3 },
  hargaBesar: { fontFamily: F.hitam, fontSize: 20, letterSpacing: -0.4 },
};

// ---------- BAYANGAN ----------
// Hanya 2 tingkat. Tidak ada bayangan lain.
export const bayang = {
  // Kartu diam
  kartu: {
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  // Elemen mengambang / tombol utama
  mengambang: {
    shadowColor: "#000",
    shadowOpacity: 0.16,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
};

// ---------- UKURAN ELEMEN ----------
export const ukuran = {
  ikonKecil: 18,
  ikon: 22,
  ikonBesar: 26,
  tombolTinggi: 52,
  tombolKecil: 38,
  avatar: 60,
};

// ---------- LEBAR MAKSIMUM ----------
// Untuk layar lebar (tablet/web) supaya konten tidak melar.
export const LEBAR_MAKS = 560;
