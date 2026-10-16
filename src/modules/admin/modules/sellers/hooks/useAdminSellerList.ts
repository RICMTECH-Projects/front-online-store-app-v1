import { useQuery } from "@tanstack/react-query";
import { adminSellersQueryKey } from "../constants/seller-query-keys.constants";
import { sellersApi } from "../services/sellers-api.service";

export function useAdminSellerList() {
	return useQuery({ queryKey: adminSellersQueryKey, queryFn: sellersApi.list });
}
