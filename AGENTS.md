# Aturan Desain — WAJIB DIPATUHI

Semua perubahan UI di project ini **harus** ikut aturan di bawah. Tujuannya:
hasil konsisten, tidak "kaku", dan tidak terlihat amatir.

---

## 0. Styling: NativeWind (Tailwind untuk React Native)

### Font & Library
- Font resmi: **Inter** (400/500/600/700/800). Pakai `font-reguler`/`font-sedang`/
  `font-tebal`/`font-ekstra`/`font-hitam`. Jangan pakai font lain tanpa alasan.
- Library komponen: **gluestack-ui** (`@gluestack-ui/themed`). Pakai komponennya
  (`Button`, `Input`, `Card`, `Modal`, `Spinner`, …) untuk elemen baru.
  Provider sudah dipasang di `App.jsx` (`GluestackUIProvider`).
- Jangan campur banyak sistem: NativeWind untuk layout, gluestack untuk komponen.


### Navigasi (penting)
- Tab bawah hanya **4**: Beranda, Promo, Pesanan, Akun.
- **TIDAK ADA tab/layar Keranjang, TIDAK ADA tombol mengambang, TIDAK ADA Favorit.**
- Pola **order-first**:
  - Tap `+` pada kartu menu → item **langsung masuk draft di tab Pesanan**.
  - Kartu menu menampilkan **stepper** `[ −  n  + ]` (merah) saat item sudah ada.
  - Tab Pesanan menampung: **draft (belum dibayar) → bayar → tracking → riwayat**.
- Layar `Detail` ada di dalam stack `Beranda`. Setelah "Tambah Pesanan", kembali ke Beranda.
- Dari tab lain, pindah tab pakai `navigation.getParent()?.navigate("NamaTab")`.

- Tulis gaya pakai **`className`** (NativeWind), bukan `StyleSheet` baru.
- Warna/radius/ukuran diambil dari `tailwind.config.js` — **jangan** pakai `#hex` mentah.
- Nama warna tersedia: `merah`, `merah-gelap`, `merah-lembut`, `kuning`, `kuning-gelap`,
  `kuning-lembut`, `bgabu`, `abumuda`, `garis`, `abu`, `teks`, `hijau`.
- Font: `font-reguler`, `font-sedang`, `font-tebal`, `font-ekstra`, `font-hitam`.
- Sudut: `rounded-xs` (6) `rounded-sm` (10) `rounded-md` (14) `rounded-lg` (18) `rounded-xl` (24).
- `StyleSheet` hanya untuk nilai dinamis (lebar dihitung, `maxWidth`, animasi).
- Untuk nilai langka, pakai arbitrary value: `h-[52px]`, `text-[13px]`, `bg-black/40`.

---

## 1. Sumber tunggal: design token

**JANGAN pernah hardcode** warna, jarak, ukuran font, atau sudut di komponen.
Semua **wajib** import dari `src/theme`:

```js
import { warna, spasi, sudut, font, bayang, ukuran } from "../theme";
```

Kalau butuh nilai yang belum ada di token → **tambah ke token dulu**, jangan langsung tulis angka.

---

## 2. Warna

- Maksimal **1 warna aksen utama** untuk aksi (sekarang: merah `#db0007`).
- Kuning `#ffbc0d` hanya untuk **sorotan/sekunder**, bukan aksi utama.
- Latar default **putih**. Abu hanya untuk pemisah/blok sekunder.
- **Tidak boleh** menambah warna baru tanpa alasan kuat.
- Teks utama pakai `warna.teks`, teks sekunder `warna.teksLembut`/`warna.abu`.

---

## 3. Jarak (spacing)

- Semua jarak **kelipatan 4**, pakai skala `spasi`.
- Padding kartu: `spasi.lg` (16).
- Jarak antar kartu: `spasi.md` (12) s/d `spasi.lg` (16).
- Padding layar kiri-kanan: `spasi.xl` (20).
- **Dilarang** pakai angka aneh seperti 13, 17, 23.

---

## 4. Tipografi

- Maksimal **3 tingkat judul** + **2 tingkat isi** (lihat `font`).
- Jangan campur terlalu banyak ukuran. Ambil dari `font.*`, jangan tulis `fontSize` langsung.
- Berat: judul `900`, subjudul `800`, isi `500–600`.
- `letterSpacing` negatif tipis untuk judul besar (sudah ada di token).

---

## 5. Sudut & bayangan

- Sudut hanya dari `sudut`: 6 / 10 / 14 / 18 / 24 / bulat.
- Bayangan **hanya 2 tingkat**: `bayang.kartu` (diam) & `bayang.mengambang` (aktif/mengambang).
- **Hindari** border + bayangan tebal bersamaan. Pilih salah satu.

---

## 6. Prinsip tampilan

1. **Banyak ruang kosong** — jangan penuhi semua area.
2. **Satu fokus per layar** — mata tahu harus lihat ke mana.
3. **Hierarki jelas** — judul besar, isi kecil, aksi menonjol.
4. **Foto dominan** untuk produk makanan (min. 150px tinggi di kartu).
5. **Aksi utama** selalu tombol penuh warna, besar, mudah dijangkau jempol.
6. **Konsisten** — komponen sama di semua layar.

---

## 7. Komponen

- Tombol/kartu dibuat **sekali** sebagai komponen reusable di `src/components`.
- Jangan bikin gaya tombol baru tiap layar.
- Semua elemen yang bisa ditekan **wajib** punya efek tekan (`activeOpacity` / `Pressable`).

---

## 8. Cara kerja (untuk agen AI)

1. **Selalu screenshot** hasil di viewport HP (390×844) sebelum bilang selesai.
2. Bandingkan dengan aturan di atas. Kalau melanggar → perbaiki dulu.
3. **Jangan improvisasi warna/jarak** di luar token.
4. Kalau ragu, pilih yang **lebih sederhana & lebih lega**.
5. Setelah ubah, jelaskan singkat: apa yang diubah & kenapa.

---

## 9. Larangan

- ❌ Hardcode `#hex` atau angka jarak di file komponen
- ❌ Lebih dari 1 warna aksen
- ❌ Font terlalu banyak ukuran/berat
- ❌ Border tebal + shadow tebal bersamaan
- ❌ Kartu/teks terlalu rapat (padding < 12)
- ❌ Tombol kecil untuk aksi utama
