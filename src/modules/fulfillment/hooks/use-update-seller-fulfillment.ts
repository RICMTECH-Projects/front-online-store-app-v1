"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fulfillmentQueryKeys } from "../constants/fulfillment-query-keys";
import type { FulfillmentUpdate } from "../interfaces/fulfillment.interface";
import { fulfillmentApi } from "../services/fulfillment-api.service";

import { redirectSellerOnForbidden } from "../utils/redirect-seller-on-forbidden.util";

export function useUpdateSellerFulfillment(sellerId: number, orderId: number) {
	const client = useQueryClient();
	const router = useRouter();
	return useMutation({
		mutationFn: (body: FulfillmentUpdate) =>
			fulfillmentApi.updateSellerFulfillment(sellerId, orderId, body),
		onSuccess: async () =>
			Promise.all([
				client.invalidateQueries({
					queryKey: fulfillmentQueryKeys.seller(sellerId),
				}),
				client.invalidateQueries({
					queryKey: fulfillmentQueryKeys.sellerOrder(sellerId, orderId),
				}),
			]),
		onError: (error) => redirectSellerOnForbidden(error, router),
		meta: { requiresAuth: true },
	});
}
