import { Suspense } from "react";
import { SellerWorkspace } from "@/modules/seller";

export default function SellerProductsPage() {
	return (
		<Suspense
			fallback={
				<p className="py-16 text-sm text-zinc-600">Cargando catálogo…</p>
			}
		>
			<SellerWorkspace section="products" />
		</Suspense>
	);
}
