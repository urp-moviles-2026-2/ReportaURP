# Formularios — Reporta URP

Validación con React Hook Form + Zod (`@hookform/resolvers/zod`). Los esquemas viven en `src/schemas/`.
Destino de los datos: por ahora `Alert` y `console.log`; el envío real a la API llega en S11.

## Inventario de campos

| Formulario | Pantalla | Campo | Regla | Mensaje de error | Destino |
|------------|----------|-------|-------|------------------|---------|
| Crear reporte | NuevoReporteScreen | titulo | texto sin espacios sobrantes, 5 a 60 caracteres | El título debe tener al menos 5 caracteres / El título no puede pasar de 60 caracteres | Alert + console.log |
| Crear reporte | NuevoReporteScreen | descripcion | texto sin espacios sobrantes, máx. 300 caracteres (opcional) | La descripción no puede pasar de 300 caracteres | Alert + console.log |
| Crear reporte | NuevoReporteScreen | categoria | una de luminaria, agua, equipo, otro | Elige una categoría | Alert + console.log |
| Crear reporte | NuevoReporteScreen | ubicacion | texto sin espacios sobrantes, mín. 3 caracteres | Indica dónde ocurrió | Alert + console.log |
| Contacto y feedback | ContactoScreen | nombre | texto sin espacios sobrantes, mín. 3 caracteres | El nombre debe tener al menos 3 caracteres | Alert + console.log |
| Contacto y feedback | ContactoScreen | correo | sin espacios, en minúsculas, formato de correo | Ingresa un correo válido | Alert + console.log |
| Contacto y feedback | ContactoScreen | celular | 9 dígitos que empiezan con 9 (`/^9\d{8}$/`) | El celular debe tener 9 dígitos y empezar con 9 | Alert + console.log |
| Contacto y feedback | ContactoScreen | tipo | uno de sugerencia, error, consulta | Elige un tipo de mensaje | Alert + console.log |
| Contacto y feedback | ContactoScreen | calificacion | entero de 1 a 5 | Toca una estrella | Alert + console.log |
| Contacto y feedback | ContactoScreen | mensaje | texto sin espacios sobrantes, 10 a 500 caracteres | El mensaje debe tener al menos 10 caracteres / El mensaje no puede pasar de 500 caracteres | Alert + console.log |
| Contacto y feedback | ContactoScreen | aceptaTerminos | debe ser `true` | Debes aceptar el uso de tus datos para continuar | Alert + console.log |

## Formularios de este lab

1. **Crear reporte** (`src/screens/NuevoReporteScreen.js`, esquema `src/schemas/reporteSchema.js`).
2. **Contacto y feedback** (`src/screens/ContactoScreen.js`, esquema `src/schemas/contactoSchema.js`).

Ambos usan `mode: 'onBlur'` y `reValidateMode: 'onChange'`: el error aparece al salir del campo y se corrige en vivo al escribir.

## Componentes reutilizables

- `TextField`: input con etiqueta, cuatro estados de borde (normal, enfocado, válido, error) y mensaje de error.
- `FormField`: conecta un `TextField` con React Hook Form mediante `Controller`.
- `ChipSelectField`: selección de una opción con chips.
- `StarRating`: calificación de 1 a 5 estrellas.
