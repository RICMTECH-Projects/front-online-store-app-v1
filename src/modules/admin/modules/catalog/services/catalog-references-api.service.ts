import { adminRequest } from "../../../services/admin-request";
import type {
	AdminBrand,
	AdminCategory,
} from "../interfaces/catalog-reference.interface";

export const catalogReferencesApi = {
	brands: {
		list: () => adminRequest<AdminBrand[]>("/admin/catalog/brands"),
		get: (id: number) =>
			adminRequest<AdminBrand>(`/admin/catalog/brands/${id}`),
		create: (body: Omit<AdminBrand, "id">) =>
			adminRequest<AdminBrand>("/admin/catalog/brands", "post", body),
		update: (id: number, body: Omit<AdminBrand, "id">) =>
			adminRequest<AdminBrand>(`/admin/catalog/brands/${id}`, "put", body),
		deactivate: (id: number) =>
			adminRequest<AdminBrand>(`/admin/catalog/brands/${id}`, "delete"),
	},
	categories: {
		list: () => adminRequest<AdminCategory[]>("/admin/catalog/categories"),
		get: (id: number) =>
			adminRequest<AdminCategory>(`/admin/catalog/categories/${id}`),
		create: (body: Omit<AdminCategory, "id">) =>
			adminRequest<AdminCategory>("/admin/catalog/categories", "post", body),
		update: (id: number, body: Omit<AdminCategory, "id">) =>
			adminRequest<AdminCategory>(
				`/admin/catalog/categories/${id}`,
				"put",
				body,
			),
		deactivate: (id: number) =>
			adminRequest<AdminCategory>(`/admin/catalog/categories/${id}`, "delete"),
	},
};
