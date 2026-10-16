import { useQuery } from "@tanstack/react-query";
import { adminRolesQueryKey } from "../constants/role-query-keys.constants";
import { rolesApi } from "../services/roles-api.service";

export function useAdminRoleList() {
	return useQuery({ queryKey: adminRolesQueryKey, queryFn: rolesApi.list });
}
