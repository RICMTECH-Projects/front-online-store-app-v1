"use client";

import { LoaderCircle, RefreshCw } from "lucide-react";
import { DataTable } from "@/modules/shared/components/data-table/DataTable";
import { Button } from "@/modules/shared/components/ui/button";
import { useSellerOrdersList } from "../hooks/use-seller-orders-list";

export function SellerOrdersList({ sellerId }: { sellerId: number }) {
	const { page, query, pages, changePage, columns, pageSize, retry } =
		useSellerOrdersList(sellerId);
	return (
		<div>
			<div className="flex flex-wrap items-end justify-between gap-4">
				<div>
					<p className="text-xs font-semibold uppercase tracking-label text-zinc-500">
						Preparación por tienda
					</p>
					<h2 className="mt-2 text-2xl font-semibold">Órdenes</h2>
					<p className="mt-2 text-sm text-zinc-600">
						Solo ves líneas de esta tienda. La API no incluye datos del
						comprador ni dirección.
					</p>
				</div>
				<Button variant="outline" onClick={retry} disabled={query.isFetching}>
					<RefreshCw
						className={`size-4 ${query.isFetching ? "animate-spin" : ""}`}
					/>
					Actualizar
				</Button>
			</div>
			{query.isPending && (
				<p
					role="status"
					className="mt-6 flex items-center gap-2 text-sm text-zinc-600"
				>
					<LoaderCircle className="size-4 animate-spin" />
					Cargando órdenes…
				</p>
			)}
			{query.isError && (
				<div role="alert" className="mt-6 border border-zinc-300 p-5">
					<p>No pudimos cargar las órdenes de esta tienda.</p>
					<Button className="mt-3" variant="outline" onClick={retry}>
						Reintentar
					</Button>
				</div>
			)}
			{query.isSuccess && query.data.items.length === 0 && (
				<div className="mt-6 border border-dashed border-zinc-300 p-8">
					<h3 className="font-semibold">Sin órdenes en esta página</h3>
					<p className="mt-2 text-sm text-zinc-600">
						Cuando existan pedidos para esta tienda, aparecerán aquí.
					</p>
				</div>
			)}
			{query.isSuccess && query.data.items.length > 0 && (
				<div className="mt-6">
					<DataTable
						columns={columns}
						data={query.data.items}
						emptyMessage="Sin órdenes."
						caption="Órdenes asignadas a esta tienda"
						pagination={{
							type: "server",
							pageIndex: page,
							pageSize,
							pageCount: pages,
							onPageChange: changePage,
						}}
					/>
				</div>
			)}
		</div>
	);
}
