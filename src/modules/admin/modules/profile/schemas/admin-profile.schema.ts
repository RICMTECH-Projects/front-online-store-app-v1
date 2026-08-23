import { z } from "zod";

const profileName = (field: string) =>
	z
		.string()
		.trim()
		.min(1, `Ingresa tu ${field}.`)
		.max(100, `El ${field} no puede superar los 100 caracteres.`);

export const adminProfileSchema = z.object({
	firstName: profileName("nombre"),
	lastName: profileName("apellido"),
});

export type AdminProfileFormValues = z.infer<typeof adminProfileSchema>;
