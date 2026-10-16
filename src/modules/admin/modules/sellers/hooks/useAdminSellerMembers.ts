import { useQuery } from "@tanstack/react-query";
import { sellersApi } from "../services/sellers-api.service";

export function useAdminSellerMembers(id: number | undefined) {
	return useQuery({
		queryKey: ["admin", "seller-members", id],
		queryFn: () => sellersApi.members(id as number),
		enabled: id !== undefined,
	});
}
