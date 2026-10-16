import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminRolesQueryKey } from "../constants/role-query-keys.constants";
import { rolesApi } from "../services/roles-api.service";
import { useAdminRoleList } from "./useAdminRoleList";

export function useAdminRoles() {
	const client = useQueryClient();
	const rolesQuery = useAdminRoleList();
	const invalidate = () =>
		client.invalidateQueries({ queryKey: adminRolesQueryKey });
	const createMutation = useMutation({
		mutationFn: rolesApi.create,
		onSuccess: invalidate,
	});
	const renameMutation = useMutation({
		mutationFn: ({ id, name }: { id: number; name: string }) =>
			rolesApi.rename(id, name),
		onSuccess: invalidate,
	});
	const deleteMutation = useMutation({
		mutationFn: rolesApi.remove,
		onSuccess: invalidate,
	});
	return { rolesQuery, createMutation, renameMutation, deleteMutation };
}
