"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useState } from "react";
import { positiveId } from "@/modules/admin/utils/positive-id.util";
import { useAdminFulfillments } from "@/modules/fulfillment";
import { createFulfillmentColumns } from "../columns/fulfillments.columns";
import { FULFILLMENT_PAGE_SIZE } from "../constants/fulfillment.constants";

export function useFulfillmentsPage() {
	const params = useSearchParams();
	const router = useRouter();
	const [editingKey, setEditingKey] = useState<string | null>(null);
	const sellerParam = params.get("sellerId");
	const orderParam = params.get("orderId");
	const sellerId = positiveId(sellerParam);
	const orderId = positiveId(orderParam);
	const invalidFilter =
		(sellerParam !== null && sellerId === undefined) ||
		(orderParam !== null && orderId === undefined);
	const parsedPage = Number(params.get("page") ?? 0);
	const page =
		Number.isSafeInteger(parsedPage) && parsedPage >= 0 ? parsedPage : 0;
	const query = useAdminFulfillments(
		{ sellerId, orderId, page, size: FULFILLMENT_PAGE_SIZE },
		!invalidFilter,
	);
	const pages = query.data
		? Math.ceil(query.data.total / FULFILLMENT_PAGE_SIZE)
		: 0;
	const columns = createFulfillmentColumns((key) =>
		setEditingKey((current) => (current === key ? null : key)),
	);
	const selectedOrder =
		query.data?.items.find(
			(item) => `${item.orderId}-${item.fulfillment.sellerId}` === editingKey,
		) ?? null;
	const applyFilters = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const next = new URLSearchParams();
		for (const key of ["sellerId", "orderId"] as const) {
			const value = String(formData.get(key) ?? "").trim();
			if (value) next.set(key, value);
		}
		router.push(`/fulfillment${next.size ? `?${next}` : ""}`);
	};
	const goToPage = (nextPage: number) => {
		const next = new URLSearchParams(params.toString());
		next.set("page", String(nextPage));
		router.push(`/fulfillment?${next}`);
	};
	const closeEditor = () => setEditingKey(null);
	const retry = () => void query.refetch();

	return {
		closeEditor,
		retry,
		pageSize: FULFILLMENT_PAGE_SIZE,
		sellerParam,
		orderParam,
		sellerId,
		orderId,
		invalidFilter,
		page,
		query,
		pages,
		columns,
		selectedOrder,
		applyFilters,
		goToPage,
		setEditingKey,
	};
}
