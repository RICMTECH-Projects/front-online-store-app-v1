"use client";

import { User } from "lucide-react";
import Link from "next/link";
import { useNavbarAccountLink } from "@/modules/shared/hooks/use-navbar-account-link";
import { cn } from "@/modules/shared/lib/utils";

type NavbarAccountLinkProps = {
	variant?: "icon" | "menu";
};

export const NavbarAccountLink = ({
	variant = "icon",
}: NavbarAccountLinkProps) => {
	const { initial, href, label, linkText } = useNavbarAccountLink();
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
				{linkText}
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
