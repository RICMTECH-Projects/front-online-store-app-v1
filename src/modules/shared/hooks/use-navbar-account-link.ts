"use client";

import { useAuthStore } from "@/modules/auth";
import { AUTH_ROUTES } from "@/modules/auth/constants/auth.const";
import { userFullName, userInitial } from "../utils/user-display";

export function useNavbarAccountLink() {
	const user = useAuthStore((state) => state.user);
	const initial = userInitial(user?.firstName || user?.email || "");
	const href = !user
		? AUTH_ROUTES.login
		: user.roles.includes("CUSTOMER")
			? AUTH_ROUTES.account
			: user.roles.includes("SELLER")
				? "/vendedor"
				: user.roles.includes("ADMIN")
					? "/perfil"
					: AUTH_ROUTES.home;
	const label = user
		? `Cuenta de ${userFullName(user.firstName, user.lastName)}`
		: "Mi Cuenta";
	const linkText =
		user?.roles.includes("SELLER") && !user.roles.includes("CUSTOMER")
			? "Portal vendedor"
			: user?.roles.includes("ADMIN") && !user.roles.includes("CUSTOMER")
				? "Mi perfil"
				: "Mi Cuenta";
	return { user, initial, href, label, linkText };
}
