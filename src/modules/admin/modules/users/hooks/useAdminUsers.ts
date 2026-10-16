import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { rolesApi } from "../../roles/services/roles-api.service";
import { adminUsersQueryKey } from "../constants/user-query-keys.constants";
import type {
	UserCreateRequest,
	UserUpdateRequest,
} from "../interfaces/user.interface";
import { usersApi } from "../services/users-api.service";
import { useAdminUserList } from "./useAdminUserList";

export function useAdminUsers() {
	const client = useQueryClient();
	const usersQuery = useAdminUserList();
	const rolesQuery = useQuery({
		queryKey: ["admin", "roles"],
		queryFn: rolesApi.list,
	});
	const createMutation = useMutation({
		mutationFn: (body: UserCreateRequest) => usersApi.create(body),
		onSuccess: () => client.invalidateQueries({ queryKey: adminUsersQueryKey }),
	});
	const updateMutation = useMutation({
		mutationFn: ({ id, body }: { id: number; body: UserUpdateRequest }) =>
			usersApi.update(id, body),
		onSuccess: () => client.invalidateQueries({ queryKey: adminUsersQueryKey }),
	});
	return { usersQuery, rolesQuery, createMutation, updateMutation };
}
