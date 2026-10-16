"use client";

import { AdminModuleHeader } from "@/modules/admin/components/header/AdminModuleHeader";
import { DataTable } from "@/modules/shared/components/data-table/DataTable";
import { Input } from "@/modules/shared/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/modules/shared/components/ui/select";
import { productImportErrorColumns } from "../columns/products.columns";
import {
	PRODUCT_CSV_TEMPLATE,
	PRODUCT_STATUS_OPTIONS,
} from "../constants/product.constants";
import { useProductsPage } from "../hooks/use-products-page";
import { ProductCreateDialog } from "./ProductCreateDialog";
import { ProductImageDialog } from "./ProductImageDialog";

export const ProductsPage = () => {
	const model = useProductsPage();
	const {
		changeSearch,
		changeKnownProductId,
		selectCsv,
		canActOnKnownProduct,
		changeKnownStatus,
		changeKnownStatusValue,
		addImageToKnownProduct,
		retry,
		openCreate,
		productsQuery,
		statusMutation,
		knownProductId,
		knownStatus,
		search,
		csvResult,
		csvError,
		rows,
		isLoading,
		hasReferenceError,
		columns,
	} = model;

	return (
		<main className="mx-auto max-w-360 px-4 py-8 sm:px-6 lg:px-10">
			<AdminModuleHeader
				title="Productos"
				description="Productos activos y borradores creados durante esta sesión administrativa."
				actionLabel="Nuevo producto"
				onAction={openCreate}
			/>
			<div className="mb-5 grid gap-4 border border-zinc-200 bg-white p-4 md:grid-cols-[1fr_auto] md:items-end">
				<label htmlFor="product-csv-file" className="text-sm font-medium">
					Importar catálogo CSV
					<Input
						id="product-csv-file"
						type="file"
						accept=".csv,text/csv"
						onChange={selectCsv}
						className="mt-2 block w-full text-sm file:mr-3 file:min-h-10 file:border-0 file:bg-zinc-950 file:px-4 file:text-white"
					/>
					<span className="mt-1 block text-xs font-normal text-zinc-500">
						Carga texto CSV, hasta 10 000 filas. No importa imágenes ni
						inventario; no se reintenta automáticamente.
					</span>
				</label>
				<a
					href={PRODUCT_CSV_TEMPLATE}
					download="plantilla-productos.csv"
					className="min-h-10 px-3 text-sm underline underline-offset-4"
				>
					Descargar plantilla CSV
				</a>
			</div>
			{csvError && (
				<p
					role="alert"
					className="mb-3 border border-red-200 bg-white p-3 text-sm text-red-800"
				>
					{csvError}
				</p>
			)}
			{csvResult && (
				<section
					aria-live="polite"
					className={`mb-3 border p-4 text-sm ${csvResult.errors.length ? "border-amber-300 bg-amber-50" : "border-emerald-300 bg-emerald-50"}`}
				>
					<h2 className="font-semibold">Resultado de importación</h2>
					<p>
						Filas recibidas: {csvResult.receivedRows} · Importadas:{" "}
						{csvResult.importedCount}
					</p>
					{csvResult.errors.length > 0 && (
						<div className="mt-2">
							<DataTable
								columns={productImportErrorColumns}
								data={csvResult.errors}
								emptyMessage="Sin errores."
								caption="Errores de importación CSV"
							/>
						</div>
					)}
				</section>
			)}
			<div className="mb-4 flex flex-wrap items-center gap-3">
				<Input
					value={search}
					onChange={changeSearch}
					aria-label="Buscar productos"
					placeholder="Buscar por nombre, SKU o slug"
					className="h-10 w-full max-w-md border border-zinc-200 px-3 text-sm"
				/>
				<span className="text-sm text-zinc-500">
					{rows.length} productos visibles
				</span>
			</div>
			{isLoading && (
				<p role="status" className="border bg-white p-6 text-sm">
					Cargando productos y referencias…
				</p>
			)}
			{(productsQuery.isError || hasReferenceError) && (
				<p
					role="alert"
					className="border border-red-200 bg-white p-6 text-sm text-red-800"
				>
					No se pudieron cargar catálogo o referencias.{" "}
					<button type="button" onClick={retry} className="underline">
						Reintentar
					</button>
				</p>
			)}
			{!isLoading && !productsQuery.isError && !hasReferenceError && (
				<DataTable
					columns={columns}
					data={rows}
					emptyMessage="No hay productos activos en el catálogo público."
					caption="Catálogo de productos"
				/>
			)}
			<p className="mt-3 text-xs text-zinc-500">
				El listado API solo incluye productos ACTIVE. Los borradores recién
				creados se conservan en esta sesión. No existe listado administrativo de
				otros productos no públicos.
			</p>
			<section className="mt-5 border border-zinc-200 bg-white p-5">
				<p className="text-xs font-semibold uppercase tracking-label text-zinc-500">
					Operación de producto conocido
				</p>
				<h2 className="mt-1 font-antonio text-lg font-semibold uppercase">
					Acciones por ID
				</h2>
				<p className="mt-1 text-sm text-zinc-600">
					Para productos DRAFT, INACTIVE o ARCHIVED fuera de esta sesión. La API
					no permite consultar su ficha completa.
				</p>
				<div className="mt-4 grid gap-3 sm:grid-cols-[minmax(8rem,12rem)_minmax(9rem,14rem)_auto_auto] sm:items-end">
					<label
						htmlFor="known-product-id"
						className="grid gap-2 text-sm font-medium"
					>
						ID de producto
						<Input
							id="known-product-id"
							value={knownProductId}
							onChange={changeKnownProductId}
							inputMode="numeric"
							pattern="[0-9]*"
							aria-label="ID de producto conocido"
							className="h-11"
						/>
					</label>
					<div className="grid gap-2 text-sm font-medium">
						<label htmlFor="known-product-status">Estado</label>
						<Select value={knownStatus} onValueChange={changeKnownStatusValue}>
							<SelectTrigger id="known-product-status" className="h-11">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{PRODUCT_STATUS_OPTIONS.map((status) => (
									<SelectItem key={status} value={status}>
										{status}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<button
						type="button"
						disabled={!canActOnKnownProduct || statusMutation.isPending}
						onClick={changeKnownStatus}
						className="min-h-11 bg-zinc-950 px-4 text-sm text-white disabled:opacity-50"
					>
						Cambiar estado
					</button>
					<button
						type="button"
						disabled={!canActOnKnownProduct}
						onClick={addImageToKnownProduct}
						className="min-h-11 border border-zinc-300 px-4 text-sm disabled:opacity-50"
					>
						Agregar imagen
					</button>
				</div>
				{statusMutation.isError && (
					<p role="alert" className="mt-3 text-sm text-red-700">
						No se pudo cambiar el estado del ID indicado.
					</p>
				)}
			</section>
			<ProductCreateDialog model={model} />
			<ProductImageDialog model={model} />
		</main>
	);
};
