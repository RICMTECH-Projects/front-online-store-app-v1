import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/modules/shared/lib/utils";

type AdminSidebarNavItemProps = {
	href: string;
	icon: LucideIcon;
	isActive: boolean;
	label: string;
};

export const AdminSidebarNavItem = ({
	href,
	icon: Icon,
	isActive,
	label,
}: AdminSidebarNavItemProps) => (
	<Link
		href={href}
		className={cn(
			"flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors",
			isActive
				? "bg-zinc-950 text-white"
				: "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950",
		)}
	>
		<Icon className="size-4" />
		{label}
	</Link>
);
