"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { createSellerProductColumns } from "../columns/seller-products.columns";
import { useSellerProducts, useSellerProfile } from "./use-seller-portal";

export function useSellerProductList(sellerId: number) {
	const router = useRouter();
	const params = useSearchParams();
	const requestedPage = Number(params.get("page") ?? 0);
	const page =
		Number.isInteger(requestedPage) && requestedPage >= 0 ? requestedPage : 0;
	const products = useSellerProducts(sellerId, page);
	const profile = useSellerProfile(sellerId);
	const columns = createSellerProductColumns(sellerId);
	const changePage = (nextPage: number) => router.push(`?page=${nextPage}`);
	const retry = () => void products.refetch();
	return { products, profile, columns, changePage, retry };
}
