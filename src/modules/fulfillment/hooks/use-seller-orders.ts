"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { HttpError } from "@/modules/shared/providers/http";
import { fulfillmentQueryKeys } from "../constants/fulfillment-query-keys";
import { fulfillmentApi } from "../services/fulfillment-api.service";

import { redirectSellerOnForbidden } from "../utils/redirect-seller-on-forbidden.util";

export function useSellerOrders(sellerId: number, page: number, size = 20) {
	const router = useRouter();
	return useQuery({
		queryKey: fulfillmentQueryKeys.sellerOrders(sellerId, page, size),
		queryFn: () => fulfillmentApi.listSellerOrders(sellerId, page, size),
		enabled: sellerId > 0,
		meta: { requiresAuth: true },
		retry: (count, error) => {
			if (
				error instanceof HttpError &&
				(error.status === 401 || error.status === 403)
			) {
				redirectSellerOnForbidden(error, router);
				return false;
			}
			return count < 2;
		},
	});
}
