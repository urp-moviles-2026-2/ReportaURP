import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, typography, spacing, radius, common } from '../theme';

const TENDENCIAS = [
  { id: '1', name: 'Luminarias del Campus', count: '842 reportes' },
  { id: '2', name: 'Servicios higiénicos', count: '615 reportes' },
  { id: '3', name: 'Equipos multimedia', count: '390 reportes' },
  { id: '4', name: 'Conectividad WiFi', count: '288 reportes' },
];

export default function BuscarScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={common.screenPadded} edges={['top']}>
      {/* Encabezado */}
      <Text style={[typography.h1, { marginBottom: spacing.xs }]}>Explorar</Text>
      <Text style={[typography.bodySmall, { marginBottom: spacing.md }]}>
        Encuentra reportes e incidencias del campus
      </Text>

      {/* Barra de búsqueda */}
      <View style={styles.searchRow}>
        <Ionicons name="search" size={18} color={colors.textTertiary} style={{ marginRight: spacing.sm }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar en Reporta URP"
          placeholderTextColor={colors.textTertiary}
          underlineColorAndroid="transparent"
        />
      </View>

      {/* Sección de tendencias */}
      <Text style={[typography.sectionHeader, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
        AHORA MISMO
      </Text>

      {TENDENCIAS.map((item) => (
        <Pressable
          key={item.id}
          style={styles.trendRow}
          onPress={() => navigation.navigate('InicioTab')}
        >
          <Text style={[typography.caption, { width: 28, color: colors.textTertiary }]}>
            {item.id.padStart(2, '0')}
          </Text>
          <View style={{ flex: 1 }}>
            <Text style={typography.label}>{item.name}</Text>
            <Text style={typography.caption}>{item.count}</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} />
        </Pressable>
      ))}

      {/* Botón flotante '+' en la esquina inferior derecha */}
      <Pressable
        style={styles.fab}
        onPress={() => navigation.navigate('NuevoReporte')}
        hitSlop={10}
      >
        <Ionicons name="add" size={26} color="#FFFFFF" />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgInput,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 0,
    fontSize: 14,
    color: colors.textPrimary,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
  },
  fab: {
    position: 'absolute',
    right: 18,
    bottom: 18,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
});