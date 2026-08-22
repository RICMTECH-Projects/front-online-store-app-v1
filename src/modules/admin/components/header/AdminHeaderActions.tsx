"use client";

import { Bell, LogOut, Settings } from "lucide-react";
import { ADMIN_HEADER } from "@/modules/admin/constants/admin-layout.constants";
import { useLogout } from "@/modules/auth/hooks/use-logout";
import { AdminHeaderIconButton } from "./AdminHeaderIconButton";
import { AdminHeaderProfileLink } from "./AdminHeaderProfileLink";

export const AdminHeaderActions = () => {
	const logout = useLogout();

	return (
		<div className="flex items-center gap-1">
			<AdminHeaderIconButton label={ADMIN_HEADER.notifications}>
				<Bell className="size-5" />
			</AdminHeaderIconButton>
			<AdminHeaderIconButton label={ADMIN_HEADER.settings}>
				<Settings className="size-5" />
			</AdminHeaderIconButton>
			<AdminHeaderProfileLink label={ADMIN_HEADER.profile} />
			<AdminHeaderIconButton label={ADMIN_HEADER.logout} onClick={() => logout()}>
				<LogOut className="size-5" />
			</AdminHeaderIconButton>
		</div>
	);
};
