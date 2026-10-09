export const palette = {
  primary:  { 700: "#0D47A1", 500: "#1565C0", 100: "#BBDEFB" },
  status: {
    pending:    "#F57C00",
    inProgress: "#1565C0",
    resolved:   "#2E7D32",
  },
  neutral:  { 900: "#212121", 600: "#757575", 200: "#EEEEEE", 50: "#FAFAFA" },
  danger:   "#C62828",
  white:    "#FFFFFF",
};

export const colors = {
  primary:         palette.primary[500],
  primaryLight:    palette.primary[100],
  background:      palette.neutral[50],
  surface:         palette.white,
  text:            palette.neutral[900],
  textSecondary:   palette.neutral[600],
  border:          palette.neutral[200],
  textInverted:    palette.white,
  danger:          palette.danger,
  statusPending:   palette.status.pending,
  statusInProgress:palette.status.inProgress,
  statusResolved:  palette.status.resolved,
};