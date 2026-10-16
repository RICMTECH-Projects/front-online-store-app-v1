"use client";

import { LoaderCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/modules/shared/components/ui/button";
import { useCustomerShipmentTracking } from "../hooks/use-customer-shipment-tracking";
import { TrackingValue } from "./TrackingValue";

export function CustomerShipmentTracking() {
	const {
		orderId,
		shipment,
		retry,
		statusLabel,
		shippedAtLabel,
		deliveredAtLabel,
	} = useCustomerShipmentTracking();
	if (!Number.isSafeInteger(orderId) || orderId < 1)
		return <p className="py-16">El identificador del pedido no es válido.</p>;
	return (
		<section className="mx-auto w-full max-w-3xl py-12 sm:py-16">
			<p className="text-xs font-semibold uppercase tracking-label text-zinc-500">
				Seguimiento · Orden #{orderId}
			</p>
			<h1 className="mt-2 font-antonio text-4xl font-semibold uppercase">
				Estado del envío
			</h1>
			<p className="mt-3 text-sm leading-6 text-zinc-600">
				Seguimiento logístico global del envío. No representa pagos ni cambios
				del estado comercial.
			</p>
			{shipment.isPending ? (
				<p className="mt-8 flex items-center gap-2 text-sm text-zinc-600">
					<LoaderCircle className="size-4 animate-spin" />
					Consultando el envío…
				</p>
			) : shipment.isError ? (
				<div className="mt-8 border border-zinc-200 p-5">
					<p role="alert" className="text-sm">
						No pudimos consultar el envío. Verifica el número de pedido o vuelve
						a intentar.
					</p>
					<Button className="mt-4" variant="outline" onClick={retry}>
						Intentar de nuevo
					</Button>
				</div>
			) : (
				shipment.data && (
					<div className="mt-8 border border-zinc-200 p-6">
						<div className="flex flex-wrap items-center justify-between gap-4">
							<div>
								<p className="text-xs uppercase tracking-widest text-zinc-500">
									Estado del envío
								</p>
								<p className="mt-2 text-2xl font-semibold">{statusLabel}</p>
							</div>
							<Button
								variant="outline"
								onClick={() => void shipment.refetch()}
								disabled={shipment.isFetching}
							>
								<RefreshCw
									className={`size-4 ${shipment.isFetching ? "animate-spin" : ""}`}
								/>
								Actualizar
							</Button>
						</div>
						<dl className="mt-6 grid gap-4 border-t pt-5 sm:grid-cols-2">
							<TrackingValue
								label="Transportista"
								value={shipment.data.carrier}
							/>
							<TrackingValue
								label="Servicio"
								value={shipment.data.serviceLevel}
							/>
							<TrackingValue
								label="Número de seguimiento"
								value={shipment.data.trackingNumber}
							/>
							<TrackingValue label="Despachado" value={shippedAtLabel} />
							<TrackingValue label="Entregado" value={deliveredAtLabel} />
						</dl>
					</div>
				)
			)}
			<Link
				href="/mi-cuenta"
				className="mt-6 inline-flex min-h-10 items-center text-sm underline"
			>
				Volver a mi cuenta
			</Link>
		</section>
	);
}
