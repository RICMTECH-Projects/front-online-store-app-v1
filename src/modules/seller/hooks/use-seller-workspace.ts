"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import {
	clearSellerTenantCache,
	useSellerProfile,
	useSellerTenants,
} from "./use-seller-portal";

export function useSellerWorkspace() {
	const params = useParams<{
		sellerId: string;
		productId?: string;
		orderId?: string;
	}>();
	const router = useRouter();
	const sellerId = Number(params.sellerId);
	const productId = Number(params.productId);
	const orderId = Number(params.orderId);
	const profile = useSellerProfile(sellerId);
	const tenants = useSellerTenants();
	const queryClient = useQueryClient();
	const writable = profile.data?.status === "ACTIVE";
	const base = `/vendedor/${sellerId}`;
	const switchTenant = async () => {
		await clearSellerTenantCache(queryClient);
		router.push("/vendedor");
	};
	const onCreated = (id: number) => router.replace(`${base}/productos/${id}`);
	const retryProfile = () => void profile.refetch();
	const owner =
		tenants.data?.find((tenant) => tenant.sellerId === sellerId)?.owner ??
		false;

	return {
		switchTenant,
		onCreated,
		retryProfile,
		owner,
		sellerId,
		productId,
		orderId,
		profile,
		tenants,
		writable,
		base,
	};
}
