import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { warna, LEBAR_MAKS } from "../theme";
import { rupiah, VARIAN } from "../data/menu";
import { useStore } from "../store/Store";
import Tombol from "../components/Tombol";

export default function DetailScreen({ route, navigation }) {
  const { menu } = route.params;
  const { tambah } = useStore();
  const [qty, setQty] = useState(1);
  const [catatan, setCatatan] = useState("");

  const opsiVarian = VARIAN[menu.kategori];
  const [pilihan, setPilihan] = useState(
    opsiVarian ? opsiVarian.pilihan[0].id : null
  );

  // Harga akhir = harga dasar + tambahan varian
  const tambahanVarian = useMemo(() => {
    if (!opsiVarian) return 0;
    const p = opsiVarian.pilihan.find((x) => x.id === pilihan);
    return p ? p.tambah : 0;
  }, [opsiVarian, pilihan]);

  const hargaSatuan = menu.harga + tambahanVarian;
  const namaVarian = opsiVarian
    ? opsiVarian.pilihan.find((x) => x.id === pilihan)?.nama
    : null;

  const simpan = () => {
    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    ).catch(() => {});
    tambah(
      { ...menu, harga: hargaSatuan },
      { qty, catatan, varian: namaVarian }
    );
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View className="flex-1 w-full self-center" style={{ maxWidth: LEBAR_MAKS }}>
        <View className="flex-row items-center justify-between px-4 py-2">
          <TouchableOpacity
            className="w-11 h-11 rounded-md bg-bgabu items-center justify-center active:opacity-70"
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close" size={22} color={warna.teks} />
          </TouchableOpacity>
          <Text className="font-ekstra text-teks text-[16px]">Detail Menu</Text>
          <View style={{ width: 42 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={{ uri: menu.gambar }}
            className="w-full h-[250px] bg-abumuda"
          />

          <View className="p-5">
            {menu.promo && (
              <View className="self-start bg-merah px-3 py-1 rounded-xs mb-2">
                <Text className="font-ekstra text-white text-[10px]">
                  PROMO
                </Text>
              </View>
            )}
            <Text className="font-hitam text-teks text-[26px]">{menu.nama}</Text>
            <Text className="font-hitam text-merah text-[21px] mt-1">
              {rupiah(hargaSatuan)}
            </Text>
            <Text className="font-sedang text-abu text-[15px] mt-3 leading-[22px]">
              {menu.deskripsi}
            </Text>

            <View className="flex-row items-center bg-bgabu rounded-md p-4 mt-5">
              <View className="flex-row items-center gap-2">
                <Ionicons name="star" size={17} color={warna.merah} />
                <Text className="font-ekstra text-teks text-[13px]">
                  4.9 (320 ulasan)
                </Text>
              </View>
            </View>

            {/* Varian */}
            {opsiVarian && (
              <>
                <Text className="font-ekstra text-teks text-[17px] mt-6 mb-3">
                  {opsiVarian.nama}
                </Text>
                <View className="gap-2">
                  {opsiVarian.pilihan.map((p) => {
                    const aktif = pilihan === p.id;
                    return (
                      <TouchableOpacity
                        key={p.id}
                        className={`flex-row items-center justify-between p-4 rounded-md border-[1.5px] ${
                          aktif ? "border-merah bg-merah-lembut" : "border-garis"
                        }`}
                        onPress={() => {
                          Haptics.selectionAsync().catch(() => {});
                          setPilihan(p.id);
                        }}
                        activeOpacity={0.8}
                      >
                        <Text
                          className={`font-ekstra text-[15px] ${
                            aktif ? "text-teks" : "text-abu"
                          }`}
                        >
                          {p.nama}
                        </Text>
                        <Text
                          className={`font-ekstra text-[13px] ${
                            aktif ? "text-merah" : "text-abu"
                          }`}
                        >
                          {p.tambah > 0 ? `+${rupiah(p.tambah)}` : "Gratis"}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </>
            )}

            {/* Catatan */}
            <Text className="font-ekstra text-teks text-[17px] mt-6 mb-3">
              Catatan (opsional)
            </Text>
            <TextInput
              className="bg-bgabu rounded-md p-4 font-sedang text-teks text-[14px] min-h-[56px]"
              placeholder="Contoh: tanpa bawang, extra saus..."
              placeholderTextColor={warna.abu}
              value={catatan}
              onChangeText={setCatatan}
              multiline
            />

            <Text className="font-ekstra text-teks text-[17px] mt-6 mb-3">
              Jumlah
            </Text>
            <View className="flex-row items-center gap-4">
              <TouchableOpacity
                className="w-12 h-12 rounded-md bg-bgabu items-center justify-center active:opacity-70"
                onPress={() => setQty((q) => Math.max(1, q - 1))}
              >
                <Ionicons name="remove" size={20} color={warna.teks} />
              </TouchableOpacity>
              <Text className="font-hitam text-[20px] min-w-[30px] text-center">
                {qty}
              </Text>
              <TouchableOpacity
                className="w-12 h-12 rounded-md bg-merah items-center justify-center active:opacity-70"
                onPress={() => setQty((q) => q + 1)}
              >
                <Ionicons name="add" size={20} color={warna.putih} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View className="flex-row items-center justify-between px-5 pt-4 pb-5 border-t border-garis">
          <View>
            <Text className="font-sedang text-abu text-[13px]">Total</Text>
            <Text className="font-hitam text-teks text-[20px]">
              {rupiah(hargaSatuan * qty)}
            </Text>
          </View>
          <Tombol
            judul="Tambah Pesanan"
            onPress={simpan}
            ikon={
              <Ionicons name="bag-add-outline" size={18} color={warna.putih} />
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
