import { Suspense } from "react";
import { CustomerShipmentTracking } from "@/modules/public/modules/account/components/CustomerShipmentTracking";

export default function CustomerShipmentPage() {
	return (
		<Suspense fallback={<p className="py-16">Cargando seguimiento…</p>}>
			<CustomerShipmentTracking />
		</Suspense>
	);
}
