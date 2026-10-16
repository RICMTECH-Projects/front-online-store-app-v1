import { z } from "zod";

export const sellerProductSchema = z.object({
	name: z.string().trim().min(1, "El nombre es obligatorio"),
	sku: z.string().trim().min(1, "El SKU es obligatorio"),
	slug: z.string().trim().min(1, "El slug es obligatorio"),
	description: z.string().trim().optional(),
	price: z.preprocess(
		(value) => (value === "" ? Number.NaN : value),
		z.coerce.number().min(0, "El precio no puede ser negativo"),
	),
	categoryId: z.coerce.number().int().positive("Selecciona una categoría"),
	brandId: z
		.union([z.literal(""), z.coerce.number().int().positive()])
		.optional(),
	imageUrl: z
		.union([
			z.literal(""),
			z
				.string()
				.url("Ingresa una URL válida")
				.max(1000)
				.refine(
					(value) => /^https?:\/\//i.test(value),
					"La URL debe comenzar con http:// o https://",
				),
		])
		.optional(),
});

export type SellerProductFormValues = z.input<typeof sellerProductSchema>;
