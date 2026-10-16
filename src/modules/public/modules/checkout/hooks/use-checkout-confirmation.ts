"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useAuthStore } from "@/modules/auth";
import type { CheckoutReceipt } from "../interfaces/receipt.interface";
import { receiptKey } from "../utils/receipt-key.util";

export function useCheckoutConfirmation() {
	const params = useParams<{ orderId: string }>();
	const orderId = Number(params.orderId);
	const user = useAuthStore((state) => state.user);
	const receiptQuery = useQuery({
		queryKey: ["checkout", "receipt", user?.id, orderId],
		queryFn: () => {
			if (!user) return null;
			try {
				const stored = sessionStorage.getItem(receiptKey(user.id, orderId));
				return stored ? (JSON.parse(stored) as CheckoutReceipt) : null;
			} catch {
				return null;
			}
		},
		enabled: Boolean(user && Number.isInteger(orderId) && orderId > 0),
		staleTime: Infinity,
	});
	return { orderId, receiptQuery, receipt: receiptQuery.data };
}
