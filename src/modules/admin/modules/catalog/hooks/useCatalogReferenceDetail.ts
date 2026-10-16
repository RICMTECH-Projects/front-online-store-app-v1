import { useQuery } from "@tanstack/react-query";
import type { CatalogReference } from "../interfaces/catalog-reference.interface";
import { catalogReferencesApi } from "../services/catalog-references-api.service";

export function useCatalogReferenceDetail(
	kind: "brand" | "category",
	item: CatalogReference | null,
) {
	const isCategory = kind === "category";
	return useQuery({
		queryKey: ["admin", isCategory ? "category" : "brand", item?.id],
		queryFn: () => {
			if (!item) throw new Error("Referencia no seleccionada");
			return isCategory
				? catalogReferencesApi.categories.get(item.id)
				: catalogReferencesApi.brands.get(item.id);
		},
		enabled: Boolean(item),
	});
}
