"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fulfillmentQueryKeys } from "../constants/fulfillment-query-keys";
import type { FulfillmentUpdate } from "../interfaces/fulfillment.interface";
import { fulfillmentApi } from "../services/fulfillment-api.service";

export function useUpdateAdminFulfillment(orderId: number, sellerId: number) {
	const client = useQueryClient();
	return useMutation({
		mutationFn: (body: FulfillmentUpdate) =>
			fulfillmentApi.updateAdminFulfillment(orderId, sellerId, body),
		onSuccess: async () =>
			Promise.all([
				client.invalidateQueries({ queryKey: fulfillmentQueryKeys.admin }),
				client.invalidateQueries({
					queryKey: fulfillmentQueryKeys.sellerOrder(sellerId, orderId),
				}),
				client.invalidateQueries({
					queryKey: fulfillmentQueryKeys.seller(sellerId),
				}),
			]),
		meta: { requiresAuth: true },
	});
}
