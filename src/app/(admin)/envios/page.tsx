import { Suspense } from "react";
import { ShipmentsPage } from "@/modules/admin/modules/shipments/components/ShipmentsPage";

export default function ShipmentsRoute() {
	return (
		<Suspense fallback={<p className="p-10 text-sm">Cargando envíos…</p>}>
			<ShipmentsPage />
		</Suspense>
	);
}
