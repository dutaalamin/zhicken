import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { warna, LEBAR_MAKS } from "../theme";
import { VOUCHER, rupiah } from "../data/menu";

export default function VoucherScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View
        className="flex-1 w-full self-center"
        style={{ maxWidth: LEBAR_MAKS }}
      >
        <View className="flex-row items-center gap-3 px-4 py-2">
          <TouchableOpacity
            className="w-11 h-11 rounded-md bg-bgabu items-center justify-center active:opacity-70"
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color={warna.teks} />
          </TouchableOpacity>
          <Text className="font-hitam text-teks text-[21px]">Voucher Saya</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        >
          <Text className="font-sedang text-abu text-[13px] mb-4">
            Pakai kode di bawah saat memesan untuk dapat diskon
          </Text>

          {VOUCHER.map((v) => (
            <View
              key={v.kode}
              className="flex-row items-center gap-4 p-4 rounded-lg border border-garis mb-3"
            >
              <View className="w-12 h-12 rounded-md bg-merah-lembut items-center justify-center">
                <Ionicons name="ticket" size={22} color={warna.merah} />
              </View>
              <View className="flex-1">
                <View className="flex-row items-center gap-2">
                  <Text className="font-hitam text-teks text-[16px] tracking-wide">
                    {v.kode}
                  </Text>
                  <View className="bg-merah px-2 py-0.5 rounded-xs">
                    <Text className="font-ekstra text-white text-[9.5px]">
                      {v.tipe === "persen" ? `${v.nilai}%` : "POTONGAN"}
                    </Text>
                  </View>
                </View>
                <Text className="font-sedang text-abu text-[12.5px] mt-1">
                  {v.ket}
                </Text>
              </View>
            </View>
          ))}

          <View className="bg-bgabu rounded-lg p-4 mt-2">
            <Text className="font-ekstra text-teks text-[13.5px] mb-2">
              Cara pakai
            </Text>
            <Text className="font-sedang text-abu text-[12.5px] leading-[19px]">
              1. Tambahkan menu ke pesanan{"\n"}
              2. Buka tab Pesanan{"\n"}
              3. Masukkan kode di kolom "Kode Voucher"{"\n"}
              4. Tekan "Pakai" — diskon langsung terhitung
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
