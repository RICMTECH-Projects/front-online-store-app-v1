import { useQuery } from "@tanstack/react-query";
import { catalogReferencesApi } from "../../catalog/services/catalog-references-api.service";
import { sellersApi } from "../../sellers/services/sellers-api.service";

export function useAdminProductReferences() {
	const sellersQuery = useQuery({
		queryKey: ["admin", "sellers"],
		queryFn: sellersApi.list,
	});
	const categoriesQuery = useQuery({
		queryKey: ["admin", "categories"],
		queryFn: catalogReferencesApi.categories.list,
	});
	const brandsQuery = useQuery({
		queryKey: ["admin", "brands"],
		queryFn: catalogReferencesApi.brands.list,
	});
	return { sellersQuery, categoriesQuery, brandsQuery };
}
