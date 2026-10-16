import { useQuery } from "@tanstack/react-query";
import { adminProductsQueryKey } from "../constants/product-query-keys.constants";
import { productsApi } from "../services/products-api.service";

export function useAdminProductList() {
	return useQuery({
		queryKey: adminProductsQueryKey,
		queryFn: () => productsApi.list(),
	});
}
