"use client";

import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useCartStore } from "../../cart/store/useCartStore";
import { usePublicProduct, usePublicProductImages } from "./use-public-store";

export function usePublicProductDetail() {
	const params = useParams<{ id: string }>();
	const id = Number(params.id);
	const product = usePublicProduct(id);
	const imagesQuery = usePublicProductImages(id);
	const add = useCartStore((state) => state.add);
	const [activeIndex, setActiveIndex] = useState(0);
	const images = useMemo(
		() =>
			[...(imagesQuery.data ?? product.data?.images ?? [])].sort(
				(a, b) => a.position - b.position || a.id - b.id,
			),
		[imagesQuery.data, product.data?.images],
	);
	const activeImage =
		images[Math.min(activeIndex, Math.max(images.length - 1, 0))];
	const previousImage = () =>
		setActiveIndex((index) => (index - 1 + images.length) % images.length);
	const nextImage = () =>
		setActiveIndex((index) => (index + 1) % images.length);
	const selectImage = (index: number) => setActiveIndex(index);
	const addCurrentProduct = () => {
		if (product.data) add(product.data.id);
	};
	const priceLabel = product.data
		? new Intl.NumberFormat("es-PE", {
				style: "currency",
				currency: product.data.currency,
			}).format(product.data.price)
		: "";
	return {
		id,
		product,
		imagesQuery,
		images,
		activeIndex,
		activeImage,
		previousImage,
		nextImage,
		selectImage,
		addCurrentProduct,
		priceLabel,
	};
}
