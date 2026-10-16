"use client";

import type { SellerOrder } from "@/modules/fulfillment";
import { useCompleteOrder } from "@/modules/fulfillment";
import { Button } from "@/modules/shared/components/ui/button";

export function FulfillmentOrderActions({
	order,
	onEdit,
}: {
	order: SellerOrder;
	onEdit: () => void;
}) {
	const complete = useCompleteOrder(order.orderId);
	const canComplete = ["PENDING", "PAID"].includes(order.orderStatus);
	const completeOrder = async () => {
		if (
			!window.confirm(
				`¿Completar la orden ${order.orderNumber}? Esta acción cambia estado comercial y no actualiza fulfillment ni envío.`,
			)
		)
			return;
		try {
			await complete.mutateAsync();
		} catch {
			/* El error se muestra en la fila. */
		}
	};

	return (
		<div className="grid justify-items-start gap-2">
			<Button size="sm" variant="outline" onClick={onEdit}>
				Actualizar porción
			</Button>
			{canComplete && (
				<Button
					size="sm"
					variant="outline"
					disabled={complete.isPending}
					onClick={() => void completeOrder()}
				>
					{complete.isPending ? "Completando…" : "Completar orden"}
				</Button>
			)}
			{complete.isError && (
				<p role="alert" className="max-w-48 text-xs text-red-700">
					No se completó la orden. Comprueba el estado e intenta de nuevo.
				</p>
			)}
		</div>
	);
}
