"use client";

import { Store } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/modules/auth";

export const NavbarSellerPortalLink = ({
	variant = "icon",
}: {
	variant?: "icon" | "menu";
}) => {
	const user = useAuthStore((state) => state.user);

	if (!user?.roles.includes("SELLER") || !user.roles.includes("CUSTOMER")) {
		return null;
	}

	if (variant === "menu") {
		return (
			<Link
				href="/vendedor"
				className="flex items-center gap-2 transition-colors hover:text-foreground"
			>
				<Store className="size-4" aria-hidden="true" />
				Portal vendedor
			</Link>
		);
	}

	return (
		<Link
			href="/vendedor"
			aria-label="Abrir portal vendedor"
			title="Abrir portal vendedor"
			className="hidden size-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 sm:flex"
		>
			<Store className="size-5" aria-hidden="true" />
		</Link>
	);
};
