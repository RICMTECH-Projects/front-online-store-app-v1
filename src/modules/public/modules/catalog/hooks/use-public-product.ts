"use client";

import { useQuery } from "@tanstack/react-query";
import { publicStoreQueryKeys as keys } from "../constants/public-store-query-keys";
import { publicCatalogApi } from "../services/public-store.service";

export const usePublicProduct = (id: number) =>
	useQuery({
		queryKey: keys.product(id),
		queryFn: () => publicCatalogApi.get(id),
		enabled: id > 0,
	});
