export interface CustomerProfile {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	status: string;
}

export interface CustomerAddress {
	id: number;
	userId: number;
	label: string | null;
	recipientName: string;
	phone: string | null;
	line1: string;
	line2: string | null;
	district: string | null;
	city: string;
	region: string | null;
	countryCode: string;
	postalCode: string | null;
	defaultAddress: boolean;
}

export type CustomerAddressRequest = Omit<CustomerAddress, "id" | "userId">;
export interface ShippingQuote {
	carrier: string;
	serviceLevel: string;
	total: number;
	currency: string;
}
export interface CheckoutInput {
	shippingAddressId: number;
	lines: Array<{ productId: number; quantity: number }>;
	couponCodes: string[];
}
export interface CreatedOrder {
	id: number;
	userId: number;
	orderNumber: string;
	status: string;
	subtotal: number;
	shippingTotal: number;
	discountTotal: number;
	grandTotal: number;
	currency: string;
	shippingAddressId: number;
}
export interface Shipment {
	id: number;
	orderId: number;
	carrier: string | null;
	serviceLevel: string | null;
	trackingNumber: string | null;
	status: string;
	shippedAt: string | null;
	deliveredAt: string | null;
}
