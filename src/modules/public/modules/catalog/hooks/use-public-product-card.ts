"use client";

import { formatMoney } from "@/modules/shared/utils/format-money";
import { useCartStore } from "../../cart/store/useCartStore";
import type { PublicProduct } from "../interfaces/public-catalog.interface";

export function usePublicProductCard(product: PublicProduct) {
	const add = useCartStore((state) => state.add);
	const image =
		product.images.find((item) => item.primary) ?? product.images[0];
	const price = formatMoney(product.price, product.currency);
	const addToCart = () => add(product.id);
	return { image, price, addToCart };
}
