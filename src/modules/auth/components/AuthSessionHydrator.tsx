"use client";

import { useAuthSessionHydrator } from "../hooks/use-auth-session-hydrator";

export const AuthSessionHydrator = () => {
	useAuthSessionHydrator();
	return null;
};
