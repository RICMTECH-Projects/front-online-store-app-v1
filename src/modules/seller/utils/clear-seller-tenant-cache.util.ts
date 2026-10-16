import type { QueryClient } from "@tanstack/react-query";

export async function clearSellerTenantCache(queryClient: QueryClient) {
	const isSellerTenantQuery = (query: { queryKey: readonly unknown[] }) =>
		(query.queryKey[0] === "seller" && query.queryKey[1] !== "tenants") ||
		(query.queryKey[0] === "fulfillment" && query.queryKey[1] === "seller");
	await queryClient.cancelQueries({ predicate: isSellerTenantQuery });
	queryClient.removeQueries({ predicate: isSellerTenantQuery });
}
