import { Suspense } from "react";
import { CheckoutConfirmation } from "@/modules/public/modules/checkout/components/CheckoutConfirmation";

export default function CheckoutConfirmationPage() {
	return (
		<Suspense fallback={<p className="py-16">Cargando confirmación…</p>}>
			<CheckoutConfirmation />
		</Suspense>
	);
}
