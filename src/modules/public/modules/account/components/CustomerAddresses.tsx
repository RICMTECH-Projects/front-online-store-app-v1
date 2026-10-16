"use client";

import {
	Check,
	LoaderCircle,
	MapPin,
	Pencil,
	Plus,
	Trash2,
	X,
} from "lucide-react";
import { FormCheckbox } from "@/modules/shared/components/forms/FormCheckbox";
import { FormInput } from "@/modules/shared/components/forms/FormInput";
import { Button } from "@/modules/shared/components/ui/button";

import { ADDRESS_FIELDS } from "../constants/address-form.constants";
import { useCustomerAddressesPage } from "../hooks/use-customer-addresses-page";

export function CustomerAddresses() {
	const {
		addresses,
		addressRows,
		save,
		remove,
		editing,
		confirmDelete,
		form,
		startEdit,
		startCreate,
		submit,
		retry,
		askDelete,
		cancelDelete,
		confirmRemove,
	} = useCustomerAddressesPage();

	return (
		<section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
			<div>
				<div className="flex items-end justify-between gap-4">
					<div>
						<p className="text-xs font-semibold uppercase tracking-label text-zinc-500">
							Libreta
						</p>
						<h2 className="mt-2 text-2xl font-semibold">Tus direcciones</h2>
					</div>
					<Button type="button" variant="outline" onClick={startCreate}>
						<Plus className="size-4" />
						Nueva dirección
					</Button>
				</div>
				{addresses.isPending ? (
					<p className="mt-5 flex items-center gap-2 text-sm text-zinc-600">
						<LoaderCircle className="size-4 animate-spin" />
						Cargando direcciones…
					</p>
				) : addresses.isError ? (
					<div className="mt-5 border p-5">
						<p role="alert">No pudimos cargar tus direcciones.</p>
						<button type="button" onClick={retry} className="mt-3 underline">
							Intentar de nuevo
						</button>
					</div>
				) : addresses.data.length === 0 ? (
					<div className="mt-5 border border-dashed border-zinc-300 p-7">
						<MapPin className="size-5" />
						<p className="mt-3 font-medium">Aún no guardaste una dirección.</p>
						<p className="mt-1 text-sm text-zinc-600">
							Puedes crearla aquí o al continuar a tu compra.
						</p>
					</div>
				) : (
					<div className="mt-5 grid gap-3">
						{addressRows.map((address) => (
							<article key={address.id} className="border border-zinc-200 p-5">
								<div className="flex flex-wrap items-start justify-between gap-4">
									<div>
										<div className="flex flex-wrap items-center gap-2">
											<h3 className="font-semibold">
												{address.label || "Dirección"}
											</h3>
											{address.defaultAddress && (
												<span className="border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs text-emerald-900">
													Predeterminada
												</span>
											)}
										</div>
										<p className="mt-2 text-sm">{address.recipientLabel}</p>
										<p className="mt-1 text-sm text-zinc-600">
											{address.locationLabel}
										</p>
									</div>
									<div className="flex gap-2">
										<Button
											type="button"
											variant="outline"
											size="sm"
											onClick={() => startEdit(address)}
										>
											<Pencil className="size-3" />
											Editar
										</Button>
										<Button
											type="button"
											variant="outline"
											size="sm"
											onClick={() => askDelete(address.id)}
											aria-label={`Eliminar ${address.label || "dirección"}`}
										>
											<Trash2 className="size-3" />
										</Button>
									</div>
								</div>
								{confirmDelete === address.id && (
									<div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-4 text-sm">
										<span>¿Eliminar esta dirección?</span>
										<span className="flex gap-2">
											<Button
												type="button"
												variant="outline"
												size="sm"
												onClick={cancelDelete}
											>
												<X className="size-3" />
												No
											</Button>
											<Button
												type="button"
												variant="destructive"
												size="sm"
												disabled={remove.isPending}
												onClick={() => confirmRemove(address.id)}
											>
												{remove.isPending ? "Eliminando…" : "Sí, eliminar"}
											</Button>
										</span>
									</div>
								)}
							</article>
						))}
					</div>
				)}
			</div>
			<aside className="h-fit border border-zinc-200 p-5">
				<p className="text-xs font-semibold uppercase tracking-label text-zinc-500">
					{editing ? "Editar" : "Nueva"}
				</p>
				<h2 className="mt-2 text-xl font-semibold">Dirección de envío</h2>
				<form className="mt-5 grid gap-4" onSubmit={submit} noValidate>
					{ADDRESS_FIELDS.map(({ key, label, required, maxLength }) => (
						<FormInput
							key={key}
							control={form.control}
							name={key}
							label={`${label}${required ? " *" : ""}`}
							required={required}
							maxLength={maxLength}
						/>
					))}
					<FormCheckbox
						control={form.control}
						name="defaultAddress"
						label="Usar como predeterminada"
					/>
					<Button className="min-h-11" type="submit" disabled={save.isPending}>
						{save.isPending
							? "Guardando…"
							: editing
								? "Guardar dirección"
								: "Añadir dirección"}
					</Button>
					{editing && (
						<Button type="button" variant="ghost" onClick={startCreate}>
							<X className="size-4" />
							Cancelar edición
						</Button>
					)}
					{save.isSuccess && (
						<p
							className="flex items-center gap-2 text-sm text-emerald-800"
							role="status"
						>
							<Check className="size-4" />
							Dirección guardada. Lista actualizada.
						</p>
					)}
				</form>
				<p className="mt-4 text-xs leading-5 text-zinc-500">
					Al cambiar la dirección predeterminada, el backend ajusta el resto de
					la libreta. La pantalla vuelve a consultar todas tus direcciones.
				</p>
			</aside>
		</section>
	);
}
