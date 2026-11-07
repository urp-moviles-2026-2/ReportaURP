import { forwardRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors, typography, spacing, radius } from '../theme';

const TextField = forwardRef(function TextField(
  { label, error, valido, style, onFocus, onBlur, ...inputProps },
  ref
) {
  const [enfocado, setEnfocado] = useState(false);

  // Prioridad de borde: error > enfocado > válido > normal
  const borderColor = error
    ? colors.danger
    : enfocado
      ? colors.primary
      : valido
        ? colors.status.resolved
        : colors.border;

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        ref={ref}
        style={[styles.input, { borderColor }, inputProps.multiline && styles.multiline, style]}
        placeholderTextColor={colors.textTertiary}
        selectionColor={colors.primary}
        underlineColorAndroid="transparent"
        onFocus={(e) => {
          setEnfocado(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setEnfocado(false);
          onBlur?.(e);
        }}
        {...inputProps}
      />
      {error ? (
        <Text style={styles.error} accessibilityRole="alert">
          {error}
        </Text>
      ) : null}
    </View>
  );
});

export default TextField;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.label,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.bgInput,
    borderWidth: 1.5,
    borderRadius: radius.sm,
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.md,
    fontSize: 15,
    color: colors.textPrimary,
  },
  multiline: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
  error: {
    ...typography.caption,
    color: colors.danger,
    marginTop: spacing.xs,
  },
});
