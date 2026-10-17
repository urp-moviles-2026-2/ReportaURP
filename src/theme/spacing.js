/**
 * Tokens de espaciado — Reporta URP
 *
 * Uso:  import { spacing, radius } from '../theme';
 *       { padding: spacing.md, borderRadius: radius.lg }
 *
 * Escala de 4 px para mantener consistencia visual.
 */

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999, // círculos perfectos (avatar, FAB)
};
