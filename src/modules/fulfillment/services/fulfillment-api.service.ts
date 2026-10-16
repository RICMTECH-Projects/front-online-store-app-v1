import httpClient from "@/modules/shared/providers/http";
import type {
	FulfillmentFilters,
	FulfillmentRecord,
	FulfillmentUpdate,
	SellerOrder,
	SellerOrderPage,
	Shipment,
	ShipmentUpdate,
} from "../interfaces/fulfillment.interface";

const query = (params: Record<string, number | undefined>) => {
	const search = new URLSearchParams();
	for (const [key, value] of Object.entries(params))
		if (value !== undefined) search.set(key, String(value));
	return search.toString();
};

export const fulfillmentApi = {
	listSellerOrders: (sellerId: number, page: number, size: number) =>
		httpClient<SellerOrderPage>(
			`/seller/orders?${query({ sellerId, page, size })}`,
		),
	getSellerOrder: (sellerId: number, orderId: number) =>
		httpClient<SellerOrder>(`/seller/orders/${orderId}?${query({ sellerId })}`),
	updateSellerFulfillment: (
		sellerId: number,
		orderId: number,
		body: FulfillmentUpdate,
	) =>
		httpClient<FulfillmentRecord>(
			`/seller/orders/${orderId}/fulfillment?${query({ sellerId })}`,
			{ method: "patch", body },
		),
	listAdminFulfillments: (filters: FulfillmentFilters) =>
		httpClient<SellerOrderPage>(`/admin/seller-fulfillments?${query(filters)}`),
	updateAdminFulfillment: (
		orderId: number,
		sellerId: number,
		body: FulfillmentUpdate,
	) =>
		httpClient<FulfillmentRecord>(
			`/admin/orders/${orderId}/seller-fulfillments/${sellerId}`,
			{ method: "patch", body },
		),
	completeOrder: (orderId: number) =>
		httpClient<{ id: number; status: string }>(`/orders/${orderId}/complete`, {
			method: "post",
		}),
	getShipment: (orderId: number) =>
		httpClient<Shipment>(`/orders/${orderId}/shipment`),
	updateShipment: (orderId: number, body: ShipmentUpdate) =>
		httpClient<Shipment>(`/admin/orders/${orderId}/shipment`, {
			method: "patch",
			body,
		}),
};
