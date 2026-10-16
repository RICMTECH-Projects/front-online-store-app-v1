"use client";

import { useQuery } from "@tanstack/react-query";
import { customerQueryKeys } from "../constants/customer-query-keys.constants";
import { customerCommerceApi } from "../services/customer-commerce.service";

export const useCustomerShipment = (orderId: number) =>
	useQuery({
		queryKey: customerQueryKeys.shipment(orderId),
		queryFn: () => customerCommerceApi.shipment(orderId),
		enabled: orderId > 0,
		meta: { requiresAuth: true },
	});
