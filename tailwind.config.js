/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.jsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        merah: "#db0007",
        "merah-gelap": "#a80005",
        "merah-lembut": "#fff1f1",
        // Alias lama -> kini memakai merah (satu warna saja)
        kuning: "#db0007",
        "kuning-gelap": "#a80005",
        "kuning-lembut": "#fff1f1",
        bgabu: "#f6f7f9",
        abumuda: "#eceef1",
        garis: "#e8eaee",
        abu: "#71767f",
        teks: "#141414",
        hijau: "#1a9e4b",
      },
      fontFamily: {
        reguler: ["Inter_400Regular"],
        sedang: ["Inter_500Medium"],
        tebal: ["Inter_600SemiBold"],
        ekstra: ["Inter_700Bold"],
        hitam: ["Inter_800ExtraBold"],
      },
      borderRadius: {
        xs: 6,
        sm: 10,
        md: 14,
        lg: 18,
        xl: 24,
      },
    },
  },
  plugins: [],
};
