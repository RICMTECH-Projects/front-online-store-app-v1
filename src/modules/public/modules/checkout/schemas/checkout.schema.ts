import { z } from "zod";

export const checkoutSchema = z.object({
	shippingAddressId: z.coerce
		.number()
		.int()
		.positive("Elige una dirección de entrega."),
	couponText: z.string().optional().default(""),
});

export const parseCouponCodes = (text: string) =>
	text
		.split(",")
		.map((code) => code.trim())
		.filter(Boolean);
