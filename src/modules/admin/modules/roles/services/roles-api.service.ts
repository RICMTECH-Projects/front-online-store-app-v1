import { adminRequest } from "../../../services/admin-request";
import type { AdminRole, RoleRequest } from "../interfaces/role.interface";

export const rolesApi = {
	list: () => adminRequest<AdminRole[]>("/admin/roles"),
	get: (id: number) => adminRequest<AdminRole>(`/admin/roles/${id}`),
	create: (body: RoleRequest) =>
		adminRequest<AdminRole>("/admin/roles", "post", body),
	rename: (id: number, name: string) =>
		adminRequest<AdminRole>(`/admin/roles/${id}`, "put", { name }),
	remove: (id: number) => adminRequest<void>(`/admin/roles/${id}`, "delete"),
};
