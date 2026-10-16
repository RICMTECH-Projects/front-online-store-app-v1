import { Suspense } from "react";
import { SellerWorkspace } from "@/modules/seller";

export default function SellerOrderPage() {
	return (
		<Suspense
			fallback={<p className="py-16 text-sm text-zinc-600">Cargando orden…</p>}
		>
			<SellerWorkspace section="order" />
		</Suspense>
	);
}
