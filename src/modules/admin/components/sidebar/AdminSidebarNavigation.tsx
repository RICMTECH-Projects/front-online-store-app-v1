"use client";

import { ADMIN_NAVIGATION } from "@/modules/admin/constants/admin-navigation.constants";
import { canAccessAdminRoute, useAuthStore } from "@/modules/auth";
import { AdminSidebarNavGroup } from "./AdminSidebarNavGroup";
import { AdminSidebarNavItem } from "./AdminSidebarNavItem";

export const AdminSidebarNavigation = ({ pathname }: { pathname: string }) => {
	const roles = useAuthStore((state) => state.roles);

	return (
		<nav
			aria-label="Navegacion administrativa"
			className="flex flex-col gap-1 p-3"
		>
			{ADMIN_NAVIGATION.map((entry) => {
				if ("href" in entry) {
					return canAccessAdminRoute(entry.href, roles) ? (
						<AdminSidebarNavItem
							key={entry.href}
							href={entry.href}
							icon={entry.icon}
							isActive={pathname === entry.href}
							label={entry.label}
						/>
					) : null;
				}

				const items = entry.items.filter((item) =>
					canAccessAdminRoute(item.href, roles),
				);

				return items.length ? (
					<AdminSidebarNavGroup
						key={entry.label}
						icon={entry.icon}
						isOpen={items.some((item) => pathname === item.href)}
						items={items}
						label={entry.label}
						pathname={pathname}
					/>
				) : null;
			})}
		</nav>
	);
};
