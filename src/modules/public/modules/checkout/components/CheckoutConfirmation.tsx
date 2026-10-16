"use client";

import { CheckCircle2, PackageCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/modules/shared/components/ui/button";
import { formatMoney } from "@/modules/shared/utils/format-money";
import { useCheckoutConfirmation } from "../hooks/use-checkout-confirmation";
import { Summary } from "./CheckoutSummary";

export function CheckoutConfirmation() {
	const { orderId, receiptQuery, receipt } = useCheckoutConfirmation();
	return (
		<section className="mx-auto w-full max-w-3xl py-12 sm:py-16">
			<div className="flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-800">
				<CheckCircle2 className="size-7" />
			</div>
			<p className="mt-6 text-xs font-semibold uppercase tracking-label text-zinc-500">
				Pedido #{Number.isFinite(orderId) ? orderId : "—"}
			</p>
			<h1 className="mt-2 font-antonio text-4xl font-semibold uppercase">
				Pedido creado
			</h1>
			<p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
				El backend confirmó el pedido. El estado comercial actual es PENDING;
				esta tienda no procesó un pago en línea.
			</p>
			{receiptQuery.isPending ? (
				<p className="mt-8 text-sm text-zinc-500">Cargando resumen local…</p>
			) : receipt ? (
				<div className="mt-8 border border-zinc-200">
					<div className="grid gap-3 border-b p-5 sm:grid-cols-2">
						<Summary
							label="Número de pedido"
							value={receipt.order.orderNumber}
						/>
						<Summary label="Estado comercial" value={receipt.order.status} />
						<Summary
							label="Subtotal"
							value={formatMoney(
								receipt.order.subtotal,
								receipt.order.currency,
							)}
						/>
						<Summary
							label="Envío"
							value={formatMoney(
								receipt.order.shippingTotal,
								receipt.order.currency,
							)}
						/>
						<Summary
							label="Descuento"
							value={formatMoney(
								receipt.order.discountTotal,
								receipt.order.currency,
							)}
						/>
						<Summary
							label="Total oficial"
							value={formatMoney(
								receipt.order.grandTotal,
								receipt.order.currency,
							)}
							emphasized
						/>
					</div>
					<div className="p-5">
						<h2 className="font-semibold">
							Resumen de productos guardado en esta pestaña
						</h2>
						<div className="mt-3 grid gap-3">
							{receipt.lines.map((line) => (
								<div
									key={line.productId}
									className="flex justify-between gap-4 text-sm"
								>
									<span>
										{line.name} · {line.quantity} ×{" "}
										{formatMoney(line.unitPrice, line.currency)}
									</span>
									<span className="shrink-0">
										{formatMoney(line.unitPrice * line.quantity, line.currency)}
									</span>
								</div>
							))}
						</div>
						<p className="mt-4 text-xs text-zinc-500">
							Este detalle se conserva solo en esta sesión del navegador; no es
							un historial recuperable desde el backend.
						</p>
					</div>
				</div>
			) : (
				<div className="mt-8 border-l-2 border-amber-500 bg-amber-50 p-5">
					<p className="font-medium">Resumen local no disponible</p>
					<p className="mt-2 text-sm leading-6 text-zinc-700">
						El pedido se creó correctamente, pero esta pestaña no tiene el
						resumen guardado. El backend actual no ofrece un historial de
						pedidos del cliente.
					</p>
				</div>
			)}
			<div className="mt-8 flex flex-wrap gap-3">
				<Button asChild>
					<Link href={`/mi-cuenta/seguimiento/${orderId}`}>
						<PackageCheck className="size-4" />
						Consultar envío
					</Link>
				</Button>
				<Button asChild variant="outline">
					<Link href="/catalogo">Seguir explorando</Link>
				</Button>
			</div>
		</section>
	);
}
