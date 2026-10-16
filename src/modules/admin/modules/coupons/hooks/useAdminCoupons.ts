import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminCouponsQueryKey } from "../constants/coupon-query-keys.constants";
import type { AdminCoupon } from "../interfaces/coupon.interface";
import { couponsApi } from "../services/coupons-api.service";

export function useAdminCoupons() {
	const client = useQueryClient();
	const couponsQuery = useQuery({
		queryKey: adminCouponsQueryKey,
		queryFn: couponsApi.list,
	});
	const createMutation = useMutation({
		mutationFn: (body: Omit<AdminCoupon, "id" | "usageCount">) =>
			couponsApi.create(body),
		onSuccess: () =>
			client.invalidateQueries({ queryKey: adminCouponsQueryKey }),
	});
	const activeMutation = useMutation({
		mutationFn: ({ id, active }: { id: number; active: boolean }) =>
			couponsApi.setActive(id, active),
		onSuccess: () =>
			client.invalidateQueries({ queryKey: adminCouponsQueryKey }),
	});
	return { couponsQuery, createMutation, activeMutation };
}
