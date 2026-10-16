"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fulfillmentQueryKeys } from "../constants/fulfillment-query-keys";
import type { ShipmentUpdate } from "../interfaces/fulfillment.interface";
import { fulfillmentApi } from "../services/fulfillment-api.service";

export function useUpdateShipment(orderId: number) {
	const client = useQueryClient();
	return useMutation({
		mutationFn: (body: ShipmentUpdate) =>
			fulfillmentApi.updateShipment(orderId, body),
		onSuccess: () =>
			client.invalidateQueries({
				queryKey: fulfillmentQueryKeys.shipment(orderId),
			}),
		meta: { requiresAuth: true },
	});
}
