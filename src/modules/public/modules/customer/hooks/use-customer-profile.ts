"use client";

import { useQuery } from "@tanstack/react-query";
import { customerQueryKeys } from "../constants/customer-query-keys.constants";
import { customerCommerceApi } from "../services/customer-commerce.service";

export const useCustomerProfile = () =>
	useQuery({
		queryKey: customerQueryKeys.profile,
		queryFn: customerCommerceApi.profile,
		meta: { requiresAuth: true },
	});
