// ============================================================
// Menu Kiosk Fast Food
// Foto dari Unsplash (bebas pakai)
// ============================================================

const foto = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const KATEGORI = [
  { id: "semua", nama: "Semua" },
  { id: "promo", nama: "Promo" },
  { id: "burger", nama: "Burger" },
  { id: "ayam", nama: "Ayam" },
  { id: "sampingan", nama: "Sampingan" },
  { id: "minuman", nama: "Minuman" },
  { id: "dessert", nama: "Dessert" },
];

// Banner promo di atas (gaya McDonald's)
export const PROMO = [
  {
    judul: "Paket Hemat Hari Ini",
    label: "Hemat Hari Ini",
    ket: "Big Mac + Fries + Coke",
    harga: "Rp 65.000",
    gambar: foto("1550547660-d9450f859349", 1200),
    warna: "#e01e1e",
  },
  {
    judul: "Menu Baru Spicy Korean",
    label: "Menu Baru",
    ket: "Ayam crispy saus Korea",
    harga: "Mulai Rp 32.000",
    gambar: foto("1626645738196-c2a7c87a8f58", 1200),
    warna: "#ff6b00",
  },
  {
    judul: "Dessert Diskon 30%",
    label: "Diskon Spesial",
    ket: "Semua es krim & sundae",
    harga: "Diskon 30%",
    gambar: foto("1497034825429-c343d7c6a68f", 1200),
    warna: "#c2185b",
  },
];

export const MENU = [
  // ---------- BURGER ----------
  {
    id: "b1",
    nama: "Big Mac",
    deskripsi: "Dua beef patty, selada, keju, saus spesial",
    harga: 42000,
    kategori: "burger",
    gambar: foto("1568901346375-23c9450c58cd"),
    favorit: true,
    promo: true,
    stok: true,
  },
  {
    id: "b2",
    nama: "Quarter Pounder",
    deskripsi: "Beef patty tebal, keju cheddar, bawang",
    harga: 45000,
    kategori: "burger",
    gambar: foto("1553979459-d2229ba7433b"),
    favorit: false,
    stok: true,
  },
  {
    id: "b3",
    nama: "McChicken",
    deskripsi: "Ayam crispy, selada, saus mayones",
    harga: 35000,
    kategori: "burger",
    gambar: foto("1606755962773-d324e0a13086"),
    favorit: true,
    stok: true,
  },
  {
    id: "b4",
    nama: "Cheeseburger",
    deskripsi: "Beef patty, keju leleh, acar, saus tomat",
    harga: 28000,
    kategori: "burger",
    gambar: foto("1571091718767-18b5b1457add"),
    favorit: false,
    stok: true,
  },
  {
    id: "b5",
    nama: "Double Cheeseburger",
    deskripsi: "Dua beef patty, dua lapis keju",
    harga: 38000,
    kategori: "burger",
    gambar: foto("1550547660-d9450f859349"),
    favorit: false,
    stok: true,
  },

  // ---------- AYAM ----------
  {
    id: "a1",
    nama: "Ayam Crispy 2pcs",
    deskripsi: "Dua potong ayam crispy bumbu khas",
    harga: 40000,
    kategori: "ayam",
    gambar: foto("1626645738196-c2a7c87a8f58"),
    favorit: true,
    promo: true,
    stok: true,
  },
  {
    id: "a2",
    nama: "Chicken Nuggets 6pcs",
    deskripsi: "Nugget ayam dengan saus pilihan",
    harga: 25000,
    kategori: "ayam",
    gambar: foto("1562967914-608f82629710"),
    favorit: false,
    stok: true,
  },
  {
    id: "a3",
    nama: "Chicken Wings 4pcs",
    deskripsi: "Sayap ayam panggang saus BBQ",
    harga: 32000,
    kategori: "ayam",
    gambar: foto("1608039755401-742074f0548d"),
    favorit: false,
    stok: true,
  },

  // ---------- SAMPINGAN ----------
  {
    id: "s1",
    nama: "French Fries Large",
    deskripsi: "Kentang goreng renyah porsi besar",
    harga: 22000,
    kategori: "sampingan",
    gambar: foto("1573080496219-bb080dd4f877"),
    favorit: true,
    stok: true,
  },
  {
    id: "s2",
    nama: "French Fries Regular",
    deskripsi: "Kentang goreng renyah porsi sedang",
    harga: 18000,
    kategori: "sampingan",
    gambar: foto("1630384060421-cb20d0e0649d"),
    favorit: false,
    stok: true,
  },
  {
    id: "s3",
    nama: "Onion Rings",
    deskripsi: "Bawang bombay goreng tepung, 6 potong",
    harga: 24000,
    kategori: "sampingan",
    gambar: foto("1639024471283-03518883512d"),
    favorit: false,
    stok: true,
  },
  {
    id: "s4",
    nama: "Apple Pie",
    deskripsi: "Pai apel hangat dengan kayu manis",
    harga: 15000,
    kategori: "sampingan",
    gambar: foto("1535920527002-b35e96722eb9"),
    favorit: false,
    stok: false,
  },

  // ---------- MINUMAN ----------
  {
    id: "m1",
    nama: "Coca-Cola",
    deskripsi: "Minuman bersoda dingin, medium",
    harga: 15000,
    kategori: "minuman",
    gambar: foto("1554866585-cd94860890b7"),
    favorit: true,
    stok: true,
  },
  {
    id: "m2",
    nama: "Sprite",
    deskripsi: "Minuman soda lemon dingin",
    harga: 15000,
    kategori: "minuman",
    gambar: foto("1622483767028-3f66f32aef97"),
    favorit: false,
    stok: true,
  },
  {
    id: "m3",
    nama: "Iced Tea",
    deskripsi: "Teh dingin manis dengan es",
    harga: 13000,
    kategori: "minuman",
    gambar: foto("1556679343-c7306c1976bc"),
    favorit: false,
    stok: true,
  },
  {
    id: "m4",
    nama: "Cappuccino",
    deskripsi: "Kopi susu dengan busa lembut",
    harga: 25000,
    kategori: "minuman",
    gambar: foto("1572442388796-11668a67e53d"),
    favorit: false,
    stok: true,
  },
  {
    id: "m5",
    nama: "Milkshake Cokelat",
    deskripsi: "Susu kocok cokelat lembut",
    harga: 28000,
    kategori: "minuman",
    gambar: foto("1572490122747-3968b75cc699"),
    favorit: false,
    stok: true,
  },

  // ---------- DESSERT ----------
  {
    id: "d1",
    nama: "Sundae Cokelat",
    deskripsi: "Es krim lembut dengan saus cokelat",
    harga: 16000,
    kategori: "dessert",
    gambar: foto("1567206563064-6f60f40a2b57"),
    favorit: true,
    promo: true,
    stok: true,
  },
  {
    id: "d2",
    nama: "McFlurry Oreo",
    deskripsi: "Es krim lembut dengan remahan Oreo",
    harga: 24000,
    kategori: "dessert",
    gambar: foto("1497034825429-c343d7c6a68f"),
    favorit: false,
    promo: true,
    stok: true,
  },
  {
    id: "d3",
    nama: "Sundae Strawberry",
    deskripsi: "Es krim lembut dengan saus stroberi",
    harga: 16000,
    kategori: "dessert",
    gambar: foto("1488900128323-21503983a07e"),
    favorit: false,
    stok: true,
  },
];

