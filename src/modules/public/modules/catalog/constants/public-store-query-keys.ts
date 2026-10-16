export const publicStoreQueryKeys = {
	products: (categoryId?: number) =>
		["public", "products", categoryId ?? "all"] as const,
	product: (id: number) => ["public", "product", id] as const,
	images: (id: number) => ["public", "product", id, "images"] as const,
};
