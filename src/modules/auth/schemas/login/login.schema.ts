import { z } from 'zod';

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, 'Ingresa tu correo electronico.')
		.email('Ingresa un correo valido.'),
	password: z
		.string()
		.min(1, 'Ingresa tu contraseña.')
		.min(8, 'Usa al menos 8 caracteres.'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
