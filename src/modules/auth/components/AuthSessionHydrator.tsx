"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getCurrentUser } from "../services/get-current-user.service";
import { useAuthStore } from "../store/useAuthStore";

export const AuthSessionHydrator = () => {
	const setUser = useAuthStore((state) => state.setUser);
	const clearUser = useAuthStore((state) => state.clearUser);
	const { data, isError } = useQuery({
		queryKey: ["auth", "me"],
		queryFn: getCurrentUser,
		retry: false,
		staleTime: 5 * 60 * 1000,
		meta: { silentError: true },
	});

	useEffect(() => {
		if (data) {
			setUser(data);
		}
	}, [data, setUser]);

	useEffect(() => {
		if (isError) {
			clearUser();
		}
	}, [clearUser, isError]);

	return null;
};
