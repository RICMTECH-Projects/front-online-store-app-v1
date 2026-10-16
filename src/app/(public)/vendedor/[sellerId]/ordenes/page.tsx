import { Suspense } from "react";
import { SellerWorkspace } from "@/modules/seller";

export default function SellerOrdersPage() {
	return (
		<Suspense
			fallback={
				<p className="py-16 text-sm text-zinc-600">Cargando órdenes…</p>
			}
		>
			<SellerWorkspace section="orders" />
		</Suspense>
	);
}
