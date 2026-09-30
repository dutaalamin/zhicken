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
import { LinearGradient } from "expo-linear-gradient";
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
  const [promoAktif, setPromoAktif] = useState(0);
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
      <View className="flex-row items-center gap-2.5 bg-bgabu rounded-full px-4 h-[46px] mx-5 mt-3 mb-2">
        <Ionicons name="search" size={18} color={warna.abu} />
        <TextInput
          className="flex-1 font-sedang text-teks text-[14.5px] py-0"
          placeholder="Mau makan apa hari ini?"
          placeholderTextColor={warna.abu}
          value={cari}
          onChangeText={setCari}
          style={{ outlineStyle: "none" }}
        />
        {cari.length > 0 && (
          <TouchableOpacity
            onPress={() => setCari("")}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="close-circle" size={17} color={warna.abu} />
          </TouchableOpacity>
        )}
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
            <View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={lebarKonten - 20 * 2 - 34 + 12}
                decelerationRate="fast"
                contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
                scrollEventThrottle={16}
                onScroll={(e) => {
                  const x = e.nativeEvent.contentOffset.x;
                  const langkah = lebarKonten - 20 * 2 - 34 + 12;
                  setPromoAktif(Math.round(x / langkah));
                }}
              >
                {PROMO.map((p, i) => (
                  <TouchableOpacity
                    key={i}
                    activeOpacity={0.92}
                    onPress={() => navigation.navigate("Promo")}
                    className="h-[186px] rounded-2xl overflow-hidden bg-[#2a2a2a]"
                    style={{
                      width: lebarKonten - 20 * 2 - 34,
                      shadowColor: "#000",
                      shadowOpacity: 0.22,
                      shadowRadius: 14,
                      shadowOffset: { width: 0, height: 6 },
                      elevation: 5,
                    }}
                  >
                    <Image source={{ uri: p.gambar }} className="w-full h-full" />

                    {/* Gradient: terang di atas, gelap di bawah */}
                    <LinearGradient
                      colors={["rgba(0,0,0,0.45)", "rgba(0,0,0,0.1)", "rgba(0,0,0,0.95)"]}
                      locations={[0, 0.4, 1]}
                      className="absolute inset-0"
                    />

                    {/* Teks bawah */}
                    <View className="absolute inset-x-0 bottom-0 p-4">
                      <Text
                        className="font-hitam text-white text-[22px] leading-[26px]"
                        numberOfLines={2}
                      >
                        {p.judul}
                      </Text>
                      <View className="flex-row mt-3">
                        <View
                          className="px-5 py-2.5 rounded-full"
                          style={{
                            backgroundColor: p.warna,
                            shadowColor: p.warna,
                            shadowOpacity: 0.5,
                            shadowRadius: 8,
                            shadowOffset: { width: 0, height: 3 },
                            elevation: 4,
                          }}
                        >
                          <Text className="font-ekstra text-white text-[12.5px] tracking-[0.3px]">
                            Pesan Sekarang
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Titik indikator */}
              <View className="flex-row justify-center items-center mt-3" style={{ gap: 6 }}>
                {PROMO.map((_, i) => (
                  <View
                    key={i}
                    className="rounded-full"
                    style={{
                      width: promoAktif === i ? 18 : 6,
                      height: 6,
                      backgroundColor: promoAktif === i ? warna.merah : "#d9d9d9",
                    }}
                  />
                ))}
              </View>
            </View>

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
