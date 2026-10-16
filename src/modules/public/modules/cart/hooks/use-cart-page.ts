"use client";

import type { ChangeEvent } from "react";
import { formatMoney } from "@/modules/shared/utils/format-money";
import { usePublicProducts } from "../../catalog/hooks/use-public-store";
import { selectCartItems, useCartStore } from "../store/useCartStore";

export function useCartPage() {
	const items = useCartStore(selectCartItems);
	const remove = useCartStore((state) => state.remove);
	const setQuantity = useCartStore((state) => state.setQuantity);
	const products = usePublicProducts();
	const activeProducts = (products.data ?? []).filter((product) =>
		items.some((item) => item.productId === product.id),
	);
	const nonPENProducts = activeProducts.filter(
		(product) => product.currency !== "PEN",
	);
	const unavailable = items.filter(
		(item) => !activeProducts.some((product) => product.id === item.productId),
	);
	const subtotal = activeProducts
		.filter((product) => product.currency === "PEN")
		.reduce(
			(sum, product) =>
				sum +
				product.price *
					(items.find((item) => item.productId === product.id)?.quantity ?? 0),
			0,
		);
	const cartRows = activeProducts.flatMap((product) => {
		const cartItem = items.find((item) => item.productId === product.id);
		if (!cartItem) return [];
		return [
			{
				product,
				cartItem,
				image:
					product.images.find((entry) => entry.primary) ?? product.images[0],
				priceLabel: formatMoney(product.price, product.currency),
			},
		];
	});
	const changeQuantity = (
		productId: number,
		event: ChangeEvent<HTMLInputElement>,
	) => setQuantity(productId, Math.max(1, Number(event.target.value)));
	const removeItem = (productId: number) => remove(productId);
	const subtotalLabel = formatMoney(subtotal, "PEN");
	const canCheckout =
		!products.isError &&
		activeProducts.length > 0 &&
		unavailable.length === 0 &&
		nonPENProducts.length === 0;
	return {
		items,
		products,
		cartRows,
		unavailable,
		nonPENProducts,
		subtotalLabel,
		canCheckout,
		changeQuantity,
		removeItem,
	};
}
