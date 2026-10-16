import httpClient from "@/modules/shared/providers/http";
import type {
	SellerImageRequest,
	SellerProduct,
	SellerProductPage,
	SellerProductRequest,
	SellerProductStatus,
	SellerProfile,
	SellerTenant,
} from "../interfaces/seller-api.interface";

const path = (sellerId: number) => `/seller/catalog/${sellerId}`;

export const sellerApi = {
	listTenants: () => httpClient<SellerTenant[]>("/seller/catalog"),
	getProfile: (sellerId: number) => httpClient<SellerProfile>(path(sellerId)),
	updateProfile: (
		sellerId: number,
		body: Pick<SellerProfile, "legalName" | "taxId" | "email">,
	) => httpClient<SellerProfile>(path(sellerId), { method: "put", body }),
	listProducts: (sellerId: number, page: number, size = 20) =>
		httpClient<SellerProductPage>(
			`${path(sellerId)}/products?page=${page}&size=${size}`,
		),
	getProduct: (sellerId: number, productId: number) =>
		httpClient<SellerProduct>(`${path(sellerId)}/products/${productId}`),
	createProduct: (sellerId: number, body: SellerProductRequest) =>
		httpClient<SellerProduct>(`${path(sellerId)}/products`, {
			method: "post",
			body,
		}),
	changeProductStatus: (
		sellerId: number,
		productId: number,
		status: SellerProductStatus,
	) =>
		httpClient<SellerProduct>(
			`${path(sellerId)}/products/${productId}/status`,
			{ method: "patch", body: { status } },
		),
	listImages: (sellerId: number, productId: number) =>
		httpClient<SellerProduct["images"]>(
			`${path(sellerId)}/products/${productId}/images`,
		),
	addImage: (sellerId: number, productId: number, body: SellerImageRequest) =>
		httpClient<SellerProduct["images"][number]>(
			`${path(sellerId)}/products/${productId}/images`,
			{ method: "post", body },
		),
};
