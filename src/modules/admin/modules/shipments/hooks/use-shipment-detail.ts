"use client";
import { useUpdateShipment } from "@/modules/fulfillment";
export function useShipmentDetail(orderId: number) {
	const update = useUpdateShipment(orderId);
	return {
		isPending: update.isPending,
		isError: update.isError,
		submit: update.mutateAsync,
	};
}
