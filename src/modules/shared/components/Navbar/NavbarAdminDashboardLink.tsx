"use client";

import { ChartNoAxesCombined } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/modules/auth";

type NavbarAdminDashboardLinkProps = {
	variant?: "icon" | "menu";
};

export const NavbarAdminDashboardLink = ({
	variant = "icon",
}: NavbarAdminDashboardLinkProps) => {
	const isAdmin = useAuthStore((state) => state.roles.includes("ADMIN"));

	if (!isAdmin) return null;

	if (variant === "menu") {
		return (
			<Link
				href="/dashboard"
				className="flex items-center gap-2 transition-colors hover:text-foreground"
			>
				<ChartNoAxesCombined className="size-4" aria-hidden="true" />
				Panel administrativo
			</Link>
		);
	}

	return (
		<Link
			href="/dashboard"
			aria-label="Ir al panel administrativo"
			title="Ir al panel administrativo"
			className="hidden size-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 sm:flex"
		>
			<ChartNoAxesCombined className="size-5" aria-hidden="true" />
		</Link>
	);
};
