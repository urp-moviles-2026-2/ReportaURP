import { StyleSheet } from 'react-native';
import { colors } from './colors';

/**
 * Tipografía centralizada — Reporta URP
 *
 * Uso:  import { typography } from '../theme';
 *       <Text style={typography.h1}>Título</Text>
 *
 * La jerarquía sigue la escala de los mockups:
 *   h1 → header de sección (Actividad, Explorar, Perfil)
 *   h2 → título de tarjeta / nombre de usuario
 *   h3 → subtítulo / categoría
 *   body → texto de post / descripción
 *   caption → timestamps, contadores
 *   label → etiquetas de botón / tabs
 *   link → texto con acción (color primario)
 */

export const typography = StyleSheet.create({
  h1: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  h2: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  h3: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  body: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textPrimary,
    lineHeight: 22,
  },
  bodySmall: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 18,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.textTertiary,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  link: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textLink,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
