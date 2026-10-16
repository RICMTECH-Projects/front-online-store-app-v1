"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { HttpError } from "@/modules/shared/providers/http";
import { sellerQueryKeys } from "../constants/seller-query-keys";
import { sellerApi } from "../services/seller-api.service";

import { handleSellerForbidden } from "../utils/handle-seller-forbidden.util";

export const useSellerImages = (sellerId: number, productId: number) => {
	const router = useRouter();
	return useQuery({
		queryKey: sellerQueryKeys.images(sellerId, productId),
		queryFn: () => sellerApi.listImages(sellerId, productId),
		enabled: sellerId > 0 && productId > 0,
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
