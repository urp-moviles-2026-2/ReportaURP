# Mapa de navegación — Reporta URP

## Árbol de navigators

RootStack
├── Main (Tabs)              ← solo con sesión
│   ├── InicioTab (Stack)
│   │   ├── Inicio          ← lista de reportes del campus
│   │   └── DetalleReporte  ← params: { id }
│   ├── BuscarTab
│   │   └── Buscar
│   └── PerfilTab
│       └── Perfil
├── NuevoReporte (modal)     ← solo con sesión
└── Login                    ← solo sin sesión

## Tabla de rutas

| Ruta | Navigator | Se llega desde | Params | Qué muestra |
|------|-----------|----------------|--------|-------------|
| Inicio | InicioTab (Stack) | tab Inicio | — | Lista de reportes del campus |
| DetalleReporte | InicioTab (Stack) | Inicio, Perfil | { id } | Reporte real leído del store por `id` (número o string); like y, si es tuyo, Eliminar. Si no existe, "Este reporte ya no existe". El título del header es "Reporte" |
| Buscar | BuscarTab | tab Buscar | — | Buscador por categoría o zona |
| Perfil | PerfilTab | tab Perfil | — | Datos del estudiante y sus reportes publicados (del store) |
| NuevoReporte | RootStack (modal, solo con sesión) | Inicio, Perfil (botón +) | — | Formulario nuevo reporte |
| Login | RootStack (solo sin sesión, sin modal) | Arranque de la app, o al cerrar sesión en Perfil | — | Inicio de sesión |

## Navegación anidada desde Perfil

DetalleReporte vive dentro de InicioTab, así que desde Perfil se navega con anidación:

```js
navigation.navigate('InicioTab', { screen: 'DetalleReporte', params: { id } });
```

## Flujo de sesión

`SesionProvider` (`src/context/SesionContext.js`) envuelve la navegación y `RootStack` usa la propiedad `if` de la API estática:

- Sin sesión, solo existe `Login`; la app arranca ahí.
- Con sesión (`iniciarSesion`), `Login` desaparece y quedan `Main` y `NuevoReporte`. React Navigation cambia de pantalla solo.
- `cerrarSesion` (botón en Perfil) quita `Main` y `NuevoReporte` y vuelve a `Login`.
