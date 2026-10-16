"use client";

import { useQuery } from "@tanstack/react-query";
import { customerQueryKeys } from "../constants/customer-query-keys.constants";
import { customerCommerceApi } from "../services/customer-commerce.service";

export const useCustomerAddresses = () =>
	useQuery({
		queryKey: customerQueryKeys.addresses,
		queryFn: customerCommerceApi.addresses,
		meta: { requiresAuth: true },
	});
