import httpClient from "@/modules/shared/providers/http";
import type {
	PublicProduct,
	PublicProductImage,
} from "../interfaces/public-catalog.interface";

export const publicCatalogApi = {
	list: (categoryId?: number) =>
		httpClient<PublicProduct[]>(
			`/products${categoryId ? `?categoryId=${categoryId}` : ""}`,
		),
	get: (id: number) => httpClient<PublicProduct>(`/products/${id}`),
	images: (id: number) =>
		httpClient<PublicProductImage[]>(`/products/${id}/images`),
};
