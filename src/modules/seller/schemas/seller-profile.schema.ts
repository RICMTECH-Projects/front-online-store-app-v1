import { z } from "zod";

export const sellerProfileSchema = z.object({
	legalName: z
		.string()
		.trim()
		.min(1, "La razón social es obligatoria")
		.max(200),
	taxId: z
		.string()
		.trim()
		.min(1, "El identificador fiscal es obligatorio")
		.max(50),
	email: z
		.string()
		.trim()
		.toLowerCase()
		.email("Ingresa un correo válido")
		.max(320),
});

export type SellerProfileFormValues = z.input<typeof sellerProfileSchema>;
