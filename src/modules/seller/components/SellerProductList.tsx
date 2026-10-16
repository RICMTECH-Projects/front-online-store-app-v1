"use client";
import Link from "next/link";
import { DataTable } from "@/modules/shared/components/data-table/DataTable";
import { Button } from "@/modules/shared/components/ui/button";
import { eyebrow } from "../constants/seller-ui.constants";
import { useSellerProductList } from "../hooks/use-seller-product-list";
import { Loading } from "./Loading";
import { Problem } from "./Problem";

export function SellerProductList({ sellerId }: { sellerId: number }) {
	const { products, profile, columns, changePage, retry } =
		useSellerProductList(sellerId);
	return (
		<div>
			<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className={eyebrow}>Catálogo de la tienda</p>
					<h2 className="mt-2 text-2xl font-semibold">Productos</h2>
					<p className="mt-2 text-sm text-zinc-600">
						Listado paginado por el backend; incluye borradores y productos
						archivados.
					</p>
				</div>
				{profile.data?.status === "ACTIVE" && (
					<Button asChild className="min-h-11">
						<Link href={`/vendedor/${sellerId}/productos/nuevo`}>
							Crear producto
						</Link>
					</Button>
				)}
			</div>
			{products.isPending ? (
				<Loading />
			) : products.isError ? (
				<div className="mt-6">
					<Problem message="No fue posible cargar el catálogo." retry={retry} />
				</div>
			) : (
				<div className="mt-7">
					<DataTable
						columns={columns}
						data={products.data.items}
						caption="Productos de la tienda"
						emptyMessage="Todavía no hay productos. Los productos nuevos empiezan como borrador."
						pagination={
							products.data.totalPages > 0
								? {
										type: "server",
										pageIndex: products.data.page,
										pageSize: products.data.size,
										pageCount: products.data.totalPages,
										onPageChange: changePage,
									}
								: undefined
						}
					/>
				</div>
			)}
			{products.data && (
				<p className="mt-3 text-sm text-zinc-600">
					{products.data.totalElements} productos en total.
				</p>
			)}
		</div>
	);
}
