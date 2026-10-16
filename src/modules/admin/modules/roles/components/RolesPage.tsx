"use client";

import { AdminModuleHeader } from "@/modules/admin/components/header/AdminModuleHeader";
import { DataTable } from "@/modules/shared/components/data-table/DataTable";
import { FormInput } from "@/modules/shared/components/forms/FormInput";
import { Input } from "@/modules/shared/components/ui/input";
import { useRolesPage } from "../hooks/use-roles-page";
export const RolesPage = () => {
	const {
		openCreate,
		closeDetail,
		closeDialog,
		closeRename,
		changeSearch,
		retry,
		rolesQuery,
		search,
		selected,
		dialogMode,
		formError,
		form,
		renameForm,
		detailQuery,
		filtered,
		userCount,
		submitCreate,
		submitRename,
		columns,
	} = useRolesPage();

	return (
		<main className="mx-auto max-w-360 px-4 py-8 sm:px-6 lg:px-10">
			<AdminModuleHeader
				title="Roles"
				description="Permisos y responsabilidades disponibles. Crear un rol personalizado no concede acceso a endpoints."
				actionLabel="Nuevo rol"
				onAction={openCreate}
			/>
			<div className="mb-4 flex flex-wrap items-center gap-3">
				<Input
					value={search}
					onChange={changeSearch}
					aria-label="Buscar roles"
					placeholder="Buscar código o nombre"
					className="h-10 w-full max-w-sm"
				/>
				<span className="text-sm text-zinc-500">
					{rolesQuery.data?.length ?? 0} roles
				</span>
			</div>
			{rolesQuery.isLoading && (
				<p role="status" className="border bg-white p-6 text-sm">
					Cargando roles…
				</p>
			)}
			{rolesQuery.isError && (
				<p
					role="alert"
					className="border border-red-200 bg-white p-6 text-sm text-red-800"
				>
					No se pudo cargar roles.{" "}
					<button type="button" onClick={retry} className="underline">
						Reintentar
					</button>
				</p>
			)}
			{rolesQuery.isSuccess && (
				<DataTable
					columns={columns}
					data={filtered}
					emptyMessage={
						rolesQuery.data?.length ? "No hay coincidencias." : "No hay roles."
					}
					caption="Roles del sistema"
				/>
			)}
			{formError && !dialogMode && (
				<p role="alert" className="mt-3 text-sm text-red-700">
					{formError}
				</p>
			)}
			{selected && !dialogMode && (
				<div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
					<section
						role="dialog"
						aria-modal="true"
						aria-labelledby="role-detail-title"
						className="w-full max-w-lg border bg-white p-6"
					>
						<div className="flex justify-between">
							<div>
								<p className="text-xs uppercase tracking-widest text-zinc-500">
									Detalle del rol · IDN-11
								</p>
								<h2
									id="role-detail-title"
									className="mt-2 font-antonio text-2xl font-semibold uppercase"
								>
									{detailQuery.data?.name ?? selected.name}
								</h2>
							</div>
							<button
								type="button"
								onClick={closeDetail}
								aria-label="Cerrar"
								className="size-10 text-xl"
							>
								×
							</button>
						</div>
						{detailQuery.isLoading ? (
							<p role="status" className="mt-5">
								Cargando…
							</p>
						) : (
							<dl className="mt-5 space-y-3 border-t pt-4 text-sm">
								<div>
									<dt className="text-zinc-500">ID</dt>
									<dd>{detailQuery.data?.id ?? selected.id}</dd>
								</div>
								<div>
									<dt className="text-zinc-500">Código</dt>
									<dd className="font-mono">
										{detailQuery.data?.code ?? selected.code}
									</dd>
								</div>
								<div>
									<dt className="text-zinc-500">Asignaciones</dt>
									<dd>{userCount(selected.code) ?? "No disponible"}</dd>
								</div>
							</dl>
						)}
						{detailQuery.isError && (
							<p role="alert" className="mt-3 text-sm text-red-700">
								No se pudo cargar el detalle.
							</p>
						)}
					</section>
				</div>
			)}
			{dialogMode && (
				<div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
					<section
						role="dialog"
						aria-modal="true"
						aria-labelledby="role-form-title"
						className="w-full max-w-lg border bg-white p-6"
					>
						<h2
							id="role-form-title"
							className="font-antonio text-2xl font-semibold uppercase"
						>
							{dialogMode === "create" ? "Nuevo rol" : "Renombrar rol"}
						</h2>
						{dialogMode === "create" ? (
							<form
								onSubmit={submitCreate}
								className="mt-5 space-y-4"
								noValidate
							>
								<FormInput
									control={form.control}
									name="code"
									label="Código"
									maxLength={50}
									className="h-11"
								/>
								<FormInput
									control={form.control}
									name="name"
									label="Nombre"
									maxLength={100}
									className="h-11"
								/>
								<p className="text-xs text-zinc-500">
									Los roles personalizados no habilitan por sí mismos permisos
									del backend.
								</p>
								{formError && (
									<p role="alert" className="text-sm text-red-700">
										{formError}
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
										className="min-h-10 bg-zinc-950 px-5 text-sm text-white disabled:opacity-50"
									>
										Crear rol
									</button>
								</div>
							</form>
						) : (
							<form
								onSubmit={submitRename}
								className="mt-5 space-y-4"
								noValidate
							>
								<p className="text-sm text-zinc-600">
									Código: {selected?.code} · ID {selected?.id}
								</p>
								<FormInput
									control={renameForm.control}
									name="name"
									label="Nombre"
									maxLength={100}
									className="h-11"
								/>
								{formError && (
									<p role="alert" className="text-sm text-red-700">
										{formError}
									</p>
								)}
								<div className="flex justify-end gap-3 border-t pt-4">
									<button
										type="button"
										onClick={closeRename}
										className="min-h-10 px-4 underline"
									>
										Cancelar
									</button>
									<button
										type="submit"
										disabled={renameForm.formState.isSubmitting}
										className="min-h-10 bg-zinc-950 px-5 text-sm text-white disabled:opacity-50"
									>
										Guardar nombre
									</button>
								</div>
							</form>
						)}
					</section>
				</div>
			)}
		</main>
	);
};
