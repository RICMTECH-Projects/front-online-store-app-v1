import httpClient from "@/modules/shared/providers/http";
import type {
	AdminBrand,
	AdminCategory,
	AdminCoupon,
	AdminProduct,
	AdminRole,
	AdminSeller,
	AdminUser,
	ProductImportResult,
	SellerMembership,
} from "../interfaces/admin-api.interface";

const api = <T>(
	path: string,
	method: "get" | "post" | "put" | "patch" | "delete" = "get",
	body?: unknown,
) => httpClient<T>(path, { method, ...(body === undefined ? {} : { body }) });

export const adminApi = {
	users: {
		list: () => api<AdminUser[]>("/admin/users"),
		get: (id: number) => api<AdminUser>(`/admin/users/${id}`),
		create: (body: unknown) => api<AdminUser>("/admin/users", "post", body),
		update: (id: number, body: unknown) =>
			api<AdminUser>(`/admin/users/${id}`, "put", body),
		replaceRoles: (id: number, roleCodes: string[]) =>
			api<AdminUser>(`/admin/users/${id}/roles`, "put", { roleCodes }),
		memberships: (id: number) =>
			api<SellerMembership[]>(`/admin/users/${id}/sellers`),
		assignSeller: (
			userId: number,
			sellerId: number,
			body: { owner: boolean; active: boolean },
		) =>
			api<SellerMembership>(
				`/admin/users/${userId}/sellers/${sellerId}`,
				"put",
				body,
			),
		deactivateSeller: (userId: number, sellerId: number) =>
			api<SellerMembership>(
				`/admin/users/${userId}/sellers/${sellerId}`,
				"delete",
			),
	},
	roles: {
		list: () => api<AdminRole[]>("/admin/roles"),
		get: (id: number) => api<AdminRole>(`/admin/roles/${id}`),
		create: (body: { code: string; name: string }) =>
			api<AdminRole>("/admin/roles", "post", body),
		rename: (id: number, name: string) =>
			api<AdminRole>(`/admin/roles/${id}`, "put", { name }),
		remove: (id: number) => api<void>(`/admin/roles/${id}`, "delete"),
	},
	sellers: {
		list: () => api<AdminSeller[]>("/admin/catalog/sellers"),
		get: (id: number) => api<AdminSeller>(`/admin/catalog/sellers/${id}`),
		create: (body: Omit<AdminSeller, "id">) =>
			api<AdminSeller>("/admin/catalog/sellers", "post", body),
		update: (id: number, body: Omit<AdminSeller, "id">) =>
			api<AdminSeller>(`/admin/catalog/sellers/${id}`, "put", body),
		deactivate: (id: number) =>
			api<AdminSeller>(`/admin/catalog/sellers/${id}`, "delete"),
		members: (id: number) =>
			api<SellerMembership[]>(`/admin/sellers/${id}/users`),
	},
	brands: {
		list: () => api<AdminBrand[]>("/admin/catalog/brands"),
		get: (id: number) => api<AdminBrand>(`/admin/catalog/brands/${id}`),
		create: (body: Omit<AdminBrand, "id">) =>
			api<AdminBrand>("/admin/catalog/brands", "post", body),
		update: (id: number, body: Omit<AdminBrand, "id">) =>
			api<AdminBrand>(`/admin/catalog/brands/${id}`, "put", body),
		deactivate: (id: number) =>
			api<AdminBrand>(`/admin/catalog/brands/${id}`, "delete"),
	},
	categories: {
		list: () => api<AdminCategory[]>("/admin/catalog/categories"),
		get: (id: number) => api<AdminCategory>(`/admin/catalog/categories/${id}`),
		create: (body: Omit<AdminCategory, "id">) =>
			api<AdminCategory>("/admin/catalog/categories", "post", body),
		update: (id: number, body: Omit<AdminCategory, "id">) =>
			api<AdminCategory>(`/admin/catalog/categories/${id}`, "put", body),
		deactivate: (id: number) =>
			api<AdminCategory>(`/admin/catalog/categories/${id}`, "delete"),
	},
	products: {
		list: (categoryId?: number) =>
			api<AdminProduct[]>(
				`/products${categoryId ? `?categoryId=${categoryId}` : ""}`,
			),
		create: (body: unknown) => api<AdminProduct>("/products", "post", body),
		changeStatus: (id: number, status: AdminProduct["status"]) =>
			api<AdminProduct>(`/products/${id}/status`, "patch", { status }),
		addImage: (id: number, body: unknown) =>
			api<AdminProduct["images"][number]>(
				`/products/${id}/images`,
				"post",
				body,
			),
		importCsv: (csv: string) =>
			httpClient<ProductImportResult>("/admin/catalog/products/import/csv", {
				method: "post",
				body: csv,
				headers: { "Content-Type": "text/csv" },
			}),
	},
	coupons: {
		list: () => api<AdminCoupon[]>("/admin/coupons"),
		create: (body: unknown) => api<AdminCoupon>("/admin/coupons", "post", body),
		setActive: (id: number, active: boolean) =>
			api<AdminCoupon>(`/admin/coupons/${id}/active`, "patch", { active }),
	},
};
