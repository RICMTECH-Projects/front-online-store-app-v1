"use client";

import { useMemo, useState } from "react";
import { usePublicProducts } from "@/modules/public/modules/catalog/hooks/use-public-store";
import { catalogReferences } from "@/modules/shared/config/catalog-references";

export function useProductGrid() {
	const [categoryId, setCategoryId] = useState<number | undefined>();
	const [sort, setSort] = useState("default");
	const products = usePublicProducts(categoryId);
	const visibleProducts = useMemo(() => {
		const items = [...(products.data ?? [])];
		if (sort === "asc") items.sort((a, b) => a.price - b.price);
		if (sort === "desc") items.sort((a, b) => b.price - a.price);
		return items;
	}, [products.data, sort]);
	const categories = catalogReferences.categories.filter((item) => item.active);
	const changeCategory = (value: string) =>
		setCategoryId(value === "all" ? undefined : Number(value));
	const retry = () => void products.refetch();
	return {
		categoryId,
		sort,
		setSort,
		products,
		visibleProducts,
		categories,
		changeCategory,
		retry,
	};
}
