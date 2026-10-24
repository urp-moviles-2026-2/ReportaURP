/**
 * Configuración de navegación para el theme — Reporta URP
 *
 * Uso en App.js:
 *   import { navTheme, headerStyle, tabBarStyle } from './src/theme';
 *
 * navTheme    → se pasa a <NavigationContainer theme={navTheme}>
 * headerStyle → screenOptions para stacks
 * tabBarStyle → screenOptions para bottom tabs
 */

import { colors } from './colors';

export const navTheme = {
  dark: false,
  colors: {
    primary: colors.primary,
    background: colors.bgScreen,
    card: colors.bgCard,
    text: colors.textPrimary,
    border: colors.borderLight,
    notification: colors.secondary,
  },
};

export const headerStyle = {
  headerTintColor: colors.textPrimary,
  headerTitleStyle: {
    fontWeight: '700',
    fontSize: 18,
  },
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: colors.bgCard,
  },
};

export const tabBarStyle = {
  headerShown: false,
  tabBarActiveTintColor: colors.tabActive,
  tabBarInactiveTintColor: colors.tabInactive,
  tabBarStyle: {
    backgroundColor: colors.bgCard,
    borderTopColor: colors.borderLight,
    borderTopWidth: 1,
    paddingBottom: 4,
    height: 56,
  },
  tabBarLabelStyle: {
    fontSize: 11,
    fontWeight: '600',
  },
};
