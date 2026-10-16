"use client";

import { useQuery } from "@tanstack/react-query";
import { publicStoreQueryKeys as keys } from "../constants/public-store-query-keys";
import { publicCatalogApi } from "../services/public-store.service";

export const usePublicProducts = (categoryId?: number) =>
	useQuery({
		queryKey: keys.products(categoryId),
		queryFn: () => publicCatalogApi.list(categoryId),
	});
