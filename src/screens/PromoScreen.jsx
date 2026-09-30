import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { warna, LEBAR_MAKS } from "../theme";
import { MENU, rupiah } from "../data/menu";
import { useStore } from "../store/Store";

const DAFTAR = MENU.filter((m) => m.promo);

export default function PromoScreen() {
  const { tambah } = useStore();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View className="w-full self-center" style={{ maxWidth: LEBAR_MAKS }}>
        <View className="px-5 pt-3 pb-2">
          <Text className="font-hitam text-teks text-[26px]">Promo Spesial</Text>
          <Text className="font-sedang text-abu text-[13px] mt-1">
            Hemat sampai 30% hari ini
          </Text>
        </View>

        <FlatList
          data={DAFTAR}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 20, gap: 12, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="flex-row gap-3 bg-white rounded-lg border border-garis p-3">
              <Image
                source={{ uri: item.gambar }}
                className="w-24 h-24 rounded-md bg-abumuda"
              />
              <View className="flex-1">
                <View className="self-start bg-merah px-2 py-[3px] rounded-xs mb-2">
                  <Text className="font-ekstra text-white text-[9.5px]">
                    PROMO
                  </Text>
                </View>
                <Text className="font-ekstra text-teks text-[16px]">
                  {item.nama}
                </Text>
                <View className="flex-row items-center justify-between mt-3">
                  <Text className="font-hitam text-merah text-[16px]">
                    {rupiah(item.harga)}
                  </Text>
                  <TouchableOpacity
                    className="w-9 h-9 rounded-md bg-merah items-center justify-center active:opacity-80"
                    onPress={() => tambah(item)}
                  >
                    <Ionicons name="add" size={19} color={warna.putih} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
