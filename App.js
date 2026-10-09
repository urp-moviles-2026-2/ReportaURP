import React, { useState } from "react";
import {
  SafeAreaView, ScrollView, View, Text, FlatList,
  StyleSheet, Pressable,
} from "react-native";
import { colors, fontSize, fontWeight, spacing, radius } from "./src/theme";
import { CATALOG } from "./src/viewer/catalog";
import SearchInput   from "./src/components/SearchInput";
import CategoryChip  from "./src/components/CategoryChip";
import ReportCard    from "./src/components/ReportCard";
import ReportButton  from "./src/components/ReportButton";

// ─── Pantalla real: Lista de reportes ─────────────────────────────────────────
const REPORTS = [
  { id: "1", title: "Luz quemada en baño de biblioteca", location: "Pabellón A — Piso 2", status: "pending",    category: "Infraestructura" },
  { id: "2", title: "Fuga de agua en cafetería",         location: "Edificio Central",      status: "inProgress", category: "Infraestructura" },
  { id: "3", title: "Basura acumulada en estacionamiento",location: "Estacionamiento Sur",  status: "resolved",   category: "Limpieza" },
  { id: "4", title: "Cámara de seguridad sin funcionar", location: "Entrada principal",     status: "pending",    category: "Seguridad" },
];
const CATEGORIES = ["Todos", "Infraestructura", "Limpieza", "Seguridad", "Otro"];

function ReportsScreen() {
  const [search, setSearch]     = useState("");
  const [category, setCategory] = useState("Todos");

  const filtered = REPORTS.filter(r => {
    const matchCat  = category === "Todos" || r.category === category;
    const matchText = r.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchText;
  });

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.screenTitle}>Reporta URP</Text>
      <SearchInput value={search} onChangeText={setSearch} style={{ marginBottom: spacing.md }} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.md }}>
        <View style={{ flexDirection: "row", gap: spacing.sm }}>
          {CATEGORIES.map(cat => (
            <CategoryChip key={cat} label={cat} active={category === cat} onPress={() => setCategory(cat)} />
          ))}
        </View>
      </ScrollView>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ReportCard
            title={item.title}
            location={item.location}
            status={item.status}
            onPress={() => {}}
            style={{ marginBottom: spacing.sm }}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Sin reportes</Text>}
      />
      <ReportButton label="+ Nuevo reporte" onPress={() => {}} style={{ margin: spacing.md }} />
    </View>
  );
}

// ─── Catálogo ──────────────────────────────────────────────────────────────────
function CatalogScreen() {
  const [selected, setSelected] = useState(null);

  if (selected) {
    const { name, description, Demo } = selected;
    return (
      <ScrollView contentContainerStyle={styles.previewContainer}>
        <Pressable onPress={() => setSelected(null)}>
          <Text style={styles.back}>← Volver</Text>
        </Pressable>
        <Text style={styles.previewTitle}>{name}</Text>
        <Text style={styles.previewDesc}>{description}</Text>
        <View style={styles.demoBox}><Demo /></View>
      </ScrollView>
    );
  }

  const grouped = CATALOG.reduce((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {});

  return (
    <ScrollView contentContainerStyle={styles.catalogContainer}>
      <Text style={styles.screenTitle}>Catálogo</Text>
      {Object.entries(grouped).map(([cat, items]) => (
        <View key={cat}>
          <Text style={styles.categoryHeader}>{cat}</Text>
          {items.map(item => (
            <Pressable key={item.name} style={styles.catalogItem} onPress={() => setSelected(item)}>
              <Text style={styles.catalogItemName}>{item.name}</Text>
              <Text style={styles.catalogItemDesc}>{item.description}</Text>
            </Pressable>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

// ─── Root ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("reports");

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        {tab === "reports" ? <ReportsScreen /> : <CatalogScreen />}
      </View>
      <View style={styles.tabBar}>
        {[
          { key: "reports",  label: "Reportes" },
          { key: "catalog",  label: "Catálogo" },
        ].map(t => (
          <Pressable key={t.key} style={styles.tab} onPress={() => setTab(t.key)}>
            <Text style={[styles.tabLabel, tab === t.key && styles.tabActive]}>{t.label}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root:             { flex: 1, backgroundColor: colors.background },
  content:          { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.lg },
  screenTitle:      { fontSize: fontSize.xl, fontWeight: fontWeight.bold, color: colors.text, marginBottom: spacing.lg },
  empty:            { color: colors.textSecondary, textAlign: "center", marginTop: spacing.xl },
  tabBar:           { flexDirection: "row", borderTopWidth: 1, borderColor: colors.border },
  tab:              { flex: 1, alignItems: "center", paddingVertical: spacing.md },
  tabLabel:         { fontSize: fontSize.sm, color: colors.textSecondary },
  tabActive:        { color: colors.primary, fontWeight: fontWeight.bold },
  previewContainer: { padding: spacing.lg, gap: spacing.md },
  back:             { color: colors.primary, fontSize: fontSize.md, marginBottom: spacing.sm },
  previewTitle:     { fontSize: fontSize.xl, fontWeight: fontWeight.bold, color: colors.text },
  previewDesc:      { fontSize: fontSize.sm, color: colors.textSecondary },
  demoBox:          { marginTop: spacing.lg, padding: spacing.lg, backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border },
  catalogContainer: { padding: spacing.lg },
  categoryHeader:   { fontSize: fontSize.sm, fontWeight: fontWeight.bold, color: colors.textSecondary, textTransform: "uppercase", marginTop: spacing.lg, marginBottom: spacing.sm },
  catalogItem:      { padding: spacing.md, backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.sm },
  catalogItemName:  { fontSize: fontSize.md, fontWeight: fontWeight.semibold, color: colors.text },
  catalogItemDesc:  { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
});