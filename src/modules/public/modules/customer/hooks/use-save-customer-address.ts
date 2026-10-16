"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customerQueryKeys } from "../constants/customer-query-keys.constants";
import type { CustomerAddressRequest } from "../interfaces/customer-commerce.interface";
import { customerCommerceApi } from "../services/customer-commerce.service";

export const useSaveCustomerAddress = () => {
	const client = useQueryClient();
	return useMutation({
		mutationFn: ({
			id,
			body,
		}: {
			id?: number;
			body: CustomerAddressRequest;
		}) =>
			id
				? customerCommerceApi.updateAddress(id, body)
				: customerCommerceApi.createAddress(body),
		onSuccess: async () =>
			client.invalidateQueries({ queryKey: customerQueryKeys.addresses }),
		meta: { requiresAuth: true },
	});
};
