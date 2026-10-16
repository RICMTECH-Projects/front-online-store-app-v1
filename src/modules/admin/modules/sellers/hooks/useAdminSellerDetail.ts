import { useQuery } from "@tanstack/react-query";
import { sellersApi } from "../services/sellers-api.service";

export function useAdminSellerDetail(id: number | undefined) {
	return useQuery({
		queryKey: ["admin", "seller", id],
		queryFn: () => sellersApi.get(id as number),
		enabled: id !== undefined,
	});
}
