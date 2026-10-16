"use client";

import { useQuery } from "@tanstack/react-query";
import { fulfillmentQueryKeys } from "../constants/fulfillment-query-keys";
import type { FulfillmentFilters } from "../interfaces/fulfillment.interface";
import { fulfillmentApi } from "../services/fulfillment-api.service";

export function useAdminFulfillments(
	filters: FulfillmentFilters,
	enabled = true,
) {
	return useQuery({
		queryKey: fulfillmentQueryKeys.adminList(filters),
		queryFn: () => fulfillmentApi.listAdminFulfillments(filters),
		enabled,
		meta: { requiresAuth: true },
	});
}
