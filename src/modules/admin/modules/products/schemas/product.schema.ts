import { z } from "zod";

export const productSchema = z.object({
	sellerId: z.coerce.number().int().positive("Selecciona un comercio."),
	categoryId: z.coerce.number().int().positive("Selecciona una categoría."),
	brandId: z.string(),
	sku: z.string().trim().min(1, "Ingresa el SKU."),
	name: z.string().trim().min(1, "Ingresa el nombre."),
	slug: z
		.string()
		.trim()
		.min(1, "Ingresa el slug.")
		.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Usa minúsculas, números y guiones."),
	description: z.string(),
	price: z.coerce.number().min(0, "El precio no puede ser negativo."),
	currency: z
		.string()
		.trim()
		.transform((value) => value || "PEN")
		.refine(
			(value) => /^[A-Za-z]{3}$/.test(value),
			"Usa un código de 3 letras.",
		),
});
export const productImageSchema = z.object({
	url: z
		.string()
		.url("Ingresa una URL válida.")
		.max(1000)
		.refine((url) => /^https?:\/\//.test(url), "Usa http o https."),
	altText: z.string().max(250),
	position: z.coerce.number().int().min(0),
	primary: z.boolean(),
});
export type ProductFormValues = z.input<typeof productSchema>;
export type ProductParsedValues = z.output<typeof productSchema>;
