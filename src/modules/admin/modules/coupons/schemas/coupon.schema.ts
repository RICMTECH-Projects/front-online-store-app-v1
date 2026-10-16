import { z } from "zod";

const optionalAmount = z
	.string()
	.transform((value) => (value.trim() ? Number(value) : null))
	.refine(
		(value) => value === null || (Number.isFinite(value) && value >= 0),
		"Ingresa un importe válido.",
	);
const optionalPositiveInt = z
	.string()
	.transform((value) => (value.trim() ? Number(value) : null))
	.refine(
		(value) => value === null || (Number.isInteger(value) && value > 0),
		"Ingresa un entero mayor que cero.",
	);
const idsSchema = z
	.string()
	.transform((value) =>
		value.trim() ? value.split(",").map((part) => Number(part.trim())) : [],
	)
	.refine(
		(ids) => ids.every((id) => Number.isInteger(id) && id > 0),
		"Usa IDs positivos separados por comas.",
	);

export const couponSchema = z
	.object({
		code: z.string().trim().min(1, "Ingresa el código.").max(100),
		discountType: z.enum(["FIXED", "PERCENTAGE"]),
		discountValue: z.coerce
			.number()
			.positive("El descuento debe ser mayor que cero."),
		minOrderAmount: optionalAmount,
		maxDiscountAmount: optionalAmount,
		startsAt: z.string().min(1, "Elige la fecha de inicio."),
		endsAt: z.string().min(1, "Elige la fecha final."),
		usageLimit: optionalPositiveInt,
		perUserLimit: optionalPositiveInt,
		productIds: idsSchema,
		categoryIds: idsSchema,
		userIds: idsSchema,
	})
	.superRefine((value, context) => {
		if (value.endsAt <= value.startsAt)
			context.addIssue({
				code: "custom",
				path: ["endsAt"],
				message: "La fecha final debe ser posterior al inicio.",
			});
		if (value.discountType === "PERCENTAGE" && value.discountValue > 100)
			context.addIssue({
				code: "custom",
				path: ["discountValue"],
				message: "El porcentaje no puede superar 100.",
			});
	});

export type CouponFormValues = z.input<typeof couponSchema>;
export type CouponParsedValues = z.output<typeof couponSchema>;
