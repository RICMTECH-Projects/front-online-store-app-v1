import { Suspense } from "react";
import { FulfillmentsPage } from "@/modules/admin/modules/fulfillments/components/FulfillmentsPage";

export default function FulfillmentRoute() {
	return (
		<Suspense fallback={<p className="p-10 text-sm">Cargando operaciones…</p>}>
			<FulfillmentsPage />
		</Suspense>
	);
}
