import { View, StyleSheet } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import InicioScreen from './src/screens/InicioScreen';
import DetalleReporteScreen from './src/screens/DetalleReporteScreen';
import NuevoReporteScreen from './src/screens/NuevoReporteScreen';
import BuscarScreen from './src/screens/BuscarScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import LoginScreen from './src/screens/LoginScreen';

import { colors, headerStyle } from './src/theme';

// Píldora para el ícono activo en el tab bar (estilo mockup)
function TabIcon({ name, focused }) {
  return (
    <View style={[styles.tabIconContainer, focused && styles.tabIconActive]}>
      <Ionicons
        name={focused ? name : `${name}-outline`}
        size={22}
        color={focused ? colors.primary : colors.textTertiary}
      />
    </View>
  );
}

const InicioStack = createNativeStackNavigator({
  screenOptions: headerStyle,
  screens: {
    Inicio: { screen: InicioScreen, options: { title: 'Reporta URP' } },
    DetalleReporte: { screen: DetalleReporteScreen },
  },
});

const Tabs = createBottomTabNavigator({
  screenOptions: {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
      backgroundColor: colors.bgCard,
      borderTopColor: colors.borderLight,
      borderTopWidth: 1,
      height: 60,
      paddingTop: 6,
    },
  },
  screens: {
    InicioTab: {
      screen: InicioStack,
      options: {
        tabBarIcon: ({ focused }) => <TabIcon name="home" focused={focused} />,
      },
    },
    BuscarTab: {
      screen: BuscarScreen,
      options: {
        tabBarIcon: ({ focused }) => <TabIcon name="search" focused={focused} />,
      },
    },
    PerfilTab: {
      screen: PerfilScreen,
      options: {
        tabBarIcon: ({ focused }) => <TabIcon name="person" focused={focused} />,
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    Main: { screen: Tabs, options: { headerShown: false } },
    NuevoReporte: {
      screen: NuevoReporteScreen,
      options: { presentation: 'modal', headerShown: false },
    },
    Login: {
      screen: LoginScreen,
      options: { presentation: 'modal', headerShown: false },
    },
  },
});

const styles = StyleSheet.create({
  tabIconContainer: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tabIconActive: {
    backgroundColor: colors.primaryLight,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}