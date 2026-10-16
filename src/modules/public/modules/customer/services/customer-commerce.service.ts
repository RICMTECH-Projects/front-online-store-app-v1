import httpClient from "@/modules/shared/providers/http";
import type {
	CheckoutInput,
	CreatedOrder,
	CustomerAddress,
	CustomerAddressRequest,
	CustomerProfile,
	Shipment,
	ShippingQuote,
} from "../interfaces/customer-commerce.interface";

export const customerCommerceApi = {
	profile: () => httpClient<CustomerProfile>("/customers/me"),
	addresses: () => httpClient<CustomerAddress[]>("/customers/me/addresses"),
	createAddress: (body: CustomerAddressRequest) =>
		httpClient<CustomerAddress>("/customers/me/addresses", {
			method: "post",
			body,
		}),
	updateAddress: (id: number, body: CustomerAddressRequest) =>
		httpClient<CustomerAddress>(`/customers/me/addresses/${id}`, {
			method: "put",
			body,
		}),
	deleteAddress: (id: number) =>
		httpClient<void>(`/customers/me/addresses/${id}`, { method: "delete" }),
	quote: (body: {
		shippingAddressId: number;
		merchandiseSubtotal: number;
		currency: "PEN";
	}) => httpClient<ShippingQuote>("/shipping/quotes", { method: "post", body }),
	checkout: (body: CheckoutInput) =>
		httpClient<CreatedOrder>("/checkout", { method: "post", body }),
	shipment: (orderId: number) =>
		httpClient<Shipment>(`/orders/${orderId}/shipment`),
};
