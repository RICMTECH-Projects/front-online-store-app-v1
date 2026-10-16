"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { fulfillmentStatusLabels } from "../constants/fulfillment.constants";
import type {
	FulfillmentStatus,
	ShipmentUpdate,
} from "../interfaces/fulfillment.interface";
import {
	type FulfillmentFormInput,
	type FulfillmentFormOutput,
	shipmentStatusSchema,
} from "../schemas/fulfillment-status.schema";
import { nextFulfillmentStatuses } from "../utils/fulfillment-transitions";

type ShipmentRecord = {
	status: FulfillmentStatus;
	carrier: string | null;
	trackingNumber: string | null;
	serviceLevel: string | null;
};

export function useShipmentStatusForm(
	record: ShipmentRecord,
	onSubmit: (value: ShipmentUpdate) => unknown,
) {
	const form = useForm<
		FulfillmentFormInput & { serviceLevel: string },
		undefined,
		FulfillmentFormOutput & { serviceLevel: string }
	>({
		resolver: zodResolver(shipmentStatusSchema),
		defaultValues: {
			status: record.status,
			carrier: record.carrier ?? "",
			trackingNumber: record.trackingNumber ?? "",
			serviceLevel: record.serviceLevel ?? "",
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
		async ({ status, carrier, trackingNumber, serviceLevel }) => {
			try {
				await onSubmit({
					status,
					...(carrier ? { carrier } : {}),
					...(trackingNumber ? { trackingNumber } : {}),
					...(serviceLevel ? { serviceLevel } : {}),
				});
			} catch {
				/* Mutation owner displays the normalized error. */
			}
		},
	);
	return { form, statusOptions, save };
}
