import { Suspense } from "react";
import { PublicProductDetail } from "@/modules/public/modules/catalog/components/PublicProductDetail";

export default function CatalogProductPage() {
	return (
		<Suspense fallback={<p className="py-16 text-sm">Cargando producto…</p>}>
			<PublicProductDetail />
		</Suspense>
	);
}
