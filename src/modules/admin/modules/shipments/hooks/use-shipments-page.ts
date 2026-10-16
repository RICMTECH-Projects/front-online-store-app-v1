"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { positiveId } from "@/modules/admin/utils/positive-id.util";
import { useShipment } from "@/modules/fulfillment";

export function useShipmentsPage() {
	const router = useRouter();
	const params = useSearchParams();
	const rawOrderId = params.get("orderId");
	const orderId = positiveId(rawOrderId);
	const invalidOrderId = rawOrderId !== null && orderId === undefined;
	const shipment = useShipment(orderId ?? 0, orderId !== undefined);
	const [searchValue, setSearchValue] = useState(rawOrderId ?? "");
	const search = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const id = searchValue.trim();
		router.push(id ? `/envios?orderId=${encodeURIComponent(id)}` : "/envios");
	};
	const changeSearch = (event: ChangeEvent<HTMLInputElement>) =>
		setSearchValue(event.target.value);
	const retry = () => void shipment.refetch();
	return {
		changeSearch,
		retry,
		rawOrderId,
		orderId,
		invalidOrderId,
		shipment,
		searchValue,
		setSearchValue,
		search,
	};
}
