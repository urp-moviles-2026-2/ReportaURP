/**
 * Paleta de colores centralizada — Reporta URP
 *
 * Uso:  import { colors } from '../theme';
 *
 * Convención:
 *  - primary   → acción principal (CTA, tab activa, enlaces)
 *  - secondary → acentos secundarios (badges, gradientes)
 *  - bg*       → fondos de pantalla / tarjetas / inputs
 *  - text*     → jerarquía tipográfica
 *  - status.*  → semáforo de estados del reporte
 *  - border    → bordes y separadores
 */

export const colors = {
  /* ── marca URP ───────────────────────────── */
  primary: '#1B7C3F',        // verde URP – botones, tab activa, links
  primaryLight: '#E8F5EC',   // fondo sutil verde (chips, badges activos)
  primaryDark: '#145C2E',    // texto sobre fondo claro cuando necesita contraste

  secondary: '#F4A223',      // naranja/ámbar – acento (FAB, badges, gradiente perfil)
  secondaryLight: '#FFF3E0', // fondo sutil naranja

  /* ── fondos ──────────────────────────────── */
  bgScreen: '#FAFAFA',       // fondo general de pantallas
  bgCard: '#FFFFFF',         // tarjetas / cards
  bgInput: '#F5F5F5',       // inputs, searchbar
  bgOverlay: 'rgba(0,0,0,0.45)', // overlay de modals

  /* ── tipografía ──────────────────────────── */
  textPrimary: '#1A1A1A',   // títulos, texto principal
  textSecondary: '#666666',  // descripciones, subtítulos
  textTertiary: '#999999',   // placeholders, timestamps
  textInverse: '#FFFFFF',    // texto sobre fondos oscuros / botones filled
  textLink: '#1B7C3F',       // links inline (= primary)

  /* ── estados de reporte ──────────────────── */
  status: {
    pending: '#F4A223',      // pendiente  (ámbar)
    inProgress: '#2196F3',   // en proceso (azul)
    resolved: '#1B7C3F',     // resuelto   (verde)
    rejected: '#E53935',     // rechazado  (rojo)
  },

  /* ── utilidades ──────────────────────────── */
  border: '#E0E0E0',         // bordes de tarjetas, dividers
  borderLight: '#F0F0F0',    // bordes muy sutiles
  danger: '#E53935',         // acciones destructivas
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  /* ── tab bar ─────────────────────────────── */
  tabActive: '#1B7C3F',
  tabInactive: '#999999',
};
