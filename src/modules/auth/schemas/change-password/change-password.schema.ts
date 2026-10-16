import { z } from "zod";

export const changePasswordSchema = z
	.object({
		confirmPassword: z.string().min(1, "Confirma la nueva contraseña."),
		currentPassword: z.string().min(1, "Ingresa tu contraseña actual."),
		newPassword: z
			.string()
			.min(8, "Usa al menos 8 caracteres.")
			.max(128, "La contraseña puede tener hasta 128 caracteres."),
	})
	.superRefine(({ confirmPassword, newPassword }, context) => {
		if (confirmPassword !== newPassword) {
			context.addIssue({
				code: "custom",
				message: "Las contraseñas no coinciden.",
				path: ["confirmPassword"],
			});
		}
	});

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
