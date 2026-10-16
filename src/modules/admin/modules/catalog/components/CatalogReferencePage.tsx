"use client";

import { AdminModuleHeader } from "@/modules/admin/components/header/AdminModuleHeader";
import { DataTable } from "@/modules/shared/components/data-table/DataTable";
import { FormCheckbox } from "@/modules/shared/components/forms/FormCheckbox";
import { FormInput } from "@/modules/shared/components/forms/FormInput";
import { FormSelect } from "@/modules/shared/components/forms/FormSelect";
import { Input } from "@/modules/shared/components/ui/input";
import { useCatalogReferencePage } from "../hooks/useCatalogReferencePage";

export function CatalogReferencePage({ kind }: { kind: "brand" | "category" }) {
	const {
		changeSearch,
		isCategory,
		resource,
		rows,
		editing,
		createDialogOpen,
		search,
		formError,
		form,
		detailQuery,
		visibleRows,
		columns,
		parentCategoryOptions,
		close,
		openCreate,
		submit,
		retry,
	} = useCatalogReferencePage(kind);

	return (
		<main className="mx-auto max-w-360 px-4 py-8 sm:px-6 lg:px-10">
			<AdminModuleHeader
				title={isCategory ? "Categorías" : "Marcas"}
				description={
					isCategory
						? "Jerarquía y clasificación del catálogo."
						: "Marcas disponibles en el catálogo."
				}
				actionLabel={isCategory ? "Nueva categoría" : "Nueva marca"}
				onAction={openCreate}
			/>
			<div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
				<Input
					value={search}
					onChange={changeSearch}
					aria-label="Buscar referencias"
					placeholder="Buscar por nombre o slug"
					className="h-10 w-full max-w-sm"
				/>
				<p className="text-sm text-zinc-500">
					{rows.length} registros · listado completo
				</p>
			</div>
			{resource.query.isLoading && (
				<p
					role="status"
					className="border border-zinc-200 bg-white p-6 text-sm text-zinc-600"
				>
					Cargando referencias…
				</p>
			)}
			{resource.query.isError && (
				<section
					role="alert"
					className="border border-red-200 bg-white p-6 text-sm text-red-800"
				>
					No se pudo cargar el catálogo.{" "}
					<button type="button" onClick={retry} className="ml-2 underline">
						Reintentar
					</button>
				</section>
			)}
			{resource.query.isSuccess && (
				<DataTable
					columns={columns}
					data={visibleRows}
					emptyMessage={
						rows.length ? "No hay coincidencias." : "No hay registros."
					}
					caption={isCategory ? "Categorías" : "Marcas"}
				/>
			)}
			{(editing !== null || createDialogOpen) && (
				<div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
					<button
						type="button"
						aria-label="Cerrar diálogo"
						className="absolute inset-0"
						onClick={close}
					/>
					<section
						role="dialog"
						aria-modal="true"
						aria-labelledby="reference-dialog-title"
						className="relative z-10 max-h-[90vh] w-full max-w-xl overflow-y-auto border border-zinc-200 bg-white p-6 shadow-xl"
					>
						<div className="flex items-start justify-between gap-4">
							<div>
								<p className="text-xs font-semibold uppercase tracking-label text-zinc-500">
									Administración de catálogo
								</p>
								<h2
									id="reference-dialog-title"
									className="mt-2 font-antonio text-2xl font-semibold uppercase"
								>
									{editing ? "Editar" : "Crear"}{" "}
									{isCategory ? "categoría" : "marca"}
								</h2>
							</div>
							<button
								type="button"
								onClick={close}
								aria-label="Cerrar"
								className="size-10 text-xl"
							>
								×
							</button>
						</div>
						{editing && detailQuery.isLoading && (
							<p role="status" className="mt-4 text-sm">
								Actualizando detalle…
							</p>
						)}
						{editing && detailQuery.isError && (
							<p role="alert" className="mt-4 text-sm text-red-700">
								No se pudo confirmar el detalle desde el backend. Puedes
								cancelar y reintentar.
							</p>
						)}
						<form onSubmit={submit} className="mt-6 space-y-4" noValidate>
							<FormInput
								control={form.control}
								name="name"
								label="Nombre"
								id="catalog-reference-name"
								className="h-11"
							/>
							<FormInput
								control={form.control}
								name="slug"
								label="Slug"
								id="catalog-reference-slug"
								className="h-11"
							/>
							{isCategory && (
								<FormSelect
									control={form.control}
									name="parentId"
									label="Categoría superior"
									id="catalog-reference-parent"
									emptyValue=""
									placeholder="Raíz"
									triggerClassName="w-full"
									description="El backend valida ciclos y referencias jerárquicas."
									options={parentCategoryOptions}
								/>
							)}
							<FormCheckbox
								control={form.control}
								name="active"
								label="Activa"
							/>
							{formError && (
								<p role="alert" className="text-sm text-red-700">
									{formError}
								</p>
							)}
							<div className="flex justify-end gap-3 border-t border-zinc-200 pt-4">
								<button
									type="button"
									onClick={close}
									className="min-h-10 px-4 underline"
								>
									Cancelar
								</button>
								<button
									type="submit"
									disabled={
										form.formState.isSubmitting ||
										Boolean(editing && detailQuery.isLoading)
									}
									className="min-h-10 bg-zinc-950 px-5 text-sm font-semibold text-white disabled:opacity-50"
								>
									{form.formState.isSubmitting ? "Guardando…" : "Guardar"}
								</button>
							</div>
						</form>
					</section>
				</div>
			)}
		</main>
	);
}
