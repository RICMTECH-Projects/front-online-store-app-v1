"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { createSellerOrderColumns } from "../columns/seller-orders.columns";
import { SELLER_ORDERS_PAGE_SIZE } from "../constants/fulfillment.constants";
import { useSellerOrders } from "./use-fulfillment";

export function useSellerOrdersList(sellerId: number) {
	const params = useSearchParams();
	const router = useRouter();
	const rawPage = Number(params.get("page") ?? 0);
	const page = Number.isSafeInteger(rawPage) && rawPage >= 0 ? rawPage : 0;
	const query = useSellerOrders(sellerId, page, SELLER_ORDERS_PAGE_SIZE);
	const pages = query.data
		? Math.ceil(query.data.total / SELLER_ORDERS_PAGE_SIZE)
		: 0;
	const changePage = (next: number) =>
		router.push(`/vendedor/${sellerId}/ordenes?page=${next}`);
	const columns = createSellerOrderColumns(sellerId);
	return {
		page,
		query,
		pages,
		changePage,
		columns,
		pageSize: SELLER_ORDERS_PAGE_SIZE,
		retry: () => void query.refetch(),
	};
}
