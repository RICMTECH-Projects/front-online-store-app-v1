import { z } from "zod";

export const catalogReferenceSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, "Ingresa un nombre.")
		.max(120, "Máximo 120 caracteres."),
	slug: z
		.string()
		.trim()
		.min(1, "Ingresa un slug.")
		.max(140, "Máximo 140 caracteres.")
		.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Usa minúsculas, números y guiones."),
	active: z.boolean(),
	parentId: z.string(),
});
export type CatalogReferenceFormValues = z.infer<typeof catalogReferenceSchema>;
