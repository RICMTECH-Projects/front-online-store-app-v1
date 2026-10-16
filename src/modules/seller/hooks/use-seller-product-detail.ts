"use client";
import { formatMoney } from "@/modules/shared/utils/format-money";

import {
	useAddSellerImage,
	useChangeSellerProductStatus,
	useSellerImages,
	useSellerProduct,
	useSellerProfile,
} from "../hooks/use-seller-portal";

export function useSellerProductDetail(sellerId: number, productId: number) {
	const productQuery = useSellerProduct(sellerId, productId);
	const product = productQuery.data;
	const priceLabel = product
		? formatMoney(product.price, product.currency)
		: null;
	const imagesQuery = useSellerImages(sellerId, productId);
	const profile = useSellerProfile(sellerId);
	const changeStatus = useChangeSellerProductStatus(sellerId, productId);
	const addImage = useAddSellerImage(sellerId, productId);
	const images = imagesQuery.data ?? productQuery.data?.images ?? [];
	const primaryImage = images.find((image) => image.primary) ?? images[0];
	const retry = () => void productQuery.refetch();
	const publish = () => changeStatus.mutate("ACTIVE");
	const deactivate = () => changeStatus.mutate("INACTIVE");
	const archive = () => changeStatus.mutate("ARCHIVED");
	const addImageUrl = (
		body: { url: string; altText?: string; position: number; primary: boolean },
		onSuccess: () => void,
	) => addImage.mutate({ ...body, position: images.length }, { onSuccess });
	return {
		retry,
		publish,
		deactivate,
		archive,
		addImageUrl,
		productQuery,
		product,
		priceLabel,
		imagesQuery,
		profile,
		changeStatus,
		addImage,
		images,
		primaryImage,
	};
}
