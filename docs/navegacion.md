# Mapa de navegación — Reporta URP

## Árbol de navigators

RootStack
├── Main (Tabs)
│   ├── InicioTab (Stack)
│   │   ├── Inicio          ← lista de reportes del campus
│   │   └── DetalleReporte  ← params: { id }
│   ├── BuscarTab
│   │   └── Buscar
│   └── PerfilTab
│       └── Perfil
├── NuevoReporte (modal)
└── Login (modal)

## Tabla de rutas

| Ruta | Navigator | Se llega desde | Params | Qué muestra |
|------|-----------|----------------|--------|-------------|
| Inicio | InicioTab (Stack) | tab Inicio | — | Lista de reportes del campus |
| DetalleReporte | InicioTab (Stack) | Inicio | { id } | Datos de un reporte específico |
| Buscar | BuscarTab | tab Buscar | — | Buscador por categoría o zona |
| Perfil | PerfilTab | tab Perfil | — | Datos del estudiante |
| NuevoReporte | RootStack (modal) | Inicio (botón +) | — | Formulario nuevo reporte |
| Login | RootStack (modal) | Perfil | — | Inicio de sesión |
