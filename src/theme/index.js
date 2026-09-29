// Re-export token + alias kompatibilitas
export * from "./tokens";
import { spasi, sudut } from "./tokens";

// Alias lama supaya file lain tidak pecah
export const jarak = {
  xs: spasi.sm,
  sm: spasi.md,
  md: spasi.lg,
  lg: spasi.xxl,
  xl: spasi.xxxl,
};

export const radius = {
  sm: sudut.sm,
  md: sudut.md,
  lg: sudut.lg,
  xl: sudut.xl,
};
