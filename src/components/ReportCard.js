import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors, fontSize, fontWeight, radius, spacing } from "../theme";
import StatusBadge from "./StatusBadge";

export default function ReportCard({ title, location, status, onPress, style }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed, style]}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <StatusBadge status={status} />
      </View>
      <Text style={styles.location}>📍 {location}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  pressed: { opacity: 0.85 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  location: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
});