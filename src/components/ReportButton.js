import { Pressable, Text, StyleSheet } from "react-native";
import { colors, fontSize, fontWeight, radius, spacing } from "../theme";

export default function ReportButton({ label = "Reportar", onPress, disabled = false, style }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    alignItems: "center",
  },
  pressed:  { opacity: 0.75 },
  disabled: { opacity: 0.4 },
  label: {
    color: colors.textInverted,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
});