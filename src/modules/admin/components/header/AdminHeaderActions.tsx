"use client";

import { Bell, LogOut } from "lucide-react";
import { ADMIN_HEADER } from "@/modules/admin/constants/admin-layout.constants";
import { useAuthStore, useLogout } from "@/modules/auth";
import { AdminHeaderIconButton } from "./AdminHeaderIconButton";
import { AdminHeaderSettingsLink } from "./AdminHeaderSettingsLink";
import { AdminHeaderStoreLink } from "./AdminHeaderStoreLink";

export const AdminHeaderActions = () => {
	const logout = useLogout();
	const canEditProfile = useAuthStore((state) => state.roles.includes("ADMIN"));

	return (
		<div className="flex items-center gap-1">
			<AdminHeaderIconButton label={ADMIN_HEADER.notifications}>
				<Bell className="size-5" />
			</AdminHeaderIconButton>
			<AdminHeaderStoreLink label={ADMIN_HEADER.store} />
			{canEditProfile && (
				<AdminHeaderSettingsLink label={ADMIN_HEADER.settings} />
			)}
			<AdminHeaderIconButton
				label={ADMIN_HEADER.logout}
				onClick={() => logout()}
			>
				<LogOut className="size-5" />
			</AdminHeaderIconButton>
		</div>
	);
};
