import { adminRequest } from "../../../services/admin-request";
import type { SellerMembership } from "../../users/interfaces/seller-membership.interface";
import type {
	AdminSeller,
	SellerWriteRequest,
} from "../interfaces/seller.interface";

export const sellersApi = {
	list: () => adminRequest<AdminSeller[]>("/admin/catalog/sellers"),
	get: (id: number) =>
		adminRequest<AdminSeller>(`/admin/catalog/sellers/${id}`),
	create: (body: SellerWriteRequest) =>
		adminRequest<AdminSeller>("/admin/catalog/sellers", "post", body),
	update: (id: number, body: SellerWriteRequest) =>
		adminRequest<AdminSeller>(`/admin/catalog/sellers/${id}`, "put", body),
	deactivate: (id: number) =>
		adminRequest<AdminSeller>(`/admin/catalog/sellers/${id}`, "delete"),
	members: (id: number) =>
		adminRequest<SellerMembership[]>(`/admin/sellers/${id}/users`),
};
