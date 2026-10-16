"use client";

import { FormInput } from "@/modules/shared/components/forms/FormInput";
import { FormSelect } from "@/modules/shared/components/forms/FormSelect";
import { Button } from "@/modules/shared/components/ui/button";
import { useShipmentStatusForm } from "../hooks/use-shipment-status-form";
import type {
	Shipment,
	ShipmentUpdate,
} from "../interfaces/fulfillment.interface";

export function ShipmentStatusForm({
	record,
	pending,
	hasError = false,
	onSubmit,
}: {
	record: Pick<
		Shipment,
		"status" | "carrier" | "trackingNumber" | "serviceLevel"
	>;
	pending: boolean;
	hasError?: boolean;
	onSubmit: (value: ShipmentUpdate) => unknown;
}) {
	const { form, statusOptions, save } = useShipmentStatusForm(record, onSubmit);
	return (
		<form
			onSubmit={save}
			className="mt-6 grid gap-4 border-t border-zinc-200 pt-6 sm:grid-cols-2"
			noValidate
		>
			<FormSelect
				control={form.control}
				name="status"
				label="Estado del envío global"
				options={statusOptions}
				disabled={pending}
			/>
			<FormInput
				control={form.control}
				name="carrier"
				label="Transportista"
				disabled={pending}
			/>
			<FormInput
				control={form.control}
				name="serviceLevel"
				label="Servicio"
				disabled={pending}
			/>
			<FormInput
				control={form.control}
				name="trackingNumber"
				label="Tracking"
				disabled={pending}
			/>
			<p className="text-xs leading-5 text-zinc-500 sm:col-span-2">
				El checkout crea este envío. Esta acción modifica seguimiento global; no
				completa la orden ni fulfillments de vendedores. Cancelar estado
				logístico no implica reembolso.
			</p>
			{form.formState.isSubmitSuccessful && !hasError && (
				<p role="status" className="text-sm text-emerald-800 sm:col-span-2">
					Envío actualizado.
				</p>
			)}
			<Button
				type="submit"
				className="w-fit"
				disabled={pending || form.formState.isSubmitting}
			>
				{pending || form.formState.isSubmitting
					? "Guardando…"
					: "Guardar envío"}
			</Button>
		</form>
	);
}
