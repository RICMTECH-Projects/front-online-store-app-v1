import type { ReactNode } from "react";
import { AdminHeader } from "./header/AdminHeader";
import { AdminSidebar } from "./sidebar/AdminSidebar";
import { AuthSessionHydrator } from "@/modules/auth/components/AuthSessionHydrator";

export const AdminShell = ({ children }: { children: ReactNode }) => (
	<div className="min-h-screen bg-zinc-50 font-inter text-zinc-950">
		<AuthSessionHydrator />
		<AdminSidebar />
		<div className="min-w-0 lg:pl-72">
			<AdminHeader />
			{children}
		</div>
	</div>
);
