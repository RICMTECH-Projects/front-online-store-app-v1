import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminSellersQueryKey } from "../constants/seller-query-keys.constants";
import type { SellerWriteRequest } from "../interfaces/seller.interface";
import { sellersApi } from "../services/sellers-api.service";
import { useAdminSellerList } from "./useAdminSellerList";

export function useAdminSellers() {
	const client = useQueryClient();
	const sellersQuery = useAdminSellerList();
	const invalidate = () =>
		client.invalidateQueries({ queryKey: adminSellersQueryKey });
	const createMutation = useMutation({
		mutationFn: (body: SellerWriteRequest) => sellersApi.create(body),
		onSuccess: invalidate,
	});
	const updateMutation = useMutation({
		mutationFn: ({ id, body }: { id: number; body: SellerWriteRequest }) =>
			sellersApi.update(id, body),
		onSuccess: invalidate,
	});
	const deactivateMutation = useMutation({
		mutationFn: sellersApi.deactivate,
		onSuccess: invalidate,
	});
	return { sellersQuery, createMutation, updateMutation, deactivateMutation };
}
