import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { spacing, radius } from './spacing';

/**
 * Estilos comunes reutilizables — Reporta URP
 *
 * Uso:  import { common } from '../theme';
 *       <View style={common.screen}>…</View>
 *       <Pressable style={common.btnPrimary}>…</Pressable>
 */

export const common = StyleSheet.create({
  /* ── contenedores ────────────────────────── */
  screen: {
    flex: 1,
    backgroundColor: colors.bgScreen,
  },
  screenPadded: {
    flex: 1,
    backgroundColor: colors.bgScreen,
    padding: spacing.md,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ── tarjetas ────────────────────────────── */
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    // sombra sutil (Android + iOS)
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  /* ── botones ─────────────────────────────── */
  btnPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm + 4,     // 12
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimaryText: {
    color: colors.textInverse,
    fontSize: 15,
    fontWeight: '600',
  },
  btnOutline: {
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: spacing.sm + 2,     // 10
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnOutlineText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '600',
  },
  btnGhost: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ── inputs ──────────────────────────────── */
  input: {
    backgroundColor: colors.bgInput,
    borderRadius: radius.sm,
    paddingVertical: spacing.sm + 4,     // 12
    paddingHorizontal: spacing.md,
    fontSize: 15,
    color: colors.textPrimary,
  },
  searchBar: {
    backgroundColor: colors.bgInput,
    borderRadius: radius.full,
    paddingVertical: spacing.sm + 2,     // 10
    paddingHorizontal: spacing.md,
    fontSize: 14,
    color: colors.textPrimary,
  },

  /* ── separadores ─────────────────────────── */
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },

  /* ── filas ───────────────────────────────── */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  /* ── avatar ──────────────────────────────── */
  avatarSm: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarMd: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLg: {
    width: 72,
    height: 72,
    borderRadius: radius.full,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ── FAB (Floating Action Button) ────────── */
  fab: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.md,
    width: 56,
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    // sombra
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },

  /* ── status badge ────────────────────────── */
  badge: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.full,
    alignSelf: 'flex-start',
  },
});
