"use client";

import { AdminModuleHeader } from "@/modules/admin/components/header/AdminModuleHeader";
import { DataTable } from "@/modules/shared/components/data-table/DataTable";
import { FormInput } from "@/modules/shared/components/forms/FormInput";
import { FormSelect } from "@/modules/shared/components/forms/FormSelect";
import { Input } from "@/modules/shared/components/ui/input";
import { DISCOUNT_TYPE_OPTIONS } from "../constants/coupon.constants";
import { useCouponsPage } from "../hooks/use-coupons-page";
export const CouponsPage = () => {
	const {
		changeSearch,
		close,
		retry,
		productHint,
		categoryHint,
		userHint,
		openCreate,
		couponsQuery,
		isCreateOpen,
		search,
		errorMessage,
		form,
		rows,
		filtered,
		submit,
		columns,
	} = useCouponsPage();

	return (
		<main className="mx-auto max-w-360 px-4 py-8 sm:px-6 lg:px-10">
			<AdminModuleHeader
				title="Cupones"
				description="Descuentos y campañas comerciales. Las reglas creadas no se editan ni eliminan."
				actionLabel="Nuevo cupón"
				onAction={openCreate}
			/>
			<div className="mb-4 flex flex-wrap items-center gap-3">
				<Input
					aria-label="Buscar cupones"
					value={search}
					onChange={changeSearch}
					placeholder="Buscar por código"
					className="h-10 w-full max-w-sm border border-zinc-200 px-3 text-sm"
				/>
				<span className="text-sm text-zinc-500">{rows.length} cupones</span>
			</div>
			{couponsQuery.isLoading && (
				<p role="status" className="border bg-white p-6 text-sm">
					Cargando cupones…
				</p>
			)}
			{couponsQuery.isError && (
				<p
					role="alert"
					className="border border-red-200 bg-white p-6 text-sm text-red-800"
				>
					No se pudo cargar cupones.{" "}
					<button type="button" onClick={retry} className="underline">
						Reintentar
					</button>
				</p>
			)}
			{couponsQuery.isSuccess && (
				<DataTable
					columns={columns}
					data={filtered}
					emptyMessage={
						rows.length ? "No hay coincidencias." : "No hay cupones."
					}
					caption="Cupones creados para el marketplace"
				/>
			)}
			{errorMessage && !isCreateOpen && (
				<p role="alert" className="mt-3 text-sm text-red-700">
					{errorMessage}
				</p>
			)}
			{isCreateOpen && (
				<div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
					<section
						role="dialog"
						aria-modal="true"
						aria-labelledby="coupon-form-title"
						className="max-h-[90vh] w-full max-w-3xl overflow-y-auto border bg-white p-6"
					>
						<p className="text-xs font-semibold uppercase tracking-label text-zinc-500">
							Promoción
						</p>
						<h2
							id="coupon-form-title"
							className="mt-1 font-antonio text-2xl font-semibold uppercase"
						>
							Nuevo cupón
						</h2>
						<form
							onSubmit={submit}
							noValidate
							className="mt-5 grid gap-4 sm:grid-cols-2"
						>
							<FormInput
								control={form.control}
								name="code"
								label="Código"
								type="text"
							/>
							<FormSelect
								control={form.control}
								name="discountType"
								label="Tipo"
								options={DISCOUNT_TYPE_OPTIONS}
							/>
							<FormInput
								control={form.control}
								name="discountValue"
								label="Valor"
								type="number"
								step="0.0001"
							/>
							<FormInput
								control={form.control}
								name="minOrderAmount"
								label="Compra mínima"
								type="number"
								step="0.01"
							/>
							<FormInput
								control={form.control}
								name="maxDiscountAmount"
								label="Descuento máximo"
								type="number"
								step="0.01"
							/>
							<FormInput
								control={form.control}
								name="startsAt"
								label="Inicia"
								type="datetime-local"
							/>
							<FormInput
								control={form.control}
								name="endsAt"
								label="Finaliza"
								type="datetime-local"
							/>
							<FormInput
								control={form.control}
								name="usageLimit"
								label="Límite total"
								type="number"
							/>
							<FormInput
								control={form.control}
								name="perUserLimit"
								label="Límite por cliente"
								type="number"
							/>
							<FormInput
								control={form.control}
								name="productIds"
								label="IDs de productos"
								type="text"
								description={productHint}
							/>
							<FormInput
								control={form.control}
								name="categoryIds"
								label="IDs de categorías"
								type="text"
								description={categoryHint}
							/>
							<FormInput
								control={form.control}
								name="userIds"
								label="IDs de usuarios"
								type="text"
								description={userHint}
							/>
							<p className="text-xs text-zinc-500 sm:col-span-2">
								Los IDs segmentados deben ser reales. El cliente no valida
								códigos antes del checkout. Una vez creado, el contrato solo
								permite activar o desactivar.
							</p>
							{errorMessage && (
								<p role="alert" className="text-sm text-red-700 sm:col-span-2">
									{errorMessage}
								</p>
							)}
							<div className="flex justify-end gap-3 border-t pt-4 sm:col-span-2">
								<button
									type="button"
									onClick={close}
									className="min-h-10 px-4 underline"
								>
									Cancelar
								</button>
								<button
									type="submit"
									disabled={form.formState.isSubmitting}
									className="min-h-10 bg-zinc-950 px-5 text-sm font-semibold text-white disabled:opacity-50"
								>
									{form.formState.isSubmitting ? "Creando…" : "Crear cupón"}
								</button>
							</div>
						</form>
					</section>
				</div>
			)}
		</main>
	);
};
