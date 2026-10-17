import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InicioScreen from './src/screens/InicioScreen';
import DetalleReporteScreen from './src/screens/DetalleReporteScreen';
import NuevoReporteScreen from './src/screens/NuevoReporteScreen';
import BuscarScreen from './src/screens/BuscarScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import LoginScreen from './src/screens/LoginScreen';

const InicioStack = createNativeStackNavigator({
  screens: {
    Inicio: { screen: InicioScreen, options: { title: 'Reporta URP' } },
    DetalleReporte: { screen: DetalleReporteScreen },
  },
});

const Tabs = createBottomTabNavigator({
  screenOptions: { headerShown: false },
  screens: {
    InicioTab: { screen: InicioStack, options: { title: 'Inicio' } },
    BuscarTab: { screen: BuscarScreen, options: { title: 'Buscar' } },
    PerfilTab: { screen: PerfilScreen, options: { title: 'Perfil' } },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    Main: { screen: Tabs, options: { headerShown: false } },
    NuevoReporte: { screen: NuevoReporteScreen, options: { presentation: 'modal', title: 'Nuevo reporte' } },
    Login: { screen: LoginScreen, options: { presentation: 'modal', title: 'Iniciar sesión' } },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}