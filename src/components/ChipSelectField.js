import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { colors, typography, spacing, radius } from '../theme';

const capitalizar = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1);

export default function ChipSelectField({ control, name, label, options }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <View style={styles.wrapper}>
          {label ? <Text style={styles.label}>{label}</Text> : null}
          <View style={styles.chips}>
            {options.map((opcion) => {
              const seleccionado = value === opcion;
              return (
                <Pressable
                  key={opcion}
                  style={[styles.chip, seleccionado && styles.chipSelected]}
                  onPress={() => {
                    onChange(opcion);
                    onBlur();
                  }}
                  accessibilityRole="button"
                  accessibilityState={{ selected: seleccionado }}
                >
                  <Text style={[styles.chipText, seleccionado && styles.chipTextSelected]}>
                    {capitalizar(opcion)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          {error?.message ? (
            <Text style={styles.error} accessibilityRole="alert">
              {error.message}
            </Text>
          ) : null}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.label,
    marginBottom: spacing.xs,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bgCard,
  },
  chipSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  chipTextSelected: {
    color: colors.primaryDark,
    fontWeight: '700',
  },
  error: {
    ...typography.caption,
    color: colors.danger,
    marginTop: spacing.xs,
  },
});
