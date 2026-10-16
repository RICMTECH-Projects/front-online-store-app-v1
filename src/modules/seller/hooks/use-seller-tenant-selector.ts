"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { clearSellerTenantCache, useSellerTenants } from "./use-seller-portal";

export function useSellerTenantSelector() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const searchParams = useSearchParams();
	const tenants = useSellerTenants();
	const selectionMessage = searchParams.get("acceso") === "actualizado";
	useEffect(() => {
		if (tenants.data?.length === 1)
			router.replace(`/vendedor/${tenants.data[0].sellerId}`);
	}, [router, tenants.data]);
	const selectTenant = async (sellerId: number) => {
		await clearSellerTenantCache(queryClient);
		router.push(`/vendedor/${sellerId}`);
	};
	const retry = () => void tenants.refetch();

	return { tenants, selectionMessage, selectTenant, retry };
}
