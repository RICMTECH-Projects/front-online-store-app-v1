import { z } from 'zod';

export const contactFormSchema = z.object({
	name: z
		.string()
		.min(1, 'El nombre es obligatorio'),

	email: z
		.string()
		.min(1, 'El email es obligatorio')
		.email('Email inválido'),

	reason: z
		.string()
		.min(1, 'El motivo es obligatorio'),

	message: z
		.string()
		.min(1, 'El mensaje es obligatorio')
		.min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;