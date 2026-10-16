import { useQuery } from "@tanstack/react-query";
import { rolesApi } from "../services/roles-api.service";

export function useAdminRoleDetail(id: number | undefined) {
	return useQuery({
		queryKey: ["admin", "role", id],
		queryFn: () => rolesApi.get(id as number),
		enabled: id !== undefined,
	});
}