/** Format harga jadi Rupiah. */
export function rupiah(n) {
  return "Rp " + Number(n).toLocaleString("id-ID");
}

/** Pajak 11% (PPN Indonesia). */
export const PAJAK_PERSEN = 11;

// ============================================================
// VARIAN — pilihan tambahan per kategori menu
// ============================================================
export const VARIAN = {
  minuman: {
    nama: "Ukuran",
    pilihan: [
      { id: "regular", nama: "Regular", tambah: 0 },
      { id: "large", nama: "Large", tambah: 5000 },
    ],
  },
  sampingan: {
    nama: "Ukuran",
    pilihan: [
      { id: "regular", nama: "Regular", tambah: 0 },
      { id: "large", nama: "Large", tambah: 4000 },
    ],
  },
  ayam: {
    nama: "Level Pedas",
    pilihan: [
      { id: "0", nama: "Tidak Pedas", tambah: 0 },
      { id: "1", nama: "Pedas Sedang", tambah: 0 },
      { id: "2", nama: "Pedas Maksimal", tambah: 0 },
    ],
  },
};

// ============================================================
// VOUCHER — kode diskon
// ============================================================
export const VOUCHER = [
  { kode: "HEMAT10", tipe: "persen", nilai: 10, min: 50000, ket: "Diskon 10%, min. Rp 50.000" },
  { kode: "HEMAT20", tipe: "persen", nilai: 20, min: 100000, ket: "Diskon 20%, min. Rp 100.000" },
  { kode: "GRATIS5", tipe: "nominal", nilai: 5000, min: 30000, ket: "Potongan Rp 5.000, min. Rp 30.000" },
  { kode: "NEWUSER", tipe: "nominal", nilai: 15000, min: 40000, ket: "Potongan Rp 15.000, min. Rp 40.000" },
];

/** Cari & validasi voucher terhadap subtotal. */
export function cekVoucher(kode, subtotal) {
  const v = VOUCHER.find(
    (x) => x.kode.toLowerCase() === String(kode).trim().toLowerCase()
  );
  if (!v) return { ok: false, pesan: "Kode voucher tidak ditemukan" };
  if (subtotal < v.min)
    return {
      ok: false,
      pesan: `Minimal belanja ${rupiah(v.min)} untuk pakai voucher ini`,
    };
  const diskon =
    v.tipe === "persen"
      ? Math.round((subtotal * v.nilai) / 100)
      : v.nilai;
  return { ok: true, voucher: v, diskon, pesan: `Voucher ${v.kode} dipakai!` };
}

/** Hitung total pesanan. */
export function hitungTotal(keranjang, diskon = 0) {
  const subtotal = keranjang.reduce((s, x) => s + x.harga * x.qty, 0);
  const setelahDiskon = Math.max(0, subtotal - diskon);
  const pajak = Math.round((setelahDiskon * PAJAK_PERSEN) / 100);
  return { subtotal, diskon, pajak, total: setelahDiskon + pajak };
}
