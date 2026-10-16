"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { fulfillmentStatusLabels } from "../constants/fulfillment.constants";
import type {
	FulfillmentRecord,
	FulfillmentUpdate,
} from "../interfaces/fulfillment.interface";
import {
	type FulfillmentFormInput,
	type FulfillmentFormOutput,
	fulfillmentStatusSchema,
} from "../schemas/fulfillment-status.schema";
import { nextFulfillmentStatuses } from "../utils/fulfillment-transitions";

export function useFulfillmentStatusForm(
	record: Pick<FulfillmentRecord, "status" | "carrier" | "trackingNumber">,
	onSubmit: (value: FulfillmentUpdate) => unknown,
) {
	const form = useForm<FulfillmentFormInput, undefined, FulfillmentFormOutput>({
		resolver: zodResolver(fulfillmentStatusSchema),
		defaultValues: {
			status: record.status,
			carrier: record.carrier ?? "",
			trackingNumber: record.trackingNumber ?? "",
		},
	});
	const statusOptions = [
		record.status,
		...nextFulfillmentStatuses(record.status),
	]
		.filter((status, index, all) => all.indexOf(status) === index)
		.map((status) => ({
			value: status,
			label: fulfillmentStatusLabels[status],
		}));
	const save = form.handleSubmit(
		async ({ status, carrier, trackingNumber }) => {
			try {
				await onSubmit({
					status,
					...(carrier ? { carrier } : {}),
					...(trackingNumber ? { trackingNumber } : {}),
				});
			} catch {
				/* Mutation owner displays the normalized error. */
			}
		},
	);
	return { form, statusOptions, save };
}
