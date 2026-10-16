import { Suspense } from "react";
import { SellerTenantSelector } from "@/modules/seller";

export default function SellerPortalPage() {
	return (
		<Suspense
			fallback={
				<p className="py-16 text-sm text-zinc-600">Cargando tus tiendas…</p>
			}
		>
			<SellerTenantSelector />
		</Suspense>
	);
}
