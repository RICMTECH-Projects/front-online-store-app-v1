import type { FulfillmentFilters } from "../interfaces/fulfillment.interface";

export const fulfillmentQueryKeys = {
	all: ["fulfillment"] as const,
	seller: (sellerId: number) => ["fulfillment", "seller", sellerId] as const,
	sellerOrders: (sellerId: number, page: number, size: number) =>
		["fulfillment", "seller", sellerId, "orders", page, size] as const,
	sellerOrder: (sellerId: number, orderId: number) =>
		["fulfillment", "seller", sellerId, "order", orderId] as const,
	admin: ["fulfillment", "admin"] as const,
	adminList: (filters: FulfillmentFilters) =>
		["fulfillment", "admin", filters] as const,
	shipment: (orderId: number) => ["fulfillment", "shipment", orderId] as const,
};
