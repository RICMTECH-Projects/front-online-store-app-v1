"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customerQueryKeys } from "../constants/customer-query-keys.constants";
import { customerCommerceApi } from "../services/customer-commerce.service";

export const useDeleteCustomerAddress = () => {
	const client = useQueryClient();
	return useMutation({
		mutationFn: customerCommerceApi.deleteAddress,
		onSuccess: async () =>
			client.invalidateQueries({ queryKey: customerQueryKeys.addresses }),
		meta: { requiresAuth: true },
	});
};
