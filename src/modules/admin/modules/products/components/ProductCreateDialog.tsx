"use client";

import { FormInput } from "@/modules/shared/components/forms/FormInput";
import { FormSelect } from "@/modules/shared/components/forms/FormSelect";
import { FormTextarea } from "@/modules/shared/components/forms/FormTextarea";
import type { useProductsPage } from "../hooks/use-products-page";

type Model = ReturnType<typeof useProductsPage>;
export function ProductCreateDialog({ model }: { model: Model }) {
	const {
		showCreate,
		submitProduct,
		createForm,
		formError,
		closeCreate,
		sellerOptions,
		categoryOptions,
		brandOptions,
	} = model;
	return (
		<>
			{showCreate && (
				<div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
					<section
						role="dialog"
						aria-modal="true"
						aria-labelledby="product-form-title"
						className="max-h-[90vh] w-full max-w-3xl overflow-y-auto border bg-white p-6"
					>
						<h2
							id="product-form-title"
							className="font-antonio text-2xl font-semibold uppercase"
						>
							Nuevo producto
						</h2>
						<p className="mt-1 text-sm text-zinc-500">
							La API crea estado DRAFT y no incorpora inventario.
						</p>
						<form
							onSubmit={submitProduct}
							noValidate
							className="mt-5 grid gap-4 sm:grid-cols-2"
						>
							<FormSelect
								control={createForm.control}
								name="sellerId"
								label="Comercio"
								options={sellerOptions}
								emptyValue="0"
								placeholder="Selecciona"
							/>
							<FormSelect
								control={createForm.control}
								name="categoryId"
								label="Categoría"
								options={categoryOptions}
								emptyValue="0"
								placeholder="Selecciona"
							/>
							<FormSelect
								control={createForm.control}
								name="brandId"
								label="Marca (opcional)"
								options={brandOptions}
								emptyValue=""
								placeholder="Sin marca"
							/>
							<FormInput
								control={createForm.control}
								name="sku"
								label="SKU"
								className="h-11"
							/>
							<FormInput
								control={createForm.control}
								name="name"
								label="Nombre"
								className="h-11"
							/>
							<FormInput
								control={createForm.control}
								name="slug"
								label="Slug"
								className="h-11"
							/>
							<FormInput
								control={createForm.control}
								name="price"
								label="Precio"
								type="number"
								step="0.0001"
								className="h-11"
							/>
							<FormInput
								control={createForm.control}
								name="currency"
								label="Moneda"
								maxLength={3}
								className="h-11"
							/>
							<FormTextarea
								control={createForm.control}
								name="description"
								label="Descripción"
								rows={3}
								className="sm:col-span-2"
							/>
							{formError && (
								<p role="alert" className="text-sm text-red-700 sm:col-span-2">
									{formError}
								</p>
							)}
							<div className="flex justify-end gap-3 border-t pt-4 sm:col-span-2">
								<button
									type="button"
									onClick={closeCreate}
									className="min-h-10 px-4 underline"
								>
									Cancelar
								</button>
								<button
									type="submit"
									disabled={
										createForm.formState.isSubmitting ||
										categoryOptions.length === 0
									}
									className="min-h-10 bg-zinc-950 px-5 text-sm font-semibold text-white disabled:opacity-50"
								>
									{createForm.formState.isSubmitting
										? "Creando…"
										: "Crear borrador"}
								</button>
							</div>
						</form>
					</section>
				</div>
			)}
		</>
	);
}
