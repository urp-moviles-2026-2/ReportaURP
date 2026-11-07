import { z } from 'zod';

export const TIPOS_MENSAJE = ['sugerencia', 'error', 'consulta'];

export const contactoSchema = z
  .object({
    nombre: z.string().trim().min(3, 'El nombre debe tener al menos 3 caracteres'),
    correo: z.string().trim().toLowerCase().email('Ingresa un correo válido'),
    celular: z
      .string()
      .regex(/^9\d{8}$/, 'El celular debe tener 9 dígitos y empezar con 9'),
    tipo: z.enum(TIPOS_MENSAJE, { error: 'Elige un tipo de mensaje' }),
    calificacion: z
      .number({ error: 'Toca una estrella' })
      .int('Toca una estrella')
      .min(1, 'Toca una estrella')
      .max(5, 'Toca una estrella'),
    mensaje: z
      .string()
      .trim()
      .min(10, 'El mensaje debe tener al menos 10 caracteres')
      .max(500, 'El mensaje no puede pasar de 500 caracteres'),
    aceptaTerminos: z.boolean(),
  })
  .refine((datos) => datos.aceptaTerminos === true, {
    message: 'Debes aceptar el uso de tus datos para continuar',
    path: ['aceptaTerminos'],
  });

export const contactoVacio = {
  nombre: '',
  correo: '',
  celular: '',
  tipo: '',
  calificacion: 0,
  mensaje: '',
  aceptaTerminos: false,
};
