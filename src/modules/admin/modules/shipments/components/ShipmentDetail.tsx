"use client";

import { RefreshCw } from "lucide-react";
import type { FulfillmentStatus } from "@/modules/fulfillment";
import { ShipmentStatusForm, statusLabel } from "@/modules/fulfillment";
import { Button } from "@/modules/shared/components/ui/button";
import { useShipmentDetail } from "../hooks/use-shipment-detail";

export function ShipmentDetail({
	orderId,
	shipment,
	refresh,
	refreshing,
}: {
	orderId: number;
	shipment: {
		id: number;
		orderId: number;
		carrier: string | null;
		serviceLevel: string | null;
		trackingNumber: string | null;
		status: FulfillmentStatus;
		shippedAt: string | null;
		deliveredAt: string | null;
	};
	refresh: () => void;
	refreshing: boolean;
}) {
	const update = useShipmentDetail(orderId);
	return (
		<section className="mt-6 max-w-3xl border border-zinc-200 bg-white p-5 sm:p-7">
			<div className="flex flex-wrap items-start justify-between gap-4">
				<div>
					<p className="text-xs font-semibold uppercase tracking-label text-zinc-500">
						Shipment #{shipment.id} · Orden #{orderId}
					</p>
					<h2 className="mt-2 text-2xl font-semibold">
						{statusLabel[shipment.status]}
					</h2>
				</div>
				<Button variant="outline" onClick={refresh} disabled={refreshing}>
					<RefreshCw className={`size-4 ${refreshing ? "animate-spin" : ""}`} />
					Actualizar consulta
				</Button>
			</div>
			<dl className="mt-6 grid gap-4 border-t border-zinc-200 pt-5 sm:grid-cols-2">
				{[
					["Transportista", shipment.carrier],
					["Servicio", shipment.serviceLevel],
					["Tracking", shipment.trackingNumber],
					["Despachado", shipment.shippedAt],
					["Entregado", shipment.deliveredAt],
				].map(([label, value]) => (
					<div key={label}>
						<dt className="text-xs uppercase tracking-wide text-zinc-500">
							{label}
						</dt>
						<dd className="mt-1 break-all text-sm">{value || "Pendiente"}</dd>
					</div>
				))}
			</dl>
			<ShipmentStatusForm
				key={`${shipment.id}-${shipment.status}-${shipment.trackingNumber}`}
				record={shipment}
				pending={update.isPending}
				hasError={update.isError}
				onSubmit={update.submit}
			/>
			{update.isError && (
				<p role="alert" className="mt-4 text-sm text-red-700">
					No se guardó el envío. Revisa la transición y los datos obligatorios
					de despacho.
				</p>
			)}
		</section>
	);
}
