import { z } from 'zod';

export const resetPasswordSchema = z
	.object({
		confirmPassword: z.string().min(1, 'Confirma tu contraseña.'),
		password: z
			.string()
			.min(1, 'Ingresa tu nueva contraseña.')
			.min(8, 'Usa al menos 8 caracteres.'),
	})
	.superRefine(({ confirmPassword, password }, context) => {
		if (confirmPassword !== password) {
			context.addIssue({
				code: 'custom',
				message: 'Las contraseñas no coinciden.',
				path: ['confirmPassword'],
			});
		}
	});

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
