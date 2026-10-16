"use client";

import { AdminModuleHeader } from "@/modules/admin/components/header/AdminModuleHeader";
import { ACCOUNT_STATUS_OPTIONS } from "@/modules/admin/constants/account-status-options";
import { DataTable } from "@/modules/shared/components/data-table/DataTable";
import { FormInput } from "@/modules/shared/components/forms/FormInput";
import { FormSelect } from "@/modules/shared/components/forms/FormSelect";
import { Input } from "@/modules/shared/components/ui/input";
import { useSellersPage } from "../hooks/use-sellers-page";
export const SellersPage = () => {
	const {
		changeSearch,
		closeDialog,
		closeTeam,
		retry,
		teamMembers,
		sellersQuery,
		search,
		editing,
		dialogOpen,
		teamSeller,
		errorMessage,
		form,
		rows,
		filtered,
		detailQuery,
		membersQuery,
		usersQuery,
		startCreate,
		columns,
		submit,
	} = useSellersPage();

	return (
		<main className="mx-auto max-w-360 px-4 py-8 sm:px-6 lg:px-10">
			<AdminModuleHeader
				title="Vendedores"
				description="Comercios y sus operaciones en la plataforma."
				actionLabel="Nuevo vendedor"
				onAction={startCreate}
			/>
			<div className="mb-4 flex flex-wrap items-center gap-3">
				<Input
					value={search}
					onChange={changeSearch}
					aria-label="Buscar vendedores"
					placeholder="Buscar razón social, ID fiscal o correo"
					className="h-10 w-full max-w-md"
				/>
				<span className="text-sm text-zinc-500">
					{rows.length} comercios · listado completo
				</span>
			</div>
			{sellersQuery.isLoading && (
				<p role="status" className="border bg-white p-6 text-sm">
					Cargando comercios…
				</p>
			)}
			{sellersQuery.isError && (
				<p
					role="alert"
					className="border border-red-200 bg-white p-6 text-sm text-red-800"
				>
					No se pudo cargar vendedores.{" "}
					<button type="button" onClick={retry} className="underline">
						Reintentar
					</button>
				</p>
			)}
			{sellersQuery.isSuccess && (
				<DataTable
					columns={columns}
					data={filtered}
					caption="Comercios del marketplace"
					emptyMessage={
						rows.length ? "No hay coincidencias." : "No hay comercios."
					}
				/>
			)}
			{errorMessage && !dialogOpen && (
				<p role="alert" className="mt-3 text-sm text-red-700">
					{errorMessage}
				</p>
			)}
			{dialogOpen && (
				<div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
					<section
						role="dialog"
						aria-modal="true"
						aria-labelledby="seller-form-title"
						className="w-full max-w-xl border bg-white p-6"
					>
						<h2
							id="seller-form-title"
							className="font-antonio text-2xl font-semibold uppercase"
						>
							{editing ? "Editar comercio" : "Crear comercio"}
						</h2>
						<form onSubmit={submit} className="mt-5 grid gap-4" noValidate>
							<FormInput
								control={form.control}
								name="legalName"
								label="Razón social"
								className="h-11"
							/>
							<FormInput
								control={form.control}
								name="taxId"
								label="Identificador fiscal"
								className="h-11"
							/>
							<FormInput
								control={form.control}
								name="email"
								label="Correo"
								type="email"
								className="h-11"
							/>
							{editing ? (
								<p className="text-sm text-zinc-600">
									Estado actual: {editing.status}. Usa “Desactivar” en la tabla
									para inactivar el comercio.
								</p>
							) : (
								<FormSelect
									control={form.control}
									name="status"
									label="Estado"
									options={ACCOUNT_STATUS_OPTIONS}
								/>
							)}
							{errorMessage && (
								<p role="alert" className="text-sm text-red-700">
									{errorMessage}
								</p>
							)}
							<div className="flex justify-end gap-3 border-t pt-4">
								<button
									type="button"
									onClick={closeDialog}
									className="min-h-10 px-4 underline"
								>
									Cancelar
								</button>
								<button
									type="submit"
									disabled={form.formState.isSubmitting}
									className="min-h-10 bg-zinc-950 px-5 text-sm font-semibold text-white disabled:opacity-50"
								>
									{form.formState.isSubmitting ? "Guardando…" : "Guardar"}
								</button>
							</div>
						</form>
					</section>
				</div>
			)}
			{teamSeller && (
				<div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
					<section
						role="dialog"
						aria-modal="true"
						aria-labelledby="seller-team-title"
						className="max-h-[85vh] w-full max-w-2xl overflow-y-auto border bg-white p-6"
					>
						<div className="flex items-start justify-between gap-3">
							<div>
								<p className="text-xs uppercase tracking-label text-zinc-500">
									Equipo comercial · IDN-09
								</p>
								<h2
									id="seller-team-title"
									className="mt-1 font-antonio text-2xl font-semibold uppercase"
								>
									{detailQuery.data?.legalName ?? teamSeller.legalName}
								</h2>
							</div>
							<button
								type="button"
								aria-label="Cerrar"
								onClick={closeTeam}
								className="size-10 text-xl"
							>
								×
							</button>
						</div>
						{membersQuery.isLoading || usersQuery.isLoading ? (
							<p role="status" className="mt-6">
								Cargando membresías…
							</p>
						) : null}
						{membersQuery.isError && (
							<p role="alert" className="mt-5 text-sm text-red-700">
								No se pudo consultar el equipo.
							</p>
						)}
						{membersQuery.data && usersQuery.data && (
							<ul className="mt-5 divide-y border-y">
								{teamMembers.map(({ membership, user }) => (
									<li
										key={membership.id}
										className="flex items-center justify-between gap-4 py-4"
									>
										<div>
											<p className="font-medium">
												{user
													? `${user.firstName} ${user.lastName}`
													: `Usuario #${membership.userId}`}
											</p>
											<p className="text-sm text-zinc-500">
												{user?.email ?? "Datos de usuario no disponibles"} ·{" "}
												{membership.owner ? "Propietario" : "Miembro"} ·{" "}
												{membership.active ? "Activo" : "Inactivo"}
											</p>
										</div>
									</li>
								))}
								{membersQuery.data.length === 0 && (
									<li className="py-8 text-center text-sm text-zinc-500">
										Sin membresías registradas.
									</li>
								)}
							</ul>
						)}
						<p className="mt-4 text-xs text-zinc-500">
							La API devuelve membresías, no nombres ni correos; se complementan
							con la lista autorizada de usuarios.
						</p>
					</section>
				</div>
			)}
		</main>
	);
};
