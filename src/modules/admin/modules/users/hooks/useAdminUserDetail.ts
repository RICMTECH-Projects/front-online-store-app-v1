import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminUsersQueryKey } from "../constants/user-query-keys.constants";
import { usersApi } from "../services/users-api.service";

export function useAdminUserDetail(userId: number) {
	const client = useQueryClient();
	const userQuery = useQuery({
		queryKey: ["admin", "user", userId],
		queryFn: () => usersApi.get(userId),
		enabled: userId > 0,
	});
	const membershipsQuery = useQuery({
		queryKey: ["admin", "user-memberships", userId],
		queryFn: () => usersApi.memberships(userId),
		enabled: userId > 0,
	});
	const replaceRolesMutation = useMutation({
		mutationFn: (roleCodes: string[]) =>
			usersApi.replaceRoles(userId, roleCodes),
		onSuccess: async (user) => {
			await client.invalidateQueries({ queryKey: adminUsersQueryKey });
			client.setQueryData(["admin", "user", userId], user);
		},
	});
	const assignMutation = useMutation({
		mutationFn: (values: {
			sellerId: number;
			owner: boolean;
			active: boolean;
		}) => usersApi.assignSeller(userId, values.sellerId, values),
		onSuccess: async (_result, values) => {
			await client.invalidateQueries({
				queryKey: ["admin", "user-memberships", userId],
			});
			await client.invalidateQueries({
				queryKey: ["admin", "seller-members", values.sellerId],
			});
		},
	});
	const deactivateMutation = useMutation({
		mutationFn: (sellerId: number) =>
			usersApi.deactivateSeller(userId, sellerId),
		onSuccess: () =>
			client.invalidateQueries({
				queryKey: ["admin", "user-memberships", userId],
			}),
	});
	return {
		userQuery,
		membershipsQuery,
		replaceRolesMutation,
		assignMutation,
		deactivateMutation,
	};
}
