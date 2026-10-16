"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { SellerProductRequest } from "../interfaces/seller-api.interface";
import { sellerApi } from "../services/seller-api.service";

import { handleSellerForbidden } from "../utils/handle-seller-forbidden.util";

export const useCreateSellerProduct = (sellerId: number) => {
	const queryClient = useQueryClient();
	const router = useRouter();
	return useMutation({
		mutationFn: (body: SellerProductRequest) =>
			sellerApi.createProduct(sellerId, body),
		onSuccess: async () =>
			queryClient.invalidateQueries({
				queryKey: ["seller", sellerId, "products"],
			}),
		onError: (error) => handleSellerForbidden(error, router),
		meta: { requiresAuth: true },
	});
};
