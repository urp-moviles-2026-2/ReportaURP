import { View, Pressable, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, spacing } from '../theme';

const TOTAL = 5;

export default function StarRating({ value = 0, onChange }) {
  return (
    <View style={styles.row} accessibilityRole="radiogroup">
      {Array.from({ length: TOTAL }, (_, i) => {
        const n = i + 1;
        const activa = n <= value;
        return (
          <Pressable
            key={n}
            onPress={() => onChange?.(n)}
            hitSlop={6}
            accessibilityRole="radio"
            accessibilityLabel={`${n} de ${TOTAL} estrellas`}
            accessibilityState={{ selected: n === value }}
          >
            <Ionicons
              name={activa ? 'star' : 'star-outline'}
              size={32}
              color={activa ? colors.secondary : colors.textTertiary}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
});
