"use client";

import { useParams } from "next/navigation";
import { fulfillmentStatusLabels } from "@/modules/fulfillment/constants/fulfillment.constants";
import { useCustomerShipment } from "../../customer/hooks/use-customer-commerce";

export function useCustomerShipmentTracking() {
	const params = useParams<{ orderId: string }>();
	const orderId = Number(params.orderId);
	const shipment = useCustomerShipment(orderId);
	const retry = () => void shipment.refetch();
	const status = shipment.data?.status;
	const statusLabel =
		status && Object.hasOwn(fulfillmentStatusLabels, status)
			? fulfillmentStatusLabels[status as keyof typeof fulfillmentStatusLabels]
			: status;
	const shippedAtLabel = shipment.data?.shippedAt
		? new Date(shipment.data.shippedAt).toLocaleString("es-PE")
		: null;
	const deliveredAtLabel = shipment.data?.deliveredAt
		? new Date(shipment.data.deliveredAt).toLocaleString("es-PE")
		: null;
	return {
		orderId,
		shipment,
		retry,
		statusLabel,
		shippedAtLabel,
		deliveredAtLabel,
	};
}
