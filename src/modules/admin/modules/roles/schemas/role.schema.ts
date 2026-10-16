import { z } from "zod";

export const roleSchema = z.object({
	code: z
		.string()
		.trim()
		.regex(
			/^[A-Za-z][A-Za-z0-9_]{1,49}$/,
			"Usa entre 2 y 50 letras, números o guion bajo.",
		),
	name: z.string().trim().min(1, "Ingresa un nombre.").max(100),
});
export const renameRoleSchema = z.object({
	name: z.string().trim().min(1, "Ingresa un nombre.").max(100),
});
