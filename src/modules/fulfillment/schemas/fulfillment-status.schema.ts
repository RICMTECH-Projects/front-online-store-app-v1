import { z } from "zod";
import { FULFILLMENT_STATUSES } from "../interfaces/fulfillment.interface";

export const fulfillmentStatusSchema = z
	.object({
		status: z.enum(FULFILLMENT_STATUSES),
		carrier: z.string().trim().max(200, "Máximo 200 caracteres."),
		trackingNumber: z.string().trim().max(200, "Máximo 200 caracteres."),
	})
	.superRefine((value, context) => {
		if (["SHIPPED", "DELIVERED"].includes(value.status) && !value.carrier)
			context.addIssue({
				code: "custom",
				path: ["carrier"],
				message: "Indica el transportista para despachar o entregar.",
			});
		if (
			["SHIPPED", "DELIVERED"].includes(value.status) &&
			!value.trackingNumber
		)
			context.addIssue({
				code: "custom",
				path: ["trackingNumber"],
				message: "Indica el tracking para despachar o entregar.",
			});
	});
export type FulfillmentFormInput = z.input<typeof fulfillmentStatusSchema>;
export type FulfillmentFormOutput = z.output<typeof fulfillmentStatusSchema>;

export const shipmentStatusSchema = fulfillmentStatusSchema.extend({
	serviceLevel: z.string().trim().max(100, "Máximo 100 caracteres."),
});
