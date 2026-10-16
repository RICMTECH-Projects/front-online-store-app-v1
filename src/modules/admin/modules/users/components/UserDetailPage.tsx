"use client";

import Link from "next/link";
import { FormCheckbox } from "@/modules/shared/components/forms/FormCheckbox";
import { FormCheckboxGroup } from "@/modules/shared/components/forms/FormCheckboxGroup";
import { FormSelect } from "@/modules/shared/components/forms/FormSelect";
import { useUserDetailPage } from "../hooks/use-user-detail-page";
export function UserDetailPage({ userId }: { userId: number }) {
	const {
		roleOptions,
		sellerOptions,
		membershipsWithSellers,
		userQuery,
		membershipsQuery,
		replaceRolesMutation,
		assignMutation,
		deactivateMutation,
		rolesForm,
		membershipForm,
		user,
		feedback,
		submitRoles,
		submitMembership,
		deactivate,
	} = useUserDetailPage(userId);

	if (userQuery.isLoading)
		return (
			<main className="mx-auto max-w-5xl px-4 py-8">
				<p role="status" className="border bg-white p-6">
					Cargando usuario…
				</p>
			</main>
		);
	if (userQuery.isError || !user)
		return (
			<main className="mx-auto max-w-5xl px-4 py-8">
				<p
					role="alert"
					className="border border-red-200 bg-white p-6 text-sm text-red-800"
				>
					No se pudo cargar el usuario.{" "}
					<Link href="/usuarios" className="underline">
						Volver al listado
					</Link>
				</p>
			</main>
		);
	return (
		<main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
			<Link
				href="/usuarios"
				className="text-sm text-zinc-600 underline underline-offset-4"
			>
				Volver a usuarios
			</Link>
			<p className="mt-7 text-xs font-semibold uppercase tracking-label text-zinc-500">
				Administración de identidad · IDN-02
			</p>
			<h1 className="mt-2 font-antonio text-3xl font-semibold uppercase">
				{user.firstName} {user.lastName}
			</h1>
			<p className="mt-1 text-sm text-zinc-600">
				{user.email} · ID {user.id} · {user.status}
			</p>
			{feedback && (
				<p
					role="status"
					aria-live="polite"
					className="mt-5 border border-zinc-200 bg-white p-4 text-sm"
				>
					{feedback}
				</p>
			)}
			<section className="mt-7 border border-zinc-200 bg-white p-6">
				<p className="text-xs uppercase tracking-label text-zinc-500">IDN-05</p>
				<h2 className="mt-1 font-antonio text-xl font-semibold uppercase">
					Reemplazar roles
				</h2>
				<p className="mt-1 text-sm text-zinc-500">
					La selección reemplaza todos los roles actuales. Un rol personalizado
					no crea permisos de API.
				</p>
				<form onSubmit={submitRoles} className="mt-4">
					<FormCheckboxGroup
						control={rolesForm.control}
						name="roleCodes"
						legend="Roles asignados"
						options={roleOptions}
					/>{" "}
					<button
						type="submit"
						disabled={
							replaceRolesMutation.isPending || rolesForm.formState.isSubmitting
						}
						className="mt-4 min-h-10 bg-zinc-950 px-5 text-sm text-white disabled:opacity-50"
					>
						{replaceRolesMutation.isPending ? "Guardando…" : "Guardar roles"}
					</button>
				</form>
			</section>
			<section className="mt-6 border border-zinc-200 bg-white p-6">
				<p className="text-xs uppercase tracking-label text-zinc-500">
					IDN-06…08
				</p>
				<h2 className="mt-1 font-antonio text-xl font-semibold uppercase">
					Acceso a tiendas
				</h2>
				<form
					onSubmit={submitMembership}
					className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto_auto_auto] sm:items-end"
				>
					<FormSelect
						control={membershipForm.control}
						name="sellerId"
						label="Tienda"
						options={sellerOptions}
						placeholder="Selecciona"
						emptyValue="0"
					/>
					<FormCheckbox
						control={membershipForm.control}
						name="owner"
						label="Propietario"
					/>
					<FormCheckbox
						control={membershipForm.control}
						name="active"
						label="Activo"
					/>
					<button
						type="submit"
						disabled={assignMutation.isPending}
						className="min-h-11 bg-zinc-950 px-4 text-sm text-white disabled:opacity-50"
					>
						Asignar / actualizar
					</button>
				</form>
				<div className="mt-5 divide-y border-y">
					{membershipsQuery.isLoading && (
						<p role="status" className="py-4 text-sm">
							Cargando membresías…
						</p>
					)}
					{membershipsQuery.isError && (
						<p role="alert" className="py-4 text-sm text-red-700">
							No se pudieron cargar membresías.
						</p>
					)}
					{membershipsWithSellers.map(({ membership, seller }) => (
						<div
							key={membership.id}
							className="flex flex-wrap items-center justify-between gap-3 py-4"
						>
							<div>
								<p className="font-medium">
									{seller?.legalName ?? `Comercio #${membership.sellerId}`}
								</p>
								<p className="text-sm text-zinc-500">
									{membership.owner ? "Propietario" : "Miembro"} ·{" "}
									{membership.active ? "Activo" : "Histórico/inactivo"}
								</p>
							</div>
							{membership.active && (
								<button
									type="button"
									onClick={() =>
										deactivate(
											membership.sellerId,
											seller?.legalName ?? `#${membership.sellerId}`,
										)
									}
									disabled={deactivateMutation.isPending}
									className="min-h-9 px-3 text-red-700 underline disabled:opacity-50"
								>
									Revocar acceso
								</button>
							)}
						</div>
					))}
					{membershipsQuery.data?.length === 0 && (
						<p className="py-6 text-sm text-zinc-500">
							El usuario no tiene membresías.
						</p>
					)}
				</div>
				<p className="mt-3 text-xs text-zinc-500">
					La revocación conserva historial y no elimina el rol SELLER. La API
					protege cada acceso según membresía activa.
				</p>
			</section>
		</main>
	);
}
