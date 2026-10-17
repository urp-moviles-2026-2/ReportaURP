import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing, radius, common } from '../theme';

/**
 * Componente Placeholder reutilizable.
 * Ahora consume tokens del theme centralizado.
 */
export default function Placeholder({ title, description, links = [] }) {
  const navigation = useNavigation();
  return (
    <View style={common.screenPadded}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={[typography.h1, { marginBottom: spacing.sm }]}>{title}</Text>
        <Text
          style={[
            typography.bodySmall,
            { textAlign: 'center', marginBottom: spacing.lg },
          ]}
        >
          {description}
        </Text>

        {links.map((l) => (
          <Pressable
            key={l.label}
            style={[common.btnPrimary, { width: '100%', marginBottom: spacing.sm }]}
            onPress={() => navigation.navigate(l.to, l.params)}
          >
            <Text style={common.btnPrimaryText}>{l.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}