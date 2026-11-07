import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Provider } from 'react-redux';

import InicioScreen from './src/screens/InicioScreen';
import DetalleReporteScreen from './src/screens/DetalleReporteScreen';
import NuevoReporteScreen from './src/screens/NuevoReporteScreen';
import BuscarScreen from './src/screens/BuscarScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import LoginScreen from './src/screens/LoginScreen';

import { store } from './src/store';
import { SesionProvider, useSesion } from './src/context/SesionContext';
import { colors, headerStyle } from './src/theme';

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
    tabBarActiveTintColor: colors.tabActive,
    tabBarInactiveTintColor: colors.tabInactive,
    tabBarStyle: {
      backgroundColor: colors.bgCard,
      borderTopColor: colors.borderLight,
      borderTopWidth: 1,
    },
  },
  screens: {
    InicioTab: {
      screen: InicioStack,
      options: {
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
        ),
      },
    },
    BuscarTab: {
      screen: BuscarScreen,
      options: {
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name={focused ? 'search' : 'search-outline'} size={size} color={color} />
        ),
      },
    },
    PerfilTab: {
      screen: PerfilScreen,
      options: {
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
        ),
      },
    },
  },
});

// Condiciones para la API estática: la app principal solo existe con sesión
const useEstaLogueado = () => useSesion().estaLogueado;
const useNoEstaLogueado = () => !useSesion().estaLogueado;

const RootStack = createNativeStackNavigator({
  screens: {
    Main: { if: useEstaLogueado, screen: Tabs, options: { headerShown: false } },
    NuevoReporte: {
      if: useEstaLogueado,
      screen: NuevoReporteScreen,
      options: { presentation: 'modal', headerShown: false },
    },
    Login: {
      if: useNoEstaLogueado,
      screen: LoginScreen,
      options: { headerShown: false },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <SesionProvider>
          <Navigation />
        </SesionProvider>
      </Provider>
    </SafeAreaProvider>
  );
}