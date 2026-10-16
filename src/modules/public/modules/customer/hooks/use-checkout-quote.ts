"use client";

import { useQuery } from "@tanstack/react-query";
import { customerQueryKeys } from "../constants/customer-query-keys.constants";
import { customerCommerceApi } from "../services/customer-commerce.service";

export const useCheckoutQuote = (
	addressId: number,
	subtotal: number,
	enabled: boolean,
) =>
	useQuery({
		queryKey: customerQueryKeys.quote(addressId, subtotal),
		queryFn: () =>
			customerCommerceApi.quote({
				shippingAddressId: addressId,
				merchandiseSubtotal: subtotal,
				currency: "PEN",
			}),
		enabled: enabled && addressId > 0 && subtotal >= 0,
		meta: { requiresAuth: true },
	});
