import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { warna, LEBAR_MAKS } from "../theme";
import { useStore } from "../store/Store";

export default function MasukScreen({ navigation }) {
  const { masuk } = useStore();
  const [nama, setNama] = useState("");
  const [telepon, setTelepon] = useState("");
  const [error, setError] = useState("");

  const kirim = () => {
    if (!nama.trim()) return setError("Nama wajib diisi.");
    if (!telepon.trim()) return setError("Nomor telepon wajib diisi.");
    if (telepon.replace(/\D/g, "").length < 9)
      return setError("Nomor telepon tidak valid.");
    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    ).catch(() => {});
    masuk(nama, telepon);
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View
          className="flex-1 w-full self-center px-6"
          style={{ maxWidth: LEBAR_MAKS }}
        >
          <View className="flex-row items-center gap-3 py-2">
            <TouchableOpacity
              className="w-11 h-11 rounded-md bg-bgabu items-center justify-center active:opacity-70"
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={22} color={warna.teks} />
            </TouchableOpacity>
          </View>

          <View className="items-center mt-6 mb-8">
            <View className="w-20 h-20 rounded-full bg-merah items-center justify-center">
              <Ionicons name="person" size={38} color={warna.putih} />
            </View>
            <Text className="font-hitam text-teks text-[24px] mt-4">
              Masuk ke Zhicken
            </Text>
            <Text className="font-sedang text-abu text-[13.5px] mt-1.5 text-center">
              Isi data untuk mulai memesan & kumpulkan poin
            </Text>
          </View>

          <Text className="font-ekstra text-teks text-[13px] mb-2">Nama</Text>
          <View className="flex-row items-center gap-2 bg-bgabu rounded-md px-4 mb-4">
            <Ionicons name="person-outline" size={18} color={warna.abu} />
            <TextInput
              className="flex-1 font-sedang text-teks text-[15px] py-3.5"
              placeholder="Nama lengkap"
              placeholderTextColor={warna.abu}
              value={nama}
              onChangeText={(t) => {
                setNama(t);
                setError("");
              }}
            />
          </View>

          <Text className="font-ekstra text-teks text-[13px] mb-2">
            Nomor Telepon
          </Text>
          <View className="flex-row items-center gap-2 bg-bgabu rounded-md px-4 mb-2">
            <Ionicons name="call-outline" size={18} color={warna.abu} />
            <TextInput
              className="flex-1 font-sedang text-teks text-[15px] py-3.5"
              placeholder="08xxxxxxxxxx"
              placeholderTextColor={warna.abu}
              keyboardType="phone-pad"
              value={telepon}
              onChangeText={(t) => {
                setTelepon(t);
                setError("");
              }}
            />
          </View>

          {error ? (
            <Text className="font-sedang text-merah text-[12.5px] mt-1">
              {error}
            </Text>
          ) : null}

          <TouchableOpacity
            className="bg-merah py-4 rounded-md items-center mt-6 active:opacity-85"
            onPress={kirim}
          >
            <Text className="font-ekstra text-white text-[16px]">Masuk</Text>
          </TouchableOpacity>

          <Text className="font-sedang text-abu text-[11.5px] text-center mt-4">
            Dengan masuk, kamu menyetujui syarat & ketentuan Zhicken
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
