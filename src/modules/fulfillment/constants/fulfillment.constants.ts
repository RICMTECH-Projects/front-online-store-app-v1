import type { FulfillmentStatus } from "../interfaces/fulfillment.interface";

export const SELLER_ORDERS_PAGE_SIZE = 20;

export const fulfillmentStatusLabels: Record<FulfillmentStatus, string> = {
	PENDING: "Pendiente",
	READY_TO_SHIP: "Listo para despacho",
	SHIPPED: "Enviado",
	DELIVERED: "Entregado",
	CANCELLED: "Cancelado",
};
