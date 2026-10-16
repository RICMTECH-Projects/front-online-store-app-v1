"use client";

import { AdminModuleHeader } from "@/modules/admin/components/header/AdminModuleHeader";
import { DataTable } from "@/modules/shared/components/data-table/DataTable";
import { Button } from "@/modules/shared/components/ui/button";
import { Input } from "@/modules/shared/components/ui/input";
import { useFulfillmentsPage } from "../hooks/use-fulfillments-page";
import { FulfillmentOrderEditor } from "./FulfillmentOrderEditor";

export const FulfillmentsPage = () => {
	const {
		closeEditor,
		retry,
		pageSize,
		sellerParam,
		orderParam,
		invalidFilter,
		page,
		query,
		pages,
		columns,
		selectedOrder,
		applyFilters,
		goToPage,
	} = useFulfillmentsPage();

	return (
		<main className="mx-auto max-w-360 px-4 py-8 sm:px-6 lg:px-10">
			<AdminModuleHeader
				title="Fulfillment"
				description="Porciones de preparación por tienda. Una orden puede aparecer más de una vez."
				actionLabel=""
				showAction={false}
			/>
			<form
				onSubmit={applyFilters}
				className="mb-5 grid gap-3 border border-zinc-200 bg-white p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
			>
				<label
					htmlFor="fulfillment-filter-seller"
					className="grid gap-2 text-sm font-medium"
				>
					ID de vendedor
					<Input
						id="fulfillment-filter-seller"
						name="sellerId"
						type="number"
						min="1"
						defaultValue={sellerParam ?? ""}
						placeholder="Todas las tiendas"
						className="h-11"
					/>
				</label>
				<label
					htmlFor="fulfillment-filter-order"
					className="grid gap-2 text-sm font-medium"
				>
					ID de orden
					<Input
						id="fulfillment-filter-order"
						name="orderId"
						type="number"
						min="1"
						defaultValue={orderParam ?? ""}
						placeholder="Todas las órdenes"
						className="h-11"
					/>
				</label>
				<Button type="submit" className="min-h-11">
					Aplicar filtros
				</Button>
			</form>
			<p className="mb-4 text-xs leading-5 text-zinc-500">
				Backend pagina por porciones de vendedor (`total`), no por órdenes
				únicas. No devuelve identidad del cliente ni dirección.
			</p>
			{invalidFilter && (
				<p
					role="alert"
					className="mb-4 border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950"
				>
					Usa IDs enteros positivos o limpia los filtros.
				</p>
			)}
			{query.isPending && (
				<p role="status" className="border bg-white p-6 text-sm">
					Cargando porciones de fulfillment…
				</p>
			)}
			{query.isError && (
				<div
					role="alert"
					className="border border-red-200 bg-white p-6 text-sm text-red-800"
				>
					No se pudo cargar la operación.{" "}
					<button type="button" onClick={retry} className="underline">
						Reintentar
					</button>
				</div>
			)}
			{query.isSuccess && (
				<DataTable
					columns={columns}
					data={query.data.items}
					caption="Porciones de órdenes por vendedor"
					emptyMessage="No hay resultados para los filtros seleccionados."
					pagination={
						pages > 0
							? {
									type: "server",
									pageIndex: page,
									pageSize,
									pageCount: pages,
									onPageChange: goToPage,
								}
							: undefined
					}
				/>
			)}
			{selectedOrder && (
				<FulfillmentOrderEditor order={selectedOrder} onClose={closeEditor} />
			)}
			{query.data && (
				<p className="mt-3 text-xs text-zinc-500">
					{query.data.total} porciones en total.
				</p>
			)}
		</main>
	);
};
