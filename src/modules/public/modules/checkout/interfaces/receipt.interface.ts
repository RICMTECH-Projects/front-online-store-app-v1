import type { CreatedOrder } from "../../customer/interfaces/customer-commerce.interface";

export type CheckoutReceipt = {
	order: CreatedOrder;
	createdAt: string;
	lines: Array<{
		productId: number;
		name: string;
		sku: string;
		quantity: number;
		unitPrice: number;
		currency: string;
	}>;
};
