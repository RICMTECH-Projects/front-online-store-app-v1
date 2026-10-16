import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminProductsQueryKey } from "../constants/product-query-keys.constants";
import type { AdminProduct } from "../interfaces/product.interface";
import { productsApi } from "../services/products-api.service";
import { useAdminProductList } from "./useAdminProductList";

export function useAdminProducts() {
	const client = useQueryClient();
	const productsQuery = useAdminProductList();
	const invalidate = () =>
		client.invalidateQueries({ queryKey: adminProductsQueryKey });
	const createMutation = useMutation({
		mutationFn: productsApi.create,
		onSuccess: invalidate,
	});
	const statusMutation = useMutation({
		mutationFn: ({
			id,
			status,
		}: {
			id: number;
			status: AdminProduct["status"];
		}) => productsApi.changeStatus(id, status),
		onSuccess: invalidate,
	});
	const imageMutation = useMutation({
		mutationFn: ({
			id,
			body,
		}: {
			id: number;
			body: {
				url: string;
				altText: string | null;
				position: number;
				primary: boolean;
			};
		}) => productsApi.addImage(id, body),
		onSuccess: invalidate,
	});
	const importMutation = useMutation({
		mutationFn: productsApi.importCsv,
		onSuccess: invalidate,
	});
	return {
		productsQuery,
		createMutation,
		statusMutation,
		imageMutation,
		importMutation,
	};
}
