"use client";

import { User } from "lucide-react";
import Link from "next/link";
import { AUTH_ROUTES } from "@/modules/auth/constants/auth.const";
import { useAuthStore } from "@/modules/auth/store/useAuthStore";
import { cn } from "@/modules/shared/lib/utils";

type NavbarAccountLinkProps = {
	variant?: "icon" | "menu";
};

export const NavbarAccountLink = ({
	variant = "icon",
}: NavbarAccountLinkProps) => {
	const user = useAuthStore((state) => state.user);
	const initial = (user?.firstName || user?.email || "")
		.trim()
		.charAt(0)
		.toUpperCase();
	const isAdmin = user?.roles.includes("ADMIN") ?? false;

	if (isAdmin) return null;

	const href = user
		? user.roles.includes("SELLER")
			? "/dashboard"
			: AUTH_ROUTES.account
		: AUTH_ROUTES.login;
	const isBackOfficeLink = href === "/dashboard";
	const label = isBackOfficeLink
		? "Volver al panel administrativo"
		: user
			? `Cuenta de ${user.firstName} ${user.lastName}`.trim()
			: "Mi Cuenta";

	if (variant === "menu") {
		return (
			<Link
				href={href}
				aria-label={label}
				className="flex items-center gap-2 transition-colors hover:text-foreground"
			>
				{initial ? (
					<span className="inline-flex size-6 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background">
						{initial}
					</span>
				) : (
					<User className="size-4" aria-hidden="true" />
				)}
				{isBackOfficeLink ? "Volver al panel" : "Mi Cuenta"}
			</Link>
		);
	}

	return (
		<Link
			href={href}
			aria-label={label}
			title={label}
			className={cn(
				"hidden size-10 shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 sm:flex",
				initial
					? "bg-foreground text-sm font-semibold text-background hover:bg-foreground/80"
					: "text-foreground/80 hover:bg-muted/50 hover:text-foreground",
			)}
		>
			{initial || <User className="size-5" aria-hidden="true" />}
		</Link>
	);
};
