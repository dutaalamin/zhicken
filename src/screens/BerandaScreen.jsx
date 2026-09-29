import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { warna, LEBAR_MAKS } from "../theme";
import { MENU, KATEGORI, PROMO, rupiah } from "../data/menu";
import KartuMenu from "../components/KartuMenu";
import KartuSkeleton from "../components/KartuSkeleton";
import { useStore } from "../store/Store";

const KOLOM = 2;

export default function BerandaScreen({ navigation }) {
  const [kategori, setKategori] = useState("semua");
  const [cari, setCari] = useState("");
  const [memuat, setMemuat] = useState(true);
  const { jumlah } = useStore();

  // Simulasi memuat data (skeleton) — di app nyata ini diganti fetch API
  useEffect(() => {
    const t = setTimeout(() => setMemuat(false), 700);
    return () => clearTimeout(t);
  }, []);

  const lebarLayar = Dimensions.get("window").width;
  const lebarKonten = Math.min(lebarLayar, LEBAR_MAKS);
  const ukuranKartu = (lebarKonten - 20 * 2 - 12) / KOLOM;

  const daftar = useMemo(() => {
    let d = MENU;
    if (kategori === "promo") d = d.filter((m) => m.promo);
    else if (kategori !== "semua")
      d = d.filter((m) => m.kategori === kategori);
    if (cari.trim()) {
      const q = cari.toLowerCase();
      d = d.filter(
        (m) =>
          m.nama.toLowerCase().includes(q) ||
          m.deskripsi.toLowerCase().includes(q)
      );
    }
    return d;
  }, [kategori, cari]);

  const judulBagian = cari.trim()
    ? `Hasil "${cari}"`
    : kategori === "semua"
    ? "Menu Kami"
    : KATEGORI.find((k) => k.id === kategori)?.nama;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center px-5 pt-2 pb-1 w-full self-center">
        <Text
          className="font-hitam text-merah text-[27px]"
          style={{ letterSpacing: -1 }}
        >
          Zhicken
        </Text>
      </View>

      {/* Pencarian */}
      <View className="flex-row items-center gap-3 bg-bgabu rounded-md px-4 py-[14px] mx-5 mt-3 mb-2">
        <Ionicons name="search" size={18} color={warna.abu} />
        <TextInput
          className="flex-1 font-sedang text-teks text-[15px] p-0"
          placeholder="Mau makan apa hari ini?"
          placeholderTextColor={warna.abu}
          value={cari}
          onChangeText={setCari}
        />
      </View>

      <FlatList
        data={daftar}
        keyExtractor={(item) => item.id}
        numColumns={KOLOM}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
          width: "100%",
          maxWidth: LEBAR_MAKS,
          alignSelf: "center",
        }}
        columnWrapperStyle={{ gap: 12, paddingHorizontal: 20 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListHeaderComponent={
          <>
            {/* Banner promo */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
            >
              {PROMO.map((p, i) => (
                <View
                  key={i}
                  className="h-[170px] rounded-xl overflow-hidden bg-[#3f434a]"
                  style={{ width: lebarKonten - 20 * 2 - 34 }}
                >
                  <Image source={{ uri: p.gambar }} className="w-full h-full" />
                  <View className="absolute inset-0 justify-end p-5 bg-black/40">
                    <View className="self-start bg-merah px-3 py-1 rounded-xs mb-2">
                      <Text className="font-ekstra text-white text-[10px] tracking-wider">
                        PROMO
                      </Text>
                    </View>
                    <Text className="font-hitam text-white text-[21px]">
                      {p.judul}
                    </Text>
                    <Text className="font-sedang text-white/90 text-[13px]">
                      {p.ket}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Kategori */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
              style={{ marginTop: 20 }}
            >
              {KATEGORI.map((k) => {
                const aktif = kategori === k.id;
                return (
                  <TouchableOpacity
                    key={k.id}
                    onPress={() => setKategori(k.id)}
                    className={`px-5 py-3 rounded-full ${
                      aktif ? "bg-merah" : "bg-bgabu"
                    }`}
                  >
                    <Text
                      className={`font-ekstra text-[13px] ${
                        aktif ? "text-white" : "text-teks"
                      }`}
                    >
                      {k.nama}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <Text className="font-hitam text-teks text-[21px] px-5 mt-5 mb-4">
              {judulBagian}
            </Text>
          </>
        }
        renderItem={({ item }) =>
          memuat ? (
            <KartuSkeleton lebar={ukuranKartu} />
          ) : (
            <KartuMenu
              menu={item}
              lebar={ukuranKartu}
              onPress={(m) => navigation.navigate("Detail", { menu: m })}
            />
          )
        }
        ListEmptyComponent={
          <View className="items-center py-16">
            <Text className="text-[40px]">🔍</Text>
            <Text className="font-sedang text-abu mt-3">
              Menu tidak ditemukan
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
