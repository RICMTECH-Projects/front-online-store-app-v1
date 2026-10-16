export const FULFILLMENT_STATUSES = [
	"PENDING",
	"READY_TO_SHIP",
	"SHIPPED",
	"DELIVERED",
	"CANCELLED",
] as const;
export type FulfillmentStatus = (typeof FULFILLMENT_STATUSES)[number];

export type FulfillmentRecord = {
	id: number;
	orderId: number;
	sellerId: number;
	status: FulfillmentStatus;
	carrier: string | null;
	trackingNumber: string | null;
	shippedAt: string | null;
	deliveredAt: string | null;
	createdAt: string;
	updatedAt: string;
};

export type SellerOrderLine = {
	id: number;
	productId: number;
	sku: string;
	productName: string;
	quantity: number;
	unitPrice: number;
	discountTotal: number;
	lineTotal: number;
};

export type SellerOrder = {
	orderId: number;
	orderNumber: string;
	orderStatus: string;
	currency: string;
	fulfillment: FulfillmentRecord;
	lines: SellerOrderLine[];
};

export type SellerOrderPage = {
	items: SellerOrder[];
	page: number;
	size: number;
	total: number;
};
export type Shipment = {
	id: number;
	orderId: number;
	carrier: string | null;
	serviceLevel: string | null;
	trackingNumber: string | null;
	status: FulfillmentStatus;
	shippedAt: string | null;
	deliveredAt: string | null;
};
export type FulfillmentUpdate = {
	status: FulfillmentStatus;
	carrier?: string;
	trackingNumber?: string;
};
export type ShipmentUpdate = FulfillmentUpdate & { serviceLevel?: string };
export type FulfillmentFilters = {
	sellerId?: number;
	orderId?: number;
	page: number;
	size: number;
};
