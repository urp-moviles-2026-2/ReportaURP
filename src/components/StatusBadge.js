import { View, Text, StyleSheet } from "react-native";
import { colors, fontSize, fontWeight, radius, spacing } from "../theme";

const STATUS_CONFIG = {
  pending:    { label: "Pendiente",   color: colors.statusPending },
  inProgress: { label: "En proceso",  color: colors.statusInProgress },
  resolved:   { label: "Resuelto",    color: colors.statusResolved },
};

export default function StatusBadge({ status = "pending", style }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;

  return (
    <View style={[styles.badge, { backgroundColor: config.color + "22" }, style]}>
      <View style={[styles.dot, { backgroundColor: config.color }]} />
      <Text style={[styles.label, { color: config.color }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: radius.full,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    gap: spacing.xs,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: radius.full,
  },
  label: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
});