import { z } from "zod";

export const sellerSchema = z.object({
	legalName: z.string().trim().min(1, "Ingresa la razón social.").max(200),
	taxId: z.string().trim().min(1, "Ingresa el identificador fiscal.").max(50),
	email: z.string().trim().email("Ingresa un correo válido.").max(320),
	status: z.enum(["ACTIVE", "INACTIVE"]),
});
export type SellerFormValues = z.infer<typeof sellerSchema>;
