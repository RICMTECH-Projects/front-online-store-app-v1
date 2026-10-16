"use client";

import { FormInput } from "@/modules/shared/components/forms/FormInput";
import { FormSelect } from "@/modules/shared/components/forms/FormSelect";
import { Button } from "@/modules/shared/components/ui/button";
import { useFulfillmentStatusForm } from "../hooks/use-fulfillment-status-form";
import type {
	FulfillmentRecord,
	FulfillmentUpdate,
} from "../interfaces/fulfillment.interface";

export function FulfillmentStatusForm({
	record,
	pending,
	hasError = false,
	submitLabel = "Guardar estado",
	onSubmit,
}: {
	record: Pick<FulfillmentRecord, "status" | "carrier" | "trackingNumber">;
	pending: boolean;
	hasError?: boolean;
	submitLabel?: string;
	onSubmit: (value: FulfillmentUpdate) => unknown;
}) {
	const { form, statusOptions, save } = useFulfillmentStatusForm(
		record,
		onSubmit,
	);
	return (
		<form onSubmit={save} className="grid gap-3 sm:grid-cols-2" noValidate>
			<FormSelect
				control={form.control}
				name="status"
				label="Estado logístico"
				options={statusOptions}
				disabled={pending}
			/>
			<FormInput
				control={form.control}
				name="carrier"
				label="Transportista"
				placeholder="Se conserva si dejas el valor actual"
				disabled={pending}
			/>
			<div className="sm:col-span-2">
				<FormInput
					control={form.control}
					name="trackingNumber"
					label="Número de seguimiento"
					placeholder="Se conserva si dejas el valor actual"
					disabled={pending}
				/>
			</div>
			<p className="text-xs leading-5 text-zinc-500 sm:col-span-2">
				Estado logístico independiente del pedido comercial y del envío global.
				Cancelar aquí no cancela la compra ni genera reembolso. Datos vacíos
				conservan los valores guardados.
			</p>
			{form.formState.isSubmitSuccessful && !hasError && (
				<p role="status" className="text-sm text-emerald-800 sm:col-span-2">
					Actualización guardada.
				</p>
			)}
			<Button
				className="w-fit"
				type="submit"
				disabled={pending || form.formState.isSubmitting}
			>
				{pending || form.formState.isSubmitting ? "Guardando…" : submitLabel}
			</Button>
		</form>
	);
}
