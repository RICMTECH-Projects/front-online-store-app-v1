"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customerQueryKeys } from "../constants/customer-query-keys.constants";
import type { CheckoutInput } from "../interfaces/customer-commerce.interface";
import { customerCommerceApi } from "../services/customer-commerce.service";

export const useCreateOrder = () => {
	const client = useQueryClient();
	return useMutation({
		mutationFn: (input: CheckoutInput) => customerCommerceApi.checkout(input),
		onSuccess: async () =>
			client.invalidateQueries({ queryKey: customerQueryKeys.addresses }),
		meta: { requiresAuth: true },
	});
};
