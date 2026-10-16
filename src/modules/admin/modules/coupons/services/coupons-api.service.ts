import { adminRequest } from "../../../services/admin-request";
import type { AdminCoupon } from "../interfaces/coupon.interface";

export const couponsApi = {
	list: () => adminRequest<AdminCoupon[]>("/admin/coupons"),
	create: (body: Omit<AdminCoupon, "id" | "usageCount">) =>
		adminRequest<AdminCoupon>("/admin/coupons", "post", body),
	setActive: (id: number, active: boolean) =>
		adminRequest<AdminCoupon>(`/admin/coupons/${id}/active`, "patch", {
			active,
		}),
};
