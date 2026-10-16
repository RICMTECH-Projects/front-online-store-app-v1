"use client";

import { LoaderCircle } from "lucide-react";
import { Button } from "@/modules/shared/components/ui/button";
import { useSellerOrderDetail } from "../hooks/use-seller-order-detail";
import { SellerOrderOperations } from "./SellerOrderOperations";

export function SellerOrderDetail({
	sellerId,
	orderId,
}: {
	sellerId: number;
	orderId: number;
}) {
	const { query, update, retry } = useSellerOrderDetail(sellerId, orderId);
	if (!Number.isSafeInteger(orderId) || orderId < 1)
		return <p role="alert">El identificador de orden no es válido.</p>;
	if (query.isPending)
		return (
			<p role="status" className="flex items-center gap-2">
				<LoaderCircle className="size-4 animate-spin" />
				Cargando porción de esta tienda…
			</p>
		);
	if (query.isError || !query.data)
		return (
			<div role="alert" className="border border-zinc-300 p-5">
				<p>
					No pudimos consultar esta porción. Puede que no pertenezca a la tienda
					activa.
				</p>
				<Button className="mt-3" variant="outline" onClick={retry}>
					Reintentar
				</Button>
			</div>
		);
	return (
		<SellerOrderOperations
			order={query.data}
			sellerId={sellerId}
			pending={update.isPending}
			onSubmit={update.mutateAsync}
		/>
	);
}
