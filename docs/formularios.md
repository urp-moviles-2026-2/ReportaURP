# Formularios — Reporta URP

Validación con React Hook Form + Zod (`@hookform/resolvers/zod`). Los esquemas viven en `src/schemas/`.
Destino de los datos: Crear reporte guarda en el slice `reportes` (Redux, ver `docs/estado.md`); Registro y Login irán a `SesionContext` (se implementa en otra fase). El envío real a la API llega en S11.

## Inventario de campos

| Formulario | Pantalla | Campo | Regla | Mensaje de error | Destino |
|------------|----------|-------|-------|------------------|---------|
| Crear reporte | NuevoReporteScreen | titulo | texto sin espacios sobrantes, 5 a 60 caracteres | El título debe tener al menos 5 caracteres / El título no puede pasar de 60 caracteres | Slice `reportes` (Redux) |
| Crear reporte | NuevoReporteScreen | descripcion | texto sin espacios sobrantes, máx. 300 caracteres (opcional) | La descripción no puede pasar de 300 caracteres | Slice `reportes` (Redux) |
| Crear reporte | NuevoReporteScreen | categoria | una de luminaria, agua, equipo, otro | Elige una categoría | Slice `reportes` (Redux) |
| Crear reporte | NuevoReporteScreen | ubicacion | texto sin espacios sobrantes, mín. 3 caracteres | Indica dónde ocurrió | Slice `reportes` (Redux) |
| Registro | RegistroScreen | nombre | texto sin espacios sobrantes, mín. 3 caracteres | El nombre debe tener al menos 3 caracteres | SesionContext |
| Registro | RegistroScreen | correo | sin espacios, en minúsculas, formato de correo | Ingresa un correo válido | SesionContext |
| Registro | RegistroScreen | celular | 9 dígitos que empiezan con 9 (`/^9\d{8}$/`) | El celular debe tener 9 dígitos y empezar con 9 | SesionContext |
| Registro | RegistroScreen | clave | mín. 8 caracteres | La clave debe tener al menos 8 caracteres | SesionContext |
| Registro | RegistroScreen | confirmarClave | debe coincidir con clave | Las claves no coinciden | SesionContext |
| Registro | RegistroScreen | aceptaTerminos | debe ser `true` | Debes aceptar los términos para continuar | SesionContext |
| Login | LoginScreen | correo | sin espacios, en minúsculas, formato de correo | Ingresa un correo válido | SesionContext |
| Login | LoginScreen | clave | obligatoria | Ingresa tu clave | SesionContext |

## Formularios de este lab

1. **Crear reporte** (`src/screens/NuevoReporteScreen.js`, esquema `src/schemas/reporteSchema.js`). Implementado.
2. **Registro** (esquema pendiente). Pendiente de implementar.
3. **Login** (`src/screens/LoginScreen.js`, esquema pendiente). Pendiente de implementar.

Los formularios usan `mode: 'onBlur'` y `reValidateMode: 'onChange'`: el error aparece al salir del campo y se corrige en vivo al escribir.

## Componentes reutilizables

- `TextField`: input con etiqueta, cuatro estados de borde (normal, enfocado, válido, error) y mensaje de error.
- `FormField`: conecta un `TextField` con React Hook Form mediante `Controller`.
- `ChipSelectField`: selección de una opción con chips.
