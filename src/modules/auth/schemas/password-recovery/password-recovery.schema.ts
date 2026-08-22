import { z } from 'zod';

export const passwordRecoverySchema = z.object({
	email: z
		.string()
		.min(1, 'Ingresa tu correo electronico.')
		.email('Ingresa un correo valido.'),
});

export type PasswordRecoveryFormValues = z.infer<typeof passwordRecoverySchema>;
