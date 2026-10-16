import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
	AdminBrand,
	AdminCategory,
} from "../interfaces/catalog-reference.interface";
import { catalogReferencesApi } from "../services/catalog-references-api.service";

export function useCatalogReferences(kind: "brand" | "category") {
	const client = useQueryClient();
	const isCategory = kind === "category";
	const key = ["admin", isCategory ? "categories" : "brands"] as const;
	const query = useQuery({
		queryKey: key,
		queryFn: isCategory
			? catalogReferencesApi.categories.list
			: catalogReferencesApi.brands.list,
	});
	const createMutation = useMutation({
		mutationFn: (body: Omit<AdminCategory, "id"> | Omit<AdminBrand, "id">) =>
			isCategory
				? catalogReferencesApi.categories.create(
						body as Omit<AdminCategory, "id">,
					)
				: catalogReferencesApi.brands.create(body as Omit<AdminBrand, "id">),
		onSuccess: () => client.invalidateQueries({ queryKey: key }),
	});
	const updateMutation = useMutation({
		mutationFn: ({
			id,
			body,
		}: {
			id: number;
			body: Omit<AdminCategory, "id"> | Omit<AdminBrand, "id">;
		}) =>
			isCategory
				? catalogReferencesApi.categories.update(
						id,
						body as Omit<AdminCategory, "id">,
					)
				: catalogReferencesApi.brands.update(
						id,
						body as Omit<AdminBrand, "id">,
					),
		onSuccess: () => client.invalidateQueries({ queryKey: key }),
	});
	const deactivateMutation = useMutation({
		mutationFn: (id: number) =>
			isCategory
				? catalogReferencesApi.categories.deactivate(id)
				: catalogReferencesApi.brands.deactivate(id),
		onSuccess: () => client.invalidateQueries({ queryKey: key }),
	});
	return {
		query,
		createMutation,
		updateMutation,
		deactivateMutation,
		isCategory,
	};
}
