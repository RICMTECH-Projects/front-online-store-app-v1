import { z } from "zod";

export const userSchema = z.object({
	email: z.string().trim().email("Ingresa un correo válido.").max(320),
	password: z
		.string()
		.max(128)
		.refine(
			(value) => value.length === 0 || value.length >= 8,
			"Usa entre 8 y 128 caracteres.",
		),
	firstName: z.string().trim().min(1, "Ingresa nombres."),
	lastName: z.string().trim().min(1, "Ingresa apellidos."),
	status: z.enum(["ACTIVE", "INACTIVE"]),
	roleCodes: z.array(z.string()).min(1, "Selecciona al menos un rol."),
});
export const userRoleSchema = z.object({
	roleCodes: z.array(z.string()).min(1, "Debe conservar al menos un rol."),
});
export const sellerMembershipSchema = z.object({
	sellerId: z.coerce.number().int().positive("Selecciona una tienda."),
	owner: z.boolean(),
	active: z.boolean(),
});

export type UserFormValues = z.infer<typeof userSchema>;
