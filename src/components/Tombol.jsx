import React from "react";
import {
  Button,
  ButtonText,
  ButtonIcon,
  Spinner,
} from "@gluestack-ui/themed";
import { warna } from "../theme";

/**
 * Tombol utama aplikasi — memakai komponen Button dari gluestack-ui.
 * varian: "utama" (merah) | "sekunder" (abu) | "garis" (outline)
 */
export default function Tombol({
  judul,
  onPress,
  varian = "utama",
  ikon,
  penuh = false,
  nonaktif = false,
  memuat = false,
  kecil = false,
}) {
  const aksi = {
    utama: {
      bg: warna.merah,
      bgPressed: warna.merahGelap,
      border: "transparent",
      teks: warna.putih,
    },
    sekunder: {
      bg: warna.bgAbu,
      bgPressed: warna.abuMuda,
      border: "transparent",
      teks: warna.teks,
    },
    garis: {
      bg: warna.putih,
      bgPressed: warna.bgAbu,
      border: warna.garis,
      teks: warna.teks,
    },
  }[varian];

  return (
    <Button
      onPress={onPress}
      isDisabled={nonaktif || memuat}
      width={penuh ? "100%" : undefined}
      height={kecil ? 40 : 52}
      px={kecil ? 16 : 24}
      borderRadius={14}
      bg={aksi.bg}
      borderWidth={varian === "garis" ? 1.5 : 0}
      borderColor={aksi.border}
      $active-bg={aksi.bgPressed}
      $disabled-opacity={0.5}
    >
      {memuat ? (
        <Spinner color={aksi.teks} />
      ) : (
        <>
          {ikon}
          <ButtonText
            color={aksi.teks}
            fontFamily="Inter_700Bold"
            fontSize={kecil ? 13 : 15.5}
            ml={ikon ? "$2" : "$0"}
          >
            {judul}
          </ButtonText>
        </>
      )}
    </Button>
  );
}
