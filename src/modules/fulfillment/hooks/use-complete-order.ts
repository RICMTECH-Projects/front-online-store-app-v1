"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fulfillmentQueryKeys } from "../constants/fulfillment-query-keys";
import { fulfillmentApi } from "../services/fulfillment-api.service";

export function useCompleteOrder(orderId: number) {
	const client = useQueryClient();
	return useMutation({
		mutationFn: () => fulfillmentApi.completeOrder(orderId),
		onSuccess: async () =>
			Promise.all([
				client.invalidateQueries({ queryKey: fulfillmentQueryKeys.admin }),
				client.invalidateQueries({ queryKey: fulfillmentQueryKeys.all }),
			]),
		meta: { requiresAuth: true },
	});
}
