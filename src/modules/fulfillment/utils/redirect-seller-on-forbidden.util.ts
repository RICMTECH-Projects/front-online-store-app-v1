import type { useRouter } from "next/navigation";
import { HttpError } from "@/modules/shared/providers/http";

export function redirectSellerOnForbidden(
	error: unknown,
	router: ReturnType<typeof useRouter>,
) {
	if (error instanceof HttpError && error.status === 403)
		router.replace("/vendedor?acceso=actualizado");
}
