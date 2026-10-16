import { useQuery } from "@tanstack/react-query";
import { adminUsersQueryKey } from "../constants/user-query-keys.constants";
import { usersApi } from "../services/users-api.service";

export function useAdminUserList() {
	return useQuery({ queryKey: adminUsersQueryKey, queryFn: usersApi.list });
}
