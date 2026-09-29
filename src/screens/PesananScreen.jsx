import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { warna, LEBAR_MAKS } from "../theme";
import { rupiah, PAJAK_PERSEN, cekVoucher } from "../data/menu";
import { useStore } from "../store/Store";

const METODE = [
  { id: "tunai", nama: "Tunai di Kasir", ikon: "cash-outline" },
  { id: "kartu", nama: "Kartu Debit/Kredit", ikon: "card-outline" },
  { id: "qris", nama: "QRIS", ikon: "qr-code-outline" },
];

const TAHAP = [
  { id: "diproses", nama: "Diterima", ikon: "receipt-outline" },
  { id: "dimasak", nama: "Dimasak", ikon: "flame-outline" },
  { id: "siap", nama: "Siap", ikon: "checkmark-done-outline" },
];

function waktu(n) {
  const d = new Date(n);
  return `${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes()
  ).padStart(2, "0")}`;
}

function KartuTracking({ pesanan, onMajukan, onSelesai }) {
  const maju = useRef(new Animated.Value(0)).current;
  const idx = TAHAP.findIndex((t) => t.id === pesanan.status);

  useEffect(() => {
    Animated.timing(maju, {
      toValue: idx,
      duration: 420,
      useNativeDriver: false,
    }).start();
  }, [idx, maju]);

  const lebar = maju.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ["0%", "50%", "100%"],
  });

  return (
    <View className="mx-5 mt-4 rounded-lg bg-merah-lembut border border-merah/20 p-5">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="font-ekstra text-abu text-[12px]">
            PESANAN AKTIF
          </Text>
          <Text className="font-hitam text-merah text-[30px] mt-1">
            #{pesanan.nomor}
          </Text>
        </View>
        <View className="items-end">
          <Text className="font-sedang text-abu text-[12px]">Total</Text>
          <Text className="font-hitam text-teks text-[17px]">
            {rupiah(pesanan.total)}
          </Text>
        </View>
      </View>

      <View className="mt-5">
        <View className="h-1.5 bg-white rounded-full overflow-hidden">
          <Animated.View
            className="h-full bg-merah rounded-full"
            style={{ width: lebar }}
          />
        </View>
        <View className="flex-row justify-between mt-3">
          {TAHAP.map((t, i) => {
            const lewat = i <= idx;
            return (
              <View key={t.id} className="items-center" style={{ width: "33%" }}>
                <View
                  className={`w-9 h-9 rounded-full items-center justify-center ${
                    lewat ? "bg-merah" : "bg-white border border-garis"
                  }`}
                >
                  <Ionicons
                    name={t.ikon}
                    size={17}
                    color={lewat ? warna.putih : warna.abu}
                  />
                </View>
                <Text
                  className={`font-ekstra text-[10.5px] mt-1.5 text-center ${
                    lewat ? "text-merah" : "text-abu"
                  }`}
                >
                  {t.nama}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      <TouchableOpacity
        className={`mt-5 py-3.5 rounded-md items-center active:opacity-85 ${
          idx < TAHAP.length - 1 ? "bg-merah" : "bg-hijau"
        }`}
        onPress={idx < TAHAP.length - 1 ? onMajukan : onSelesai}
      >
        <Text className="font-ekstra text-white text-[15px]">
          {idx === 0
            ? "Mulai Dimasak"
            : idx === 1
            ? "Tandai Siap"
            : "Pesanan Diambil"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function PesananScreen({ navigation }) {
  const {
    items,
    tambah,
    kurang,
    hapus,
    subtotal,
    jumlahPerMenu,
    buatPesanan,
    riwayat,
    pesananAktif,
    majukanStatus,
    hapusPesananAktif,
    bersihkanRiwayat,
  } = useStore();

  const [metode, setMetode] = useState("tunai");
  const [kodeVoucher, setKodeVoucher] = useState("");
  const [voucher, setVoucher] = useState(null);
  const [pesanVoucher, setPesanVoucher] = useState(null);

  const diskon = voucher?.diskon ?? 0;
  const setelahDiskon = Math.max(0, subtotal - diskon);
  const pajak = Math.round((setelahDiskon * PAJAK_PERSEN) / 100);
  const total = setelahDiskon + pajak;

  const adaDraft = items.length > 0;

  const pakaiVoucher = () => {
    const hasil = cekVoucher(kodeVoucher, subtotal);
    if (hasil.ok) {
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      ).catch(() => {});
      setVoucher({ kode: hasil.voucher.kode, diskon: hasil.diskon });
      setPesanVoucher({ ok: true, teks: hasil.pesan });
    } else {
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Error
      ).catch(() => {});
      setVoucher(null);
      setPesanVoucher({ ok: false, teks: hasil.pesan });
    }
  };

  const bayar = () => {
    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    ).catch(() => {});
    buatPesanan({
      subtotal,
      pajak,
      diskon,
      total,
      metode: METODE.find((m) => m.id === metode)?.nama ?? metode,
      voucher: voucher?.kode ?? null,
    });
    setVoucher(null);
    setKodeVoucher("");
    setPesanVoucher(null);
  };

  const lama = useMemo(
    () => riwayat.filter((p) => !pesananAktif || p.nomor !== pesananAktif.nomor),
    [riwayat, pesananAktif]
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View
        className="flex-1 w-full self-center"
        style={{ maxWidth: LEBAR_MAKS }}
      >
        <View className="flex-row items-center justify-between px-5 pt-3 pb-3">
          <Text className="font-hitam text-teks text-[26px]">Pesanan</Text>
          {adaDraft && (
            <View className="bg-merah-lembut px-3 py-1 rounded-full">
              <Text className="font-ekstra text-merah text-[12px]">
                {items.reduce((s, x) => s + x.qty, 0)} item
              </Text>
            </View>
          )}
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          {/* ---------- DRAFT (belum dibayar) ---------- */}
          {adaDraft ? (
            <>
              <Text className="font-ekstra text-teks text-[17px] px-5 mb-1">
                Belum Dibayar
              </Text>

              {items.map((it) => (
                <View
                  key={it.kunci}
                  className="flex-row items-center gap-3 px-5 py-3"
                >
                  <Image
                    source={{ uri: it.gambar }}
                    className="w-[64px] h-[64px] rounded-md bg-abumuda"
                  />
                  <View className="flex-1">
                    <Text
                      className="font-ekstra text-teks text-[15.5px]"
                      numberOfLines={1}
                    >
                      {it.nama}
                    </Text>
                    {it.varian ? (
                      <Text className="font-sedang text-abu text-[11.5px] mt-0.5">
                        {it.varian}
                      </Text>
                    ) : null}
                    {it.catatan ? (
                      <Text
                        className="font-sedang text-abu text-[11px] mt-0.5 italic"
                        numberOfLines={1}
                      >
                        "{it.catatan}"
                      </Text>
                    ) : null}
                    <Text className="font-ekstra text-merah text-[13px] mt-1">
                      {rupiah(it.harga)}
                    </Text>
                  </View>

                  <View className="items-end gap-1.5">
                    <TouchableOpacity
                      className="w-[26px] h-[26px] rounded-xs bg-bgabu items-center justify-center active:opacity-70"
                      onPress={() => hapus(it.id)}
                    >
                      <Ionicons name="trash-outline" size={14} color={warna.abu} />
                    </TouchableOpacity>
                    <View className="flex-row items-center gap-2">
                      <TouchableOpacity
                        className="w-7 h-7 rounded-xs bg-bgabu items-center justify-center active:opacity-70"
                        onPress={() => {
                          if (it.qty <= 1) hapus(it.id);
                          else kurang(it.id);
                        }}
                      >
                        <Ionicons name="remove" size={15} color={warna.teks} />
                      </TouchableOpacity>
                      <Text className="font-ekstra text-[14.5px] min-w-[18px] text-center">
                        {it.qty}
                      </Text>
                      <TouchableOpacity
                        className="w-7 h-7 rounded-xs bg-merah items-center justify-center active:opacity-70"
                        onPress={() => tambah(it)}
                      >
                        <Ionicons name="add" size={15} color={warna.putih} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}

              {/* Voucher */}
              <Text className="font-ekstra text-teks text-[15px] px-5 mt-4 mb-2">
                Kode Voucher
              </Text>
              <View className="flex-row gap-2 px-5">
                <View className="flex-1 flex-row items-center gap-2 bg-bgabu rounded-md px-4">
                  <Ionicons name="ticket-outline" size={17} color={warna.abu} />
                  <TextInput
                    className="flex-1 font-sedang text-teks text-[14px] py-3"
                    placeholder="Masukkan kode"
                    placeholderTextColor={warna.abu}
                    value={kodeVoucher}
                    onChangeText={(t) => setKodeVoucher(t.toUpperCase())}
                    autoCapitalize="characters"
                  />
                </View>
                <TouchableOpacity
                  className="bg-teks px-5 rounded-md items-center justify-center active:opacity-85"
                  onPress={pakaiVoucher}
                >
                  <Text className="font-ekstra text-white text-[13.5px]">
                    Pakai
                  </Text>
                </TouchableOpacity>
              </View>
              {pesanVoucher && (
                <Text
                  className={`font-sedang text-[12.5px] px-5 mt-2 ${
                    pesanVoucher.ok ? "text-hijau" : "text-merah"
                  }`}
                >
                  {pesanVoucher.ok ? "✓ " : "✕ "}
                  {pesanVoucher.teks}
                </Text>
              )}
              {voucher && (
                <TouchableOpacity
                  className="flex-row items-center gap-2 mx-5 mt-2 self-start"
                  onPress={() => {
                    setVoucher(null);
                    setPesanVoucher(null);
                  }}
                >
                  <Ionicons name="close-circle" size={14} color={warna.abu} />
                  <Text className="font-sedang text-abu text-[12px]">
                    Hapus voucher {voucher.kode}
                  </Text>
                </TouchableOpacity>
              )}

              {/* Metode bayar */}
              <Text className="font-ekstra text-teks text-[15px] px-5 mt-5 mb-2">
                Metode Pembayaran
              </Text>
              {METODE.map((m) => {
                const aktif = metode === m.id;
                return (
                  <TouchableOpacity
                    key={m.id}
                    className={`flex-row items-center gap-3 mx-5 mb-2 p-3.5 rounded-md border-[1.5px] ${
                      aktif ? "border-merah bg-merah-lembut" : "border-garis"
                    }`}
                    onPress={() => {
                      Haptics.selectionAsync().catch(() => {});
                      setMetode(m.id);
                    }}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name={m.ikon}
                      size={20}
                      color={aktif ? warna.merah : warna.abu}
                    />
                    <Text
                      className={`flex-1 font-ekstra text-[14.5px] ${
                        aktif ? "text-teks" : "text-abu"
                      }`}
                    >
                      {m.nama}
                    </Text>
                    {aktif && (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color={warna.merah}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}

              {/* Ringkasan */}
              <View className="bg-bgabu rounded-lg p-5 mx-5 mt-3">
                <View className="flex-row justify-between items-center py-1.5">
                  <Text className="font-sedang text-abu text-[13px]">
                    Subtotal
                  </Text>
                  <Text className="font-ekstra text-teks text-[13px]">
                    {rupiah(subtotal)}
                  </Text>
                </View>
                {diskon > 0 && (
                  <View className="flex-row justify-between items-center py-1.5">
                    <Text className="font-sedang text-hijau text-[13px]">
                      Diskon ({voucher.kode})
                    </Text>
                    <Text className="font-ekstra text-hijau text-[13px]">
                      -{rupiah(diskon)}
                    </Text>
                  </View>
                )}
                <View className="flex-row justify-between items-center py-1.5">
                  <Text className="font-sedang text-abu text-[13px]">
                    Pajak (PPN {PAJAK_PERSEN}%)
                  </Text>
                  <Text className="font-ekstra text-teks text-[13px]">
                    {rupiah(pajak)}
                  </Text>
                </View>
                <View className="h-px bg-garis my-2" />
                <View className="flex-row justify-between items-center py-1.5">
                  <Text className="font-ekstra text-teks text-[17px]">Total</Text>
                  <Text className="font-hitam text-merah text-[20px]">
                    {rupiah(total)}
                  </Text>
                </View>
              </View>
            </>
          ) : pesananAktif ? (
            <KartuTracking
              pesanan={pesananAktif}
              onMajukan={majukanStatus}
              onSelesai={hapusPesananAktif}
            />
          ) : (
            <View className="mx-5 mt-4 rounded-lg bg-bgabu p-6 items-center">
              <Ionicons name="fast-food-outline" size={38} color={warna.abu} />
              <Text className="font-ekstra text-teks text-[15px] mt-3">
                Belum ada pesanan
              </Text>
              <Text className="font-sedang text-abu text-[13px] text-center mt-1">
                Tekan tombol + pada menu untuk mulai memesan
              </Text>
              <TouchableOpacity
                className="bg-merah px-6 py-3 rounded-md mt-4 active:opacity-85"
                onPress={() => navigation.navigate("Beranda")}
              >
                <Text className="font-ekstra text-white text-[14.5px]">
                  Lihat Menu
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ---------- RIWAYAT ---------- */}
          {lama.length > 0 && (
            <>
              <View className="flex-row items-center justify-between px-5 mt-7 mb-1">
                <Text className="font-ekstra text-teks text-[17px]">
                  Riwayat Pesanan
                </Text>
                <TouchableOpacity onPress={bersihkanRiwayat} activeOpacity={0.7}>
                  <Text className="font-ekstra text-merah text-[12.5px]">
                    Hapus
                  </Text>
                </TouchableOpacity>
              </View>

              {lama.map((p) => (
                <View
                  key={`${p.nomor}-${p.waktu}`}
                  className="mx-5 mt-3 rounded-lg border border-garis p-4"
                >
                  <View className="flex-row items-center justify-between">
                    <Text className="font-hitam text-teks text-[17px]">
                      #{p.nomor}
                    </Text>
                    <View
                      className={`px-3 py-1 rounded-full ${
                        p.status === "selesai"
                          ? "bg-hijau/10"
                          : "bg-merah-lembut"
                      }`}
                    >
                      <Text
                        className={`font-ekstra text-[11px] ${
                          p.status === "selesai" ? "text-hijau" : "text-merah"
                        }`}
                      >
                        {p.status === "selesai"
                          ? "SELESAI"
                          : p.status.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <Text className="font-sedang text-abu text-[12.5px] mt-1">
                    {waktu(p.waktu)} · {p.items.length} item · {p.metode}
                  </Text>

                  <View className="mt-3 gap-1">
                    {p.items.map((it, i) => (
                      <Text
                        key={i}
                        className="font-sedang text-teks text-[13px]"
                        numberOfLines={1}
                      >
                        {it.qty}x {it.nama}
                        {it.varian ? ` (${it.varian})` : ""}
                      </Text>
                    ))}
                  </View>

                  <View className="h-px bg-garis my-3" />
                  <View className="flex-row items-center justify-between">
                    <Text className="font-sedang text-abu text-[13px]">
                      Total dibayar
                    </Text>
                    <Text className="font-hitam text-teks text-[16px]">
                      {rupiah(p.total)}
                    </Text>
                  </View>
                </View>
              ))}
            </>
          )}
        </ScrollView>

        {/* Tombol bayar (menempel bawah) */}
        {adaDraft && (
          <View className="flex-row items-center justify-between px-5 pt-4 pb-5 border-t border-garis">
            <View>
              <Text className="font-sedang text-abu text-[13px]">
                Total Bayar
              </Text>
              <Text className="font-hitam text-teks text-[20px]">
                {rupiah(total)}
              </Text>
            </View>
            <TouchableOpacity
              className="bg-merah px-8 py-4 rounded-md active:opacity-85"
              onPress={bayar}
            >
              <Text className="font-ekstra text-white text-[15.5px]">
                Bayar Sekarang
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
