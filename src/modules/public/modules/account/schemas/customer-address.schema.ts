import { z } from "zod";

const optionalText = (max: number) =>
	z
		.string()
		.trim()
		.max(max)
		.optional()
		.transform((value) => value || null);
export const customerAddressSchema = z.object({
	label: optionalText(100),
	recipientName: z
		.string()
		.trim()
		.min(1, "Ingresa quién recibe el pedido.")
		.max(200),
	phone: optionalText(30),
	line1: z.string().trim().min(1, "Ingresa la dirección.").max(200),
	line2: optionalText(200),
	district: optionalText(100),
	city: z.string().trim().min(1, "Ingresa la ciudad.").max(100),
	region: optionalText(100),
	countryCode: z
		.string()
		.trim()
		.regex(/^[A-Za-z]{2}$/, "Usa el código de país de dos letras.")
		.transform((value) => value.toUpperCase()),
	postalCode: optionalText(20),
	defaultAddress: z.boolean(),
});
