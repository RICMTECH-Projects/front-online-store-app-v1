export const sellerQueryKeys = {
	all: ["seller"] as const,
	tenants: ["seller", "tenants"] as const,
	profile: (sellerId: number) => ["seller", sellerId, "profile"] as const,
	products: (sellerId: number, page: number, size: number) =>
		["seller", sellerId, "products", page, size] as const,
	product: (sellerId: number, productId: number) =>
		["seller", sellerId, "product", productId] as const,
	images: (sellerId: number, productId: number) =>
		["seller", sellerId, "product", productId, "images"] as const,
};
