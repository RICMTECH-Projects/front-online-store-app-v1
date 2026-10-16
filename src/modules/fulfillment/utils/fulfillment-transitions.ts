import type { FulfillmentStatus } from "../interfaces/fulfillment.interface";

const transitions: Record<FulfillmentStatus, readonly FulfillmentStatus[]> = {
	PENDING: ["PENDING", "READY_TO_SHIP", "CANCELLED"],
	READY_TO_SHIP: ["READY_TO_SHIP", "SHIPPED", "CANCELLED"],
	SHIPPED: ["SHIPPED", "DELIVERED"],
	DELIVERED: ["DELIVERED"],
	CANCELLED: ["CANCELLED"],
};

export const nextFulfillmentStatuses = (current: FulfillmentStatus) =>
	transitions[current];
