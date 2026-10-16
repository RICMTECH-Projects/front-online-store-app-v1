import { z } from "zod";

export const sellerImageSchema = z.object({
	url: z
		.string()
		.trim()
		.min(1, "La URL es obligatoria")
		.max(1000)
		.refine(
			(value) => /^https?:\/\//.test(value),
			"La URL debe comenzar con http:// o https://",
		),
	altText: z.string().trim().max(250, "Usa hasta 250 caracteres").optional(),
});
