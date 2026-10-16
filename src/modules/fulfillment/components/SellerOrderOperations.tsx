"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { fulfillmentStatusLabels } from "../constants/fulfillment.constants";
import type {
	FulfillmentUpdate,
	SellerOrder,
} from "../interfaces/fulfillment.interface";
import { money } from "../utils/money";
import { FulfillmentStatusForm } from "./FulfillmentStatusForm";

export function SellerOrderOperations({
	order,
	sellerId,
	pending,
	onSubmit,
}: {
	order: SellerOrder;
	sellerId: number;
	pending: boolean;
	onSubmit: (body: FulfillmentUpdate) => Promise<unknown>;
}) {
	return (
		<div className="max-w-4xl">
			<Link
				href={`/vendedor/${sellerId}/ordenes`}
				className="inline-flex min-h-10 items-center gap-2 text-sm underline"
			>
				<ArrowLeft className="size-4" />
				Volver a órdenes
			</Link>
			<p className="mt-6 text-xs font-semibold uppercase tracking-label text-zinc-500">
				Orden {order.orderNumber} · ID {order.orderId}
			</p>
			<h2 className="mt-2 font-antonio text-3xl font-semibold uppercase">
				Preparación de tu tienda
			</h2>
			<p className="mt-2 text-sm text-zinc-600">
				Estado comercial: {order.orderStatus}. Cambiar preparación no cambia la
				orden ni el envío global.
			</p>
			<section className="mt-7 border border-zinc-200">
				<h3 className="border-b border-zinc-200 bg-zinc-50 p-4 font-semibold">
					Líneas asignadas a esta tienda
				</h3>
				<ul className="divide-y divide-zinc-100">
					{order.lines.map((line) => (
						<li
							key={line.id}
							className="flex flex-wrap justify-between gap-3 p-4"
						>
							<div>
								<p className="font-medium">
									{line.quantity} × {line.productName}
								</p>
								<p className="mt-1 text-xs text-zinc-500">
									{line.sku} · Producto #{line.productId}
								</p>
							</div>
							<p className="tabular-nums">
								{money(line.lineTotal, order.currency)}
							</p>
						</li>
					))}
				</ul>
				<div className="flex justify-between border-t p-4 text-sm">
					<span>Total de las líneas de esta tienda</span>
					<strong>
						{money(
							order.lines.reduce((total, line) => total + line.lineTotal, 0),
							order.currency,
						)}
					</strong>
				</div>
			</section>
			<section className="mt-7 border border-zinc-200 p-5">
				<p className="text-xs font-semibold uppercase tracking-label text-zinc-500">
					Fulfillment #{order.fulfillment.id} ·{" "}
					{fulfillmentStatusLabels[order.fulfillment.status]}
				</p>
				<h3 className="mt-2 text-xl font-semibold">
					Actualizar preparación y despacho
				</h3>
				<p className="my-4 text-sm text-zinc-600">
					Despacho o entrega requiere transportista y tracking. No se muestra
					dirección ni información personal porque el contrato no las devuelve.
				</p>
				<FulfillmentStatusForm
					key={`${order.fulfillment.updatedAt}-${order.fulfillment.status}`}
					record={order.fulfillment}
					pending={pending}
					onSubmit={onSubmit}
				/>
			</section>
		</div>
	);
}
