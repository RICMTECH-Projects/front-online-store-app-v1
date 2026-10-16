"use client";

import { AdminModuleHeader } from "@/modules/admin/components/header/AdminModuleHeader";
import { ACCOUNT_STATUS_OPTIONS } from "@/modules/admin/constants/account-status-options";
import { DataTable } from "@/modules/shared/components/data-table/DataTable";
import { FormCheckboxGroup } from "@/modules/shared/components/forms/FormCheckboxGroup";
import { FormInput } from "@/modules/shared/components/forms/FormInput";
import { FormSelect } from "@/modules/shared/components/forms/FormSelect";
import { Input } from "@/modules/shared/components/ui/input";
import { useUsersPage } from "../hooks/use-users-page";
export const UsersPage = () => {
	const {
		roleOptions,
		changeSearch,
		close,
		retry,
		usersQuery,
		createMutation,
		updateMutation,
		search,
		editing,
		isOpen,
		formError,
		form,
		users,
		filtered,
		columns,
		openCreate,
		submit,
	} = useUsersPage();

	return (
		<main className="mx-auto max-w-360 px-4 py-8 sm:px-6 lg:px-10">
			<AdminModuleHeader
				title="Usuarios"
				description="Cuentas, roles y accesos administrativos."
				actionLabel="Nuevo usuario"
				onAction={openCreate}
			/>
			<div className="mb-4 flex flex-wrap items-center gap-3">
				<Input
					aria-label="Buscar usuarios"
					value={search}
					onChange={changeSearch}
					placeholder="Buscar nombre, correo o rol"
					className="h-10 w-full max-w-md"
				/>
				<span className="text-sm text-zinc-500">
					{users.length} cuentas · listado completo
				</span>
			</div>
			{usersQuery.isLoading && (
				<p role="status" className="border bg-white p-6 text-sm">
					Cargando usuarios…
				</p>
			)}
			{usersQuery.isError && (
				<p
					role="alert"
					className="border border-red-200 bg-white p-6 text-sm text-red-800"
				>
					No se pudo cargar usuarios.{" "}
					<button type="button" onClick={retry} className="underline">
						Reintentar
					</button>
				</p>
			)}
			{usersQuery.isSuccess && (
				<DataTable
					columns={columns}
					data={filtered}
					emptyMessage={
						users.length ? "No hay coincidencias." : "No hay usuarios."
					}
					caption="Usuarios"
				/>
			)}
			{isOpen && (
				<div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
					<section
						role="dialog"
						aria-modal="true"
						aria-labelledby="user-form-title"
						className="max-h-[90vh] w-full max-w-2xl overflow-y-auto border bg-white p-6"
					>
						<p className="text-xs font-semibold uppercase tracking-label text-zinc-500">
							Cuentas
						</p>
						<h2
							id="user-form-title"
							className="mt-1 font-antonio text-2xl font-semibold uppercase"
						>
							{editing ? "Editar usuario" : "Crear usuario"}
						</h2>
						<form
							onSubmit={submit}
							noValidate
							className="mt-5 grid gap-4 sm:grid-cols-2"
						>
							<FormInput
								control={form.control}
								name="email"
								label="Correo electrónico"
								type="email"
								readOnly={Boolean(editing)}
								className="h-11 read-only:bg-zinc-50 read-only:text-zinc-500 sm:col-span-2"
							/>
							{!editing && (
								<FormInput
									control={form.control}
									name="password"
									label="Contraseña inicial"
									type="password"
									autoComplete="new-password"
									className="h-11 sm:col-span-2"
								/>
							)}
							<FormInput
								control={form.control}
								name="firstName"
								label="Nombres"
								className="h-11"
							/>
							<FormInput
								control={form.control}
								name="lastName"
								label="Apellidos"
								className="h-11"
							/>
							<FormSelect
								control={form.control}
								name="status"
								label="Estado"
								options={ACCOUNT_STATUS_OPTIONS}
							/>
							{!editing && (
								<div className="sm:col-span-2">
									<FormCheckboxGroup
										control={form.control}
										name="roleCodes"
										legend="Roles iniciales"
										options={roleOptions}
									/>
								</div>
							)}
							{formError && (
								<p role="alert" className="text-sm text-red-700 sm:col-span-2">
									{formError}
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
									disabled={
										form.formState.isSubmitting ||
										createMutation.isPending ||
										updateMutation.isPending
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
};
