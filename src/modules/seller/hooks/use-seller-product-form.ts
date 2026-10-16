"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sellerCatalogReferences } from "../constants/seller-catalog-references";
import { SELLER_PRODUCT_FORM_DEFAULTS } from "../constants/seller-product-form.constants";
import { useCreateSellerProduct } from "../hooks/use-seller-portal";
import {
	type SellerProductFormValues,
	sellerProductSchema,
} from "../schemas/seller-product.schema";

export function useSellerProductForm(
	sellerId: number,
	onCreated: (productId: number) => void,
) {
	const mutation = useCreateSellerProduct(sellerId);
	const form = useForm<SellerProductFormValues>({
		resolver: zodResolver(sellerProductSchema),
		defaultValues: SELLER_PRODUCT_FORM_DEFAULTS,
	});
	const categories = sellerCatalogReferences.categories.filter(
		(item) => item.active,
	);
	const brands = sellerCatalogReferences.brands.filter((item) => item.active);
	const onSubmit = form.handleSubmit((values) => {
		if (
			!categories.some((category) => category.id === Number(values.categoryId))
		)
			return;
		mutation.mutate(
			{
				name: values.name.trim(),
				sku: values.sku.trim(),
				slug: values.slug.trim(),
				description: values.description?.trim(),
				price: Number(values.price),
				categoryId: Number(values.categoryId),
				brandId: values.brandId ? Number(values.brandId) : null,
				currency: "PEN",
				images: values.imageUrl
					? [{ url: values.imageUrl, position: 0, primary: true }]
					: [],
			},
			{ onSuccess: (product) => onCreated(product.id) },
		);
	});
	const categoryOptions = categories.map((category) => ({
		value: String(category.id),
		label: category.name,
	}));
	const brandOptions = brands.map((brand) => ({
		value: String(brand.id),
		label: brand.name,
	}));
	return {
		mutation,
		form,
		categories,
		onSubmit,
		categoryOptions,
		brandOptions,
	};
}
