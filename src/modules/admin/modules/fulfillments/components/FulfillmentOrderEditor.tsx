"use client";

import {
	FulfillmentStatusForm,
	type SellerOrder,
	useUpdateAdminFulfillment,
} from "@/modules/fulfillment";

export function FulfillmentOrderEditor({
	order,
	onClose,
}: {
	order: SellerOrder;
	onClose: () => void;
}) {
	const update = useUpdateAdminFulfillment(
		order.orderId,
		order.fulfillment.sellerId,
	);
	return (
		<section
			className="mt-5 border border-zinc-200 bg-white p-5"
			aria-labelledby="fulfillment-editor-title"
		>
			<div className="mb-4 flex items-center justify-between gap-4">
				<div>
					<p className="text-xs uppercase tracking-label text-zinc-500">
						Actualización administrativa
					</p>
					<h2 id="fulfillment-editor-title" className="font-semibold">
						{order.orderNumber} · Tienda #{order.fulfillment.sellerId}
					</h2>
				</div>
				<button
					type="button"
					onClick={onClose}
					className="min-h-10 px-3 underline"
				>
					Cerrar
				</button>
			</div>
			<FulfillmentStatusForm
				key={`${order.fulfillment.updatedAt}-${order.fulfillment.status}`}
				record={order.fulfillment}
				pending={update.isPending}
				hasError={update.isError}
				onSubmit={(body) => update.mutateAsync(body)}
			/>
			{update.isError && (
				<p role="alert" className="mt-3 text-sm text-red-700">
					No se guardó fulfillment. Revisa transición y datos del transportista.
				</p>
			)}
		</section>
	);
}
