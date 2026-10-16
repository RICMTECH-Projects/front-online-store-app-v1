import { z } from "zod";

export const registerSchema = z
	.object({
		confirmPassword: z.string().min(1, "Confirma tu contraseña."),
		email: z
			.string()
			.min(1, "Ingresa tu correo electronico.")
			.email("Ingresa un correo valido."),
		firstName: z.string().min(1, "Ingresa tu nombre."),
		lastName: z.string().min(1, "Ingresa tu apellido."),
		password: z
			.string()
			.min(1, "Ingresa tu contraseña.")
			.min(8, "Usa al menos 8 caracteres.")
			.max(128, "La contraseña puede tener hasta 128 caracteres."),
	})
	.superRefine(({ confirmPassword, password }, context) => {
		if (confirmPassword !== password) {
			context.addIssue({
				code: "custom",
				message: "Las contraseñas no coinciden.",
				path: ["confirmPassword"],
			});
		}
	});

export type RegisterFormValues = z.infer<typeof registerSchema>;
