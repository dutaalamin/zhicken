import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { warna, LEBAR_MAKS } from "../theme";
import { useStore } from "../store/Store";

export default function AlamatScreen({ navigation }) {
  const { alamat, tambahAlamat, hapusAlamat } = useStore();
  const [formBuka, setFormBuka] = useState(false);
  const [label, setLabel] = useState("");
  const [detail, setDetail] = useState("");
  const [error, setError] = useState("");

  const simpan = () => {
    if (!label.trim()) return setError("Label wajib diisi (mis. Rumah).");
    if (!detail.trim()) return setError("Alamat lengkap wajib diisi.");
    tambahAlamat(label, detail);
    setLabel("");
    setDetail("");
    setError("");
    setFormBuka(false);
  };

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
          <Text className="font-hitam text-teks text-[21px]">
            Alamat Pengiriman
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        >
          {alamat.length === 0 && !formBuka && (
            <View className="items-center py-16">
              <View className="w-[90px] h-[90px] rounded-full bg-bgabu items-center justify-center mb-5">
                <Ionicons name="location-outline" size={38} color={warna.abu} />
              </View>
              <Text className="font-ekstra text-teks text-[17px]">
                Belum Ada Alamat
              </Text>
              <Text className="font-sedang text-abu text-[13.5px] text-center mt-2">
                Tambahkan alamat untuk pengiriman
              </Text>
            </View>
          )}

          {alamat.map((a) => (
            <View
              key={a.id}
              className="flex-row items-start gap-3 p-4 rounded-lg border border-garis mb-3"
            >
              <View className="w-10 h-10 rounded-sm bg-merah-lembut items-center justify-center">
                <Ionicons name="location" size={19} color={warna.merah} />
              </View>
              <View className="flex-1">
                <Text className="font-ekstra text-teks text-[15px]">
                  {a.label}
                </Text>
                <Text className="font-sedang text-abu text-[13px] mt-1 leading-[19px]">
                  {a.detail}
                </Text>
              </View>
              <TouchableOpacity
                className="w-8 h-8 rounded-xs bg-bgabu items-center justify-center active:opacity-70"
                onPress={() => hapusAlamat(a.id)}
              >
                <Ionicons name="trash-outline" size={15} color={warna.abu} />
              </TouchableOpacity>
            </View>
          ))}

          {formBuka ? (
            <View className="p-4 rounded-lg border border-garis mt-1">
              <Text className="font-ekstra text-teks text-[15px] mb-3">
                Alamat Baru
              </Text>

              <Text className="font-ekstra text-teks text-[12.5px] mb-1.5">
                Label
              </Text>
              <TextInput
                className="bg-bgabu rounded-md px-4 py-3 font-sedang text-teks text-[14px] mb-3"
                placeholder="Rumah / Kantor / dll"
                placeholderTextColor={warna.abu}
                value={label}
                onChangeText={(t) => {
                  setLabel(t);
                  setError("");
                }}
              />

              <Text className="font-ekstra text-teks text-[12.5px] mb-1.5">
                Alamat Lengkap
              </Text>
              <TextInput
                className="bg-bgabu rounded-md px-4 py-3 font-sedang text-teks text-[14px] min-h-[80px] mb-2"
                placeholder="Jalan, nomor, RT/RW, kelurahan, kota"
                placeholderTextColor={warna.abu}
                value={detail}
                onChangeText={(t) => {
                  setDetail(t);
                  setError("");
                }}
                multiline
              />

              {error ? (
                <Text className="font-sedang text-merah text-[12.5px] mb-2">
                  {error}
                </Text>
              ) : null}

              <View className="flex-row gap-2 mt-1">
                <TouchableOpacity
                  className="flex-1 py-3 rounded-md border border-garis items-center active:opacity-70"
                  onPress={() => {
                    setFormBuka(false);
                    setLabel("");
                    setDetail("");
                    setError("");
                  }}
                >
                  <Text className="font-ekstra text-abu text-[14px]">
                    Batal
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 py-3 rounded-md bg-merah items-center active:opacity-85"
                  onPress={simpan}
                >
                  <Text className="font-ekstra text-white text-[14px]">
                    Simpan
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              className="flex-row items-center justify-center gap-2 py-4 rounded-md border-[1.5px] border-dashed border-garis mt-2 active:opacity-70"
              onPress={() => setFormBuka(true)}
            >
              <Ionicons name="add" size={19} color={warna.merah} />
              <Text className="font-ekstra text-merah text-[14.5px]">
                Tambah Alamat
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
