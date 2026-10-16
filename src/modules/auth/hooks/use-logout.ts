"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/modules/public/modules/cart/store";
import { AUTH_ROUTES } from "../constants/auth.const";
import { logoutUser } from "../services/logout-user.service";
import { useAuthStore } from "../store/useAuthStore";

export const useLogout = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const clearUser = useAuthStore((state) => state.clearUser);
	const { mutate } = useMutation({
		mutationFn: logoutUser,
		onSettled: () => {
			clearUser();
			useCartStore.getState().useGuestContext(true);
			queryClient.removeQueries({ queryKey: ["auth"] });
			queryClient.removeQueries({
				predicate: (query) => query.meta?.requiresAuth === true,
			});
			router.replace(AUTH_ROUTES.login);
		},
	});

	return mutate;
};
