import { adminRequest } from "../../../services/admin-request";
import type { SellerMembership } from "../interfaces/seller-membership.interface";
import type {
	AdminUser,
	UserCreateRequest,
	UserUpdateRequest,
} from "../interfaces/user.interface";

export const usersApi = {
	list: () => adminRequest<AdminUser[]>("/admin/users"),
	get: (id: number) => adminRequest<AdminUser>(`/admin/users/${id}`),
	create: (body: UserCreateRequest) =>
		adminRequest<AdminUser>("/admin/users", "post", body),
	update: (id: number, body: UserUpdateRequest) =>
		adminRequest<AdminUser>(`/admin/users/${id}`, "put", body),
	replaceRoles: (id: number, roleCodes: string[]) =>
		adminRequest<AdminUser>(`/admin/users/${id}/roles`, "put", { roleCodes }),
	memberships: (id: number) =>
		adminRequest<SellerMembership[]>(`/admin/users/${id}/sellers`),
	assignSeller: (
		userId: number,
		sellerId: number,
		body: { owner: boolean; active: boolean },
	) =>
		adminRequest<SellerMembership>(
			`/admin/users/${userId}/sellers/${sellerId}`,
			"put",
			body,
		),
	deactivateSeller: (userId: number, sellerId: number) =>
		adminRequest<SellerMembership>(
			`/admin/users/${userId}/sellers/${sellerId}`,
			"delete",
		),
};
