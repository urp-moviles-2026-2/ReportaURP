import { z } from 'zod';

export const CATEGORIAS = ['luminaria', 'agua', 'equipo', 'otro'];

export const reporteSchema = z.object({
  titulo: z
    .string()
    .trim()
    .min(5, 'El título debe tener al menos 5 caracteres')
    .max(60, 'El título no puede pasar de 60 caracteres'),
  descripcion: z
    .string()
    .trim()
    .max(300, 'La descripción no puede pasar de 300 caracteres'),
  categoria: z.enum(CATEGORIAS, { error: 'Elige una categoría' }),
  ubicacion: z.string().trim().min(3, 'Indica dónde ocurrió'),
});

export const reporteVacio = {
  titulo: '',
  descripcion: '',
  categoria: '',
  ubicacion: '',
};
