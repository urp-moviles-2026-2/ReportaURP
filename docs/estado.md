# Estado de la app — Reporta URP

## Clasificación de datos

| Dato | Dónde vive | Por qué |
|------|-----------|---------|
| Valores y errores de un formulario (React Hook Form) | Local, en la pantalla | Solo los usa esa pantalla y se descartan al enviar |
| Pestaña activa "Para ti" / "Siguiendo" en Inicio | Local (`useState`) | Es preferencia visual de una sola pantalla |
| Reportes del feed (incluye likes) | Store (Redux, slice `reportes`) | Lo comparten Inicio y Nuevo Reporte |
| Sesión del usuario (Registro y Login) | Context (`SesionContext`) | Pendiente; se implementa en otra fase |

## Forma del store

```js
{
  reportes: {
    items: [
      {
        id,            // número (ejemplos) o string generado con nanoid (nuevos)
        author,        // nombre del autor
        username,      // @usuario
        avatar,        // URL o iniciales
        time,          // texto relativo, ej. '2 h' o 'ahora'
        text,          // texto que se muestra en el feed
        image,         // URL opcional
        location,      // ubicación del reporte
        comments, reposts, likes,
        liked,
        verified,      // opcional
        // solo en reportes creados desde el formulario:
        creadoEn,      // fecha ISO
        titulo, descripcion, categoria,
      },
    ],
  },
}
```

El estado inicial trae dos reportes de ejemplo.

## Acciones del slice `reportes`

Archivo: `src/store/reportesSlice.js`.

| Acción | Payload | Efecto |
|--------|---------|--------|
| `agregarReporte` | `{ titulo, descripcion, ubicacion, categoria }` (lo transforma `prepare`) | Crea un reporte con `id` (nanoid), `creadoEn` (ISO), autor Gerald Casas / @GeraldCasas, avatar 'GC', `time` 'ahora', `text` con título y descripción, contadores en 0, y lo agrega al inicio de `items` |
| `alternarLike` | `id` | Invierte `liked` del reporte y suma o resta 1 a `likes` |
| `eliminarReporte` | `id` | Quita el reporte de `items` |

## Selectores

| Selector | Devuelve |
|----------|----------|
| `selectReportes` | El arreglo `items` |
| `selectReportePorId(id)` | El reporte con ese `id` o `undefined` (se usa como `useSelector(selectReportePorId(id))`). Compara los ids como texto, porque pueden ser número (ejemplos) o string (nanoid) |
| `selectReportesDe(usuario)` | Los reportes cuyo `username` coincide con el recibido, por ejemplo `useSelector(selectReportesDe(USUARIO_ACTUAL.username))`. Está memoizado para no crear un arreglo nuevo en cada render |

## Usuario actual

`USUARIO_ACTUAL` (en `src/store/reportesSlice.js`) es una constante `{ author, username, avatar }` con Gerald Casas / @GeraldCasas. La usan `agregarReporte`, Perfil (cabecera y lista) y Detalle (botón Eliminar). Cuando exista el Context de sesión, se reemplaza solo en este punto.

## Uso

- `App.js` envuelve la navegación con `<Provider store={store}>`.
- `InicioScreen` lee con `useSelector(selectReportes)` y despacha `alternarLike`.
- `DetalleReporteScreen` lee con `selectReportePorId(id)`, despacha `alternarLike` y, si el reporte es del usuario actual, `eliminarReporte`.
- `PerfilScreen` lee con `selectReportesDe(USUARIO_ACTUAL.username)` y despacha `alternarLike`.
- `NuevoReporteScreen` despacha `agregarReporte(datos)` al enviar el formulario.
