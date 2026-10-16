"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { HttpError } from "@/modules/shared/providers/http";
import { sellerQueryKeys } from "../constants/seller-query-keys";
import { sellerApi } from "../services/seller-api.service";

import { handleSellerForbidden } from "../utils/handle-seller-forbidden.util";

export const useSellerProfile = (sellerId: number) => {
	const router = useRouter();
	return useQuery({
		queryKey: sellerQueryKeys.profile(sellerId),
		queryFn: sellerApi.getProfile.bind(null, sellerId),
		enabled: Number.isInteger(sellerId) && sellerId > 0,
		meta: { requiresAuth: true },
		retry: (count, error) => {
			if (error instanceof HttpError && error.status === 403) {
				handleSellerForbidden(error, router);
				return false;
			}
			if (error instanceof HttpError && error.status === 401) return false;
			return count < 2;
		},
	});
};
