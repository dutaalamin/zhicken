import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { warna, LEBAR_MAKS } from "../theme";
import { useStore } from "../store/Store";

const MENU_AKUN = [
  { id: "alamat", nama: "Alamat Pengiriman", ikon: "location-outline" },
  { id: "voucher", nama: "Voucher Saya", ikon: "ticket-outline" },
  { id: "bantuan", nama: "Bantuan", ikon: "help-circle-outline" },
];

export default function AkunScreen({ navigation }) {
  const { user, keluar, alamat, riwayat } = useStore();

  const buka = (id) => {
    if (id === "alamat") navigation.navigate("Alamat");
    else if (id === "voucher") navigation.navigate("Voucher");
    else if (id === "bantuan") navigation.navigate("Bantuan");
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View className="w-full self-center" style={{ maxWidth: LEBAR_MAKS }}>
          <Text className="font-hitam text-teks text-[26px] px-5 pt-3 pb-4">
            Akun
          </Text>

          {/* Kartu profil */}
          <View className="flex-row items-center gap-3 mx-5 p-4 rounded-lg bg-bgabu">
            <View className="w-14 h-14 rounded-full bg-merah items-center justify-center">
              <Ionicons
                name={user ? "person" : "person-outline"}
                size={26}
                color={warna.putih}
              />
            </View>
            <View className="flex-1">
              <Text className="font-ekstra text-teks text-[17px]">
                {user ? user.nama : "Tamu"}
              </Text>
              <Text className="font-sedang text-abu text-[13px] mt-1">
                {user ? user.telepon : "Masuk untuk nikmati promo"}
              </Text>
            </View>
            {user ? (
              <TouchableOpacity
                className="px-4 py-2.5 rounded-sm border border-garis active:opacity-70"
                onPress={keluar}
              >
                <Text className="font-ekstra text-abu text-[13px]">Keluar</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="bg-merah px-5 py-2.5 rounded-sm active:opacity-85"
                onPress={() => navigation.navigate("Masuk")}
              >
                <Text className="font-ekstra text-white text-[13px]">Masuk</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Poin */}
          <View className="flex-row items-center justify-between mx-5 mt-4 p-5 rounded-lg bg-merah-lembut">
            <View>
              <Text className="font-ekstra text-abu text-[13px]">
                Poin Kamu
              </Text>
              <Text className="font-hitam text-teks text-[21px] mt-1">
                {riwayat.length * 100} poin
              </Text>
            </View>
            <Ionicons name="gift" size={34} color={warna.merah} />
          </View>

          {/* Pesanan */}
          <TouchableOpacity
            className="flex-row items-center gap-3 mx-5 mt-4 p-4 rounded-lg border border-garis active:opacity-70"
            onPress={() => navigation.getParent()?.navigate("Pesanan")}
          >
            <View className="w-10 h-10 rounded-sm bg-bgabu items-center justify-center">
              <Ionicons name="receipt-outline" size={20} color={warna.teks} />
            </View>
            <Text className="flex-1 font-ekstra text-teks text-[15px]">
              Pesanan Saya
            </Text>
            {riwayat.length > 0 && (
              <View className="bg-merah-lembut px-2.5 py-0.5 rounded-full">
                <Text className="font-ekstra text-merah text-[11.5px]">
                  {riwayat.length}
                </Text>
              </View>
            )}
            <Ionicons name="chevron-forward" size={18} color={warna.abu} />
          </TouchableOpacity>

          {/* Menu lainnya */}
          <View className="mx-5 mt-3 rounded-lg border border-garis overflow-hidden">
            {MENU_AKUN.map((m, i) => (
              <TouchableOpacity
                key={m.id}
                className={`flex-row items-center gap-3 p-4 active:opacity-70 ${
                  i < MENU_AKUN.length - 1 ? "border-b border-garis" : ""
                }`}
                onPress={() => buka(m.id)}
              >
                <View className="w-10 h-10 rounded-sm bg-bgabu items-center justify-center">
                  <Ionicons name={m.ikon} size={20} color={warna.teks} />
                </View>
                <Text className="flex-1 font-ekstra text-teks text-[15px]">
                  {m.nama}
                </Text>
                {m.id === "alamat" && alamat.length > 0 && (
                  <View className="bg-merah-lembut px-2.5 py-0.5 rounded-full">
                    <Text className="font-ekstra text-merah text-[11.5px]">
                      {alamat.length}
                    </Text>
                  </View>
                )}
                <Ionicons name="chevron-forward" size={18} color={warna.abu} />
              </TouchableOpacity>
            ))}
          </View>

          <View className="items-center mt-6 mb-2">
            <Text className="font-sedang text-abu text-[12px]">
              Zhicken v1.0.0
            </Text>
            <Text className="font-sedang text-abu text-[11px] mt-0.5">
              Ayam crispy & burger
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
