"use client";

import { useQuery } from "@tanstack/react-query";
import { fulfillmentQueryKeys } from "../constants/fulfillment-query-keys";
import { fulfillmentApi } from "../services/fulfillment-api.service";

export function useShipment(orderId: number, enabled = true) {
	return useQuery({
		queryKey: fulfillmentQueryKeys.shipment(orderId),
		queryFn: () => fulfillmentApi.getShipment(orderId),
		enabled: enabled && orderId > 0,
		meta: { requiresAuth: true },
	});
}
