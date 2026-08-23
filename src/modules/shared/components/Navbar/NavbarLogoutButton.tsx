"use client";

import { LogOut } from "lucide-react";
import { useLogout } from "@/modules/auth/hooks/use-logout";
import { useAuthStore } from "@/modules/auth/store/useAuthStore";

export const NavbarLogoutButton = () => {
	const isAuthenticated = useAuthStore((state) => Boolean(state.user));
	const logout = useLogout();

	if (!isAuthenticated) return null;

	return (
		<button
			type="button"
			aria-label="Cerrar sesion"
			title="Cerrar sesion"
			onClick={() => logout()}
			className="inline-flex size-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
		>
			<LogOut className="size-5" aria-hidden="true" />
		</button>
	);
};
