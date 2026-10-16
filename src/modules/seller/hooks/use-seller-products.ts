"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { HttpError } from "@/modules/shared/providers/http";
import { sellerQueryKeys } from "../constants/seller-query-keys";
import { sellerApi } from "../services/seller-api.service";

import { handleSellerForbidden } from "../utils/handle-seller-forbidden.util";

export const useSellerProducts = (
	sellerId: number,
	page: number,
	size = 20,
) => {
	const router = useRouter();
	return useQuery({
		queryKey: sellerQueryKeys.products(sellerId, page, size),
		queryFn: () => sellerApi.listProducts(sellerId, page, size),
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
