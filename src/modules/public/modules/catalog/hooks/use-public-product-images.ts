"use client";

import { useQuery } from "@tanstack/react-query";
import { publicStoreQueryKeys as keys } from "../constants/public-store-query-keys";
import { publicCatalogApi } from "../services/public-store.service";

export const usePublicProductImages = (id: number) =>
	useQuery({
		queryKey: keys.images(id),
		queryFn: () => publicCatalogApi.images(id),
		enabled: id > 0,
	});
