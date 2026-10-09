import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { spacing } from "../theme";

import ReportButton  from "../components/ReportButton";
import StatusBadge   from "../components/StatusBadge";
import ReportCard    from "../components/ReportCard";
import SearchInput   from "../components/SearchInput";
import CategoryChip  from "../components/CategoryChip";

function ReportButtonDemo() {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.demo}>
      <ReportButton label={`Reportar (${count})`} onPress={() => setCount(c => c + 1)} />
      <ReportButton label="Deshabilitado" disabled />
    </View>
  );
}

function StatusBadgeDemo() {
  const statuses = ["pending", "inProgress", "resolved"];
  const [idx, setIdx] = useState(0);
  return (
    <View style={styles.demo}>
      <StatusBadge status={statuses[idx]} />
      <ReportButton label="Cambiar estado" onPress={() => setIdx(i => (i + 1) % 3)} />
    </View>
  );
}

function ReportCardDemo() {
  return (
    <View style={styles.demo}>
      <ReportCard
        title="Luz quemada en baño de biblioteca"
        location="Pabellón A — Piso 2"
        status="pending"
        onPress={() => {}}
      />
      <ReportCard
        title="Fuga de agua en cafetería"
        location="Edificio Central"
        status="inProgress"
        onPress={() => {}}
      />
    </View>
  );
}

function SearchInputDemo() {
  const [query, setQuery] = useState("");
  return (
    <View style={styles.demo}>
      <SearchInput value={query} onChangeText={setQuery} />
      <Text style={{ marginTop: 8 }}>Valor: "{query}"</Text>
    </View>
  );
}

function CategoryChipDemo() {
  const categories = ["Infraestructura", "Limpieza", "Seguridad", "Otro"];
  const [active, setActive] = useState("Infraestructura");
  return (
    <View style={[styles.demo, { flexDirection: "row", flexWrap: "wrap", gap: 8 }]}>
      {categories.map(cat => (
        <CategoryChip
          key={cat}
          label={cat}
          active={active === cat}
          onPress={() => setActive(cat)}
        />
      ))}
    </View>
  );
}

export const CATALOG = [
  {
    name: "ReportButton",
    category: "Acciones",
    description: "Botón principal para enviar un reporte",
    Demo: ReportButtonDemo,
  },
  {
    name: "CategoryChip",
    category: "Acciones",
    description: "Chip seleccionable para filtrar por categoría",
    Demo: CategoryChipDemo,
  },
  {
    name: "SearchInput",
    category: "Entradas",
    description: "Campo de búsqueda controlado",
    Demo: SearchInputDemo,
  },
  {
    name: "StatusBadge",
    category: "Datos",
    description: "Badge que muestra el estado de un reporte",
    Demo: StatusBadgeDemo,
  },
  {
    name: "ReportCard",
    category: "Contenedores",
    description: "Tarjeta que muestra un reporte con su estado",
    Demo: ReportCardDemo,
  },
];

const styles = StyleSheet.create({
  demo: { gap: spacing.md },
});