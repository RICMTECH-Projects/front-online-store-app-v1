"use client";
import { useQuery } from "@tanstack/react-query";
import { sellerQueryKeys } from "../constants/seller-query-keys";
import { sellerApi } from "../services/seller-api.service";

export const useSellerTenants = () =>
	useQuery({
		queryKey: sellerQueryKeys.tenants,
		queryFn: sellerApi.listTenants,
		meta: { requiresAuth: true },
	});
