export const customerQueryKeys = {
	profile: ["customer", "profile"] as const,
	addresses: ["customer", "addresses"] as const,
	quote: (addressId: number, subtotal: number) =>
		["checkout", "quote", addressId, subtotal] as const,
	shipment: (orderId: number) => ["customer", "shipment", orderId] as const,
};
