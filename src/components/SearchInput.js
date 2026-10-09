import { View, TextInput, StyleSheet } from "react-native";
import { colors, fontSize, radius, spacing } from "../theme";

export default function SearchInput({ value, onChangeText, placeholder = "Buscar reporte…", style }) {
  return (
    <View style={[styles.wrapper, style]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  input: {
    fontSize: fontSize.md,
    color: colors.text,
  },
});