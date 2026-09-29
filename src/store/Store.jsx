import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ============================================================
// STORE GLOBAL — draft pesanan, riwayat, pesanan aktif
// Semua otomatis tersimpan ke AsyncStorage (tetap ada walau
// aplikasi ditutup).
// ============================================================

const KUNCI = {
  keranjang: "@foodapp/keranjang",
  riwayat: "@foodapp/riwayat",
  pesanan: "@foodapp/pesanan-aktif",
  user: "@foodapp/user",
  alamat: "@foodapp/alamat",
};

const StoreContext = createContext(null);
export const useStore = () => useContext(StoreContext);

export function StoreProvider({ children }) {
  const [siap, setSiap] = useState(false);
  const [items, setItems] = useState([]);
  const [riwayat, setRiwayat] = useState([]); // array pesanan lama
  const [pesananAktif, setPesananAktif] = useState(null);
  const [user, setUser] = useState(null); // { nama, telepon }
  const [alamat, setAlamat] = useState([]); // daftar alamat

  // ---------- Muat dari penyimpanan saat app dibuka ----------
  useEffect(() => {
    (async () => {
      try {
        const [k, r, p, u, a] = await Promise.all([
          AsyncStorage.getItem(KUNCI.keranjang),
          AsyncStorage.getItem(KUNCI.riwayat),
          AsyncStorage.getItem(KUNCI.pesanan),
          AsyncStorage.getItem(KUNCI.user),
          AsyncStorage.getItem(KUNCI.alamat),
        ]);
        if (k) setItems(JSON.parse(k));
        if (r) {
          const list = JSON.parse(r);
          // Normalisasi: riwayat yang bukan pesanan aktif dianggap selesai
          const aktif = p ? JSON.parse(p) : null;
          setRiwayat(
            list.map((x) =>
              !aktif || x.nomor !== aktif.nomor
                ? x.status === "selesai"
                  ? x
                  : { ...x, status: "selesai" }
                : x
            )
          );
        }
        if (p) setPesananAktif(JSON.parse(p));
        if (u) setUser(JSON.parse(u));
        if (a) setAlamat(JSON.parse(a));
      } catch (e) {
        // diamkan; mulai dengan data kosong
      } finally {
        setSiap(true);
      }
    })();
  }, []);

  // ---------- Simpan otomatis saat berubah ----------
  useEffect(() => {
    if (siap) AsyncStorage.setItem(KUNCI.keranjang, JSON.stringify(items));
  }, [items, siap]);
  useEffect(() => {
    if (siap) AsyncStorage.setItem(KUNCI.riwayat, JSON.stringify(riwayat));
  }, [riwayat, siap]);
  useEffect(() => {
    if (siap) AsyncStorage.setItem(KUNCI.pesanan, JSON.stringify(pesananAktif));
  }, [pesananAktif, siap]);
  useEffect(() => {
    if (siap) AsyncStorage.setItem(KUNCI.user, JSON.stringify(user));
  }, [user, siap]);
  useEffect(() => {
    if (siap) AsyncStorage.setItem(KUNCI.alamat, JSON.stringify(alamat));
  }, [alamat, siap]);

  // ---------- Keranjang ----------
  const tambah = useCallback((menu, opsi) => {
    // opsi: { qty, catatan, varian } -> id unik per kombinasi
    const varian = opsi?.varian ?? null;
    const catatan = opsi?.catatan ?? "";
    const qty = opsi?.qty ?? 1;
    const kunci = `${menu.id}|${varian ?? ""}|${catatan}`;

    setItems((prev) => {
      const ada = prev.find((x) => x.kunci === kunci);
      if (ada) {
        return prev.map((x) =>
          x.kunci === kunci ? { ...x, qty: x.qty + qty } : x
        );
      }
      return [
        ...prev,
        { ...menu, kunci, varian, catatan, qty },
      ];
    });
  }, []);

  const kurang = useCallback((idMenu) => {
    setItems((prev) => {
      // Kurangi 1 dari item pertama dengan id menu ini
      const idx = prev.findIndex((x) => x.id === idMenu);
      if (idx === -1) return prev;
      const salinan = [...prev];
      salinan[idx] = { ...salinan[idx], qty: salinan[idx].qty - 1 };
      return salinan.filter((x) => x.qty > 0);
    });
  }, []);

  const hapus = useCallback((idMenu) => {
    setItems((prev) => prev.filter((x) => x.id !== idMenu));
  }, []);

  const jumlahPerMenu = useCallback(
    (idMenu) => items.filter((x) => x.id === idMenu).reduce((s, x) => s + x.qty, 0),
    [items]
  );

  const kosongkan = useCallback(() => setItems([]), []);

  // ---------- Pesanan ----------
  const buatPesanan = useCallback(
    ({ total, pajak, subtotal, diskon, metode, voucher }) => {
      const nomor = String(Math.floor(Math.random() * 900) + 100);
      const pesanan = {
        nomor,
        waktu: Date.now(),
        subtotal,
        pajak,
        diskon: diskon ?? 0,
        total,
        metode,
        voucher: voucher ?? null,
        status: "diproses", // diproses -> dimasak -> siap
        items: items.map((x) => ({
          id: x.id,
          nama: x.nama,
          harga: x.harga,
          qty: x.qty,
          varian: x.varian,
          catatan: x.catatan,
          gambar: x.gambar,
        })),
      };
      setPesananAktif(pesanan);
      setRiwayat((prev) => [pesanan, ...prev].slice(0, 30));
      setItems([]);
      return pesanan;
    },
    [items]
  );

  const majukanStatus = useCallback(() => {
    setPesananAktif((prev) => {
      if (!prev) return prev;
      const urutan = ["diproses", "dimasak", "siap"];
      const i = urutan.indexOf(prev.status);
      if (i < urutan.length - 1) return { ...prev, status: urutan[i + 1] };
      return prev;
    });
  }, []);

  const hapusPesananAktif = useCallback(() => {
    setPesananAktif((prev) => {
      if (prev) {
        // Tandai riwayat sebagai selesai
        setRiwayat((r) =>
          r.map((p) =>
            p.nomor === prev.nomor && p.waktu === prev.waktu
              ? { ...p, status: "selesai" }
              : p
          )
        );
      }
      return null;
    });
  }, []);

  const bersihkanRiwayat = useCallback(() => setRiwayat([]), []);

  // ---------- Pengguna & alamat ----------
  const masuk = useCallback((nama, telepon) => {
    setUser({ nama: nama.trim(), telepon: telepon.trim() });
  }, []);

  const keluar = useCallback(() => setUser(null), []);

  const tambahAlamat = useCallback((label, detail) => {
    setAlamat((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        label: label.trim(),
        detail: detail.trim(),
      },
    ]);
  }, []);

  const hapusAlamat = useCallback((id) => {
    setAlamat((prev) => prev.filter((a) => a.id !== id));
  }, []);

  // ---------- Hitungan turunan ----------
  const jumlah = useMemo(
    () => items.reduce((s, x) => s + x.qty, 0),
    [items]
  );
  const subtotal = useMemo(
    () => items.reduce((s, x) => s + x.harga * x.qty, 0),
    [items]
  );

  const nilai = {
    siap,
    // keranjang
    items,
    tambah,
    kurang,
    hapus,
    jumlahPerMenu,
    kosongkan,
    jumlah,
    subtotal,
    // pengguna
    user,
    masuk,
    keluar,
    alamat,
    tambahAlamat,
    hapusAlamat,
    // pesanan
    riwayat,
    pesananAktif,
    buatPesanan,
    majukanStatus,
    hapusPesananAktif,
    bersihkanRiwayat,
  };

  return (
    <StoreContext.Provider value={nilai}>{children}</StoreContext.Provider>
  );
}
