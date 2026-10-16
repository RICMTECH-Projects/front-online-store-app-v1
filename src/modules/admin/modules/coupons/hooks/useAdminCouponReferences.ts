import { useQuery } from "@tanstack/react-query";
import { catalogReferencesApi } from "../../catalog/services/catalog-references-api.service";
import { productsApi } from "../../products/services/products-api.service";
import { usersApi } from "../../users/services/users-api.service";

export function useAdminCouponReferences() {
	const categoriesQuery = useQuery({
		queryKey: ["admin", "categories"],
		queryFn: catalogReferencesApi.categories.list,
	});
	const productsQuery = useQuery({
		queryKey: ["admin", "products"],
		queryFn: () => productsApi.list(),
	});
	const usersQuery = useQuery({
		queryKey: ["admin", "users"],
		queryFn: usersApi.list,
	});
	return { categoriesQuery, productsQuery, usersQuery };
}
