"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useCartStore } from "@/modules/public/modules/cart/store";
import { AUTH_SESSION_EXPIRED_EVENT } from "@/modules/shared/constants/app-events.constants";
import { HttpError } from "@/modules/shared/providers/http/http.interface";
import { getCurrentUser } from "../services/get-current-user.service";
import { useAuthStore } from "../store/useAuthStore";

export function useAuthSessionHydrator() {
	const setUser = useAuthStore((state) => state.setUser);
	const clearUser = useAuthStore((state) => state.clearUser);
	const queryClient = useQueryClient();
	const { data, error } = useQuery({
		queryKey: ["auth", "me"],
		queryFn: getCurrentUser,
		retry: false,
		staleTime: 5 * 60 * 1000,
		meta: { silentError: true },
	});

	useEffect(() => {
		if (data) {
			setUser(data);
			useCartStore.getState().useUserContext(data.id);
		}
	}, [data, setUser]);

	useEffect(() => {
		if (error instanceof HttpError && error.status === 401) {
			clearUser();
			useCartStore.getState().useGuestContext(true);
		}
	}, [clearUser, error]);

	useEffect(() => {
		const handleExpiredSession = () => {
			clearUser();
			useCartStore.getState().useGuestContext(true);
			queryClient.removeQueries({
				predicate: (query) => query.meta?.requiresAuth === true,
			});
		};

		window.addEventListener(AUTH_SESSION_EXPIRED_EVENT, handleExpiredSession);
		return () =>
			window.removeEventListener(
				AUTH_SESSION_EXPIRED_EVENT,
				handleExpiredSession,
			);
	}, [clearUser, queryClient]);
}
