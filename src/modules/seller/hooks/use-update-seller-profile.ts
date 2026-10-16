"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { sellerQueryKeys } from "../constants/seller-query-keys";
import { sellerApi } from "../services/seller-api.service";

import { handleSellerForbidden } from "../utils/handle-seller-forbidden.util";

export const useUpdateSellerProfile = (sellerId: number) => {
	const queryClient = useQueryClient();
	const router = useRouter();
	return useMutation({
		mutationFn: (body: { legalName: string; taxId: string; email: string }) =>
			sellerApi.updateProfile(sellerId, body),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: sellerQueryKeys.profile(sellerId),
			}),
		onError: (error) => handleSellerForbidden(error, router),
		meta: { requiresAuth: true },
	});
};
