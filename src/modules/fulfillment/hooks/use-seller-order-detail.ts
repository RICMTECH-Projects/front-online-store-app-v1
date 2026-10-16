"use client";

import { useSellerOrder, useUpdateSellerFulfillment } from "./use-fulfillment";

export function useSellerOrderDetail(sellerId: number, orderId: number) {
	const query = useSellerOrder(sellerId, orderId);
	const update = useUpdateSellerFulfillment(sellerId, orderId);
	const retry = () => void query.refetch();
	return { query, update, retry };
}
