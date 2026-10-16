"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { sellerQueryKeys } from "../constants/seller-query-keys";
import type { SellerProductStatus } from "../interfaces/seller-api.interface";
import { sellerApi } from "../services/seller-api.service";

import { handleSellerForbidden } from "../utils/handle-seller-forbidden.util";

export const useChangeSellerProductStatus = (
	sellerId: number,
	productId: number,
) => {
	const queryClient = useQueryClient();
	const router = useRouter();
	return useMutation({
		mutationFn: (status: SellerProductStatus) =>
			sellerApi.changeProductStatus(sellerId, productId, status),
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: sellerQueryKeys.product(sellerId, productId),
				}),
				queryClient.invalidateQueries({
					queryKey: ["seller", sellerId, "products"],
				}),
				queryClient.invalidateQueries({ queryKey: ["admin", "products"] }),
				queryClient.invalidateQueries({ queryKey: ["catalog"] }),
			]);
		},
		onError: (error) => handleSellerForbidden(error, router),
		meta: { requiresAuth: true },
	});
};
