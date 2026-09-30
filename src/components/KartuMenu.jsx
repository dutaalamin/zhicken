import React from "react";
import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { warna } from "../theme";
import { rupiah } from "../data/menu";
import { useStore } from "../store/Store";

/**
 * Kartu menu.
 * - Belum dipesan  -> tombol "+" bulat merah
 * - Sudah dipesan  -> stepper [ - 1 + ] dengan angka merah
 */
export default function KartuMenu({ menu, onPress, lebar }) {
  const { tambah, kurang, jumlahPerMenu, hapus } = useStore();
  const habis = !menu.stok;
  const qty = jumlahPerMenu(menu.id);

  const getar = () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});

  const tekanTambah = () => {
    getar();
    tambah(menu);
  };

  const tekanKurang = () => {
    getar();
    if (qty <= 1) hapus(menu.id);
    else kurang(menu.id);
  };

  return (
    <Pressable
      className={`bg-white rounded-lg overflow-hidden ${
        habis ? "opacity-40" : "active:opacity-90"
      }`}
      style={[
        lebar ? { width: lebar } : null,
        {
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
          elevation: 3,
        },
      ]}
      onPress={() => !habis && onPress?.(menu)}
    >
      <View className="relative">
        <Image
          source={{ uri: menu.gambar }}
          className="w-full h-36 bg-abumuda"
        />

        {menu.promo && (
          <View className="absolute top-3 left-3 px-3 py-1 rounded-xs bg-merah">
            <Text className="font-ekstra text-white text-[10px] tracking-wider">
              PROMO
            </Text>
          </View>
        )}

        {habis && (
          <View className="absolute top-3 right-3 px-3 py-1 rounded-xs bg-black/85">
            <Text className="font-ekstra text-white text-[10px] tracking-wider">
              HABIS
            </Text>
          </View>
        )}
      </View>

      <View className="p-3.5">
        <Text
          className="font-ekstra text-teks text-[14.5px] leading-[19px] min-h-[38px]"
          numberOfLines={2}
        >
          {menu.nama}
        </Text>

        <View className="mt-2">
          <Text className="font-hitam text-teks text-[14px]" numberOfLines={1}>
            {rupiah(menu.harga)}
          </Text>

          {!habis && (
            <View className="mt-2 flex-row justify-end">
              {qty === 0 ? (
                <TouchableOpacity
                  className="w-8 h-8 rounded-md bg-merah items-center justify-center active:opacity-80"
                  onPress={tekanTambah}
                >
                  <Ionicons name="add" size={18} color={warna.putih} />
                </TouchableOpacity>
              ) : (
                <View className="flex-row items-center bg-merah rounded-md overflow-hidden">
                  <TouchableOpacity
                    className="w-8 h-8 items-center justify-center active:opacity-80"
                    onPress={tekanKurang}
                  >
                    <Ionicons name="remove" size={16} color={warna.putih} />
                  </TouchableOpacity>
                  <Text className="font-hitam text-white text-[14px] min-w-[20px] text-center">
                    {qty}
                  </Text>
                  <TouchableOpacity
                    className="w-8 h-8 items-center justify-center active:opacity-80"
                    onPress={tekanTambah}
                  >
                    <Ionicons name="add" size={16} color={warna.putih} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}
