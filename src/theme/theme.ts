// src/theme/theme.ts

export const colors = {
  background: "#F6F5F2",
  card: "#FFFFFF",
  text: "#1C1B1F",
  textMuted: "#7A7880",
  primary: "#5B4CF0",
  border: "#E6E4DF",
  white: "#FFFFFF",
} as const;

// Alışkanlıklar için seçilebilecek renkler
export const habitColors = [
  "#3B82F6", // mavi
  "#F97316", // turuncu
  "#8B5CF6", // mor
  "#22C55E", // yeşil
  "#EC4899", // pembe
] as const;

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 4,      // ilerleme çubuğu
  md: 12,     // ikon kutusu
  lg: 16,     // alışkanlık kartı
  xl: 20,     // ilerleme kartı
  full: 999,  // tam yuvarlak: tik, buton, rozet
} as const;

export const fontSize = {
  caption: 13,   // kart alt yazısı
  small: 14,     // tarih, etiketler
  body: 16,      // kart başlığı
  subtitle: 18,  // bölüm başlığı
  heading: 22,   // ilerleme değeri
  title: 34,     // "Bugün"
} as const;

export const fontWeight = {
  regular: "400",
  semibold: "600",
  bold: "700",
} as const;

