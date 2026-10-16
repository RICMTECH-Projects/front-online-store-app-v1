import httpClient from "@/modules/shared/providers/http";
import { adminRequest } from "../../../services/admin-request";
import type {
	AdminProduct,
	ProductImportResult,
} from "../interfaces/product.interface";

export const productsApi = {
	list: (categoryId?: number) =>
		adminRequest<AdminProduct[]>(
			`/products${categoryId ? `?categoryId=${categoryId}` : ""}`,
		),
	create: (
		body: Omit<AdminProduct, "id" | "images" | "status"> & {
			images?: Array<{
				url: string;
				altText?: string;
				position: number;
				primary: boolean;
			}>;
		},
	) => adminRequest<AdminProduct>("/products", "post", body),
	changeStatus: (id: number, status: AdminProduct["status"]) =>
		adminRequest<AdminProduct>(`/products/${id}/status`, "patch", { status }),
	addImage: (
		id: number,
		body: {
			url: string;
			altText?: string | null;
			position: number;
			primary: boolean;
		},
	) =>
		adminRequest<AdminProduct["images"][number]>(
			`/products/${id}/images`,
			"post",
			body,
		),
	importCsv: (csv: string) =>
		httpClient<ProductImportResult>("/admin/catalog/products/import/csv", {
			method: "post",
			body: csv,
			headers: { "Content-Type": "text/csv" },
		}),
};
