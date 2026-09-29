import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { warna, LEBAR_MAKS } from "../theme";

const FAQ = [
  {
    t: "Bagaimana cara memesan?",
    j: "Tekan tombol + pada menu yang kamu mau. Pesanan langsung masuk ke tab Pesanan. Setelah selesai memilih, tekan Bayar Sekarang.",
  },
  {
    t: "Metode pembayaran apa saja?",
    j: "Kami menerima Tunai di Kasir, Kartu Debit/Kredit, dan QRIS.",
  },
  {
    t: "Bagaimana cara pakai voucher?",
    j: "Buka tab Pesanan, masukkan kode voucher di kolom yang tersedia, lalu tekan Pakai. Diskon akan langsung dihitung.",
  },
  {
    t: "Di mana melihat pesanan saya?",
    j: "Semua pesanan aktif dan riwayat ada di tab Pesanan. Status pesanan bisa dilihat di kartu pesanan aktif.",
  },
  {
    t: "Apakah data saya tersimpan?",
    j: "Ya. Pesanan, alamat, dan riwayat tersimpan di perangkat kamu, jadi tetap ada walau aplikasi ditutup.",
  },
  {
    t: "Bagaimana cara menghubungi kami?",
    j: "Hubungi kami di 0812-3456-7890 atau email cs@zhicken.id. Kami siap membantu setiap hari 08.00-22.00.",
  },
];

export default function BantuanScreen({ navigation }) {
  const [buka, setBuka] = useState(null);

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
          <Text className="font-hitam text-teks text-[21px]">Bantuan</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        >
          <Text className="font-sedang text-abu text-[13px] mb-4">
            Pertanyaan yang sering ditanyakan
          </Text>

          {FAQ.map((f, i) => {
            const terbuka = buka === i;
            return (
              <TouchableOpacity
                key={i}
                className="rounded-lg border border-garis mb-3 overflow-hidden active:opacity-90"
                onPress={() => setBuka(terbuka ? null : i)}
                activeOpacity={0.85}
              >
                <View className="flex-row items-center gap-3 p-4">
                  <Text className="flex-1 font-ekstra text-teks text-[14.5px] leading-[20px]">
                    {f.t}
                  </Text>
                  <Ionicons
                    name={terbuka ? "chevron-up" : "chevron-down"}
                    size={18}
                    color={warna.abu}
                  />
                </View>
                {terbuka && (
                  <View className="px-4 pb-4">
                    <Text className="font-sedang text-abu text-[13px] leading-[20px]">
                      {f.j}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}

          <View className="bg-merah-lembut rounded-lg p-5 mt-2 items-center">
            <Ionicons name="chatbubbles" size={30} color={warna.merah} />
            <Text className="font-ekstra text-teks text-[15px] mt-2">
              Masih butuh bantuan?
            </Text>
            <Text className="font-sedang text-abu text-[12.5px] text-center mt-1">
              Hubungi kami di 0812-3456-7890
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
