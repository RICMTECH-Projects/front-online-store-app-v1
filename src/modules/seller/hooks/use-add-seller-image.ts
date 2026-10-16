"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { sellerQueryKeys } from "../constants/seller-query-keys";
import type { SellerImageRequest } from "../interfaces/seller-api.interface";
import { sellerApi } from "../services/seller-api.service";

import { handleSellerForbidden } from "../utils/handle-seller-forbidden.util";

export const useAddSellerImage = (sellerId: number, productId: number) => {
	const queryClient = useQueryClient();
	const router = useRouter();
	return useMutation({
		mutationFn: (body: SellerImageRequest) =>
			sellerApi.addImage(sellerId, productId, body),
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: sellerQueryKeys.product(sellerId, productId),
				}),
				queryClient.invalidateQueries({
					queryKey: sellerQueryKeys.images(sellerId, productId),
				}),
			]);
		},
		onError: (error) => handleSellerForbidden(error, router),
		meta: { requiresAuth: true },
	});
};
