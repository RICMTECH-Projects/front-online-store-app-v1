"use client";

import { FormInput } from "@/modules/shared/components/forms/FormInput";
import { Button } from "@/modules/shared/components/ui/button";
import { eyebrow } from "../constants/seller-ui.constants";
import { useSellerProfileForm } from "../hooks/use-seller-profile-form";

export function SellerProfileForm({
	sellerId,
	profile,
	writable,
}: {
	sellerId: number;
	profile: { legalName: string; taxId: string; email: string };
	writable: boolean;
}) {
	const { mutation, form, submit } = useSellerProfileForm(sellerId, profile);
	return (
		<div className="max-w-2xl">
			<p className={eyebrow}>Identidad del comercio</p>
			<h2 className="mt-2 text-2xl font-semibold">Perfil comercial</h2>
			<p className="mt-2 text-sm leading-6 text-zinc-600">
				Actualiza los datos legales de la tienda. El estado se administra fuera
				de este portal.
			</p>
			<form className="mt-7 grid gap-5" onSubmit={submit}>
				<FormInput
					control={form.control}
					name="legalName"
					label="Razón social"
					required
					maxLength={200}
					disabled={!writable || mutation.isPending}
				/>
				<FormInput
					control={form.control}
					name="taxId"
					label="RUC / identificador fiscal"
					required
					maxLength={50}
					disabled={!writable || mutation.isPending}
				/>
				<FormInput
					control={form.control}
					name="email"
					label="Correo del comercio"
					type="email"
					required
					maxLength={320}
					disabled={!writable || mutation.isPending}
				/>
				{mutation.isSuccess && (
					<p role="status" className="text-sm text-emerald-800">
						Perfil actualizado.
					</p>
				)}
				<Button
					className="min-h-11 w-fit"
					type="submit"
					disabled={!writable || mutation.isPending}
				>
					{mutation.isPending ? "Guardando…" : "Guardar cambios"}
				</Button>
			</form>
		</div>
	);
}
