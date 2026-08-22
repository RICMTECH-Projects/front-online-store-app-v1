import { ADMIN_HEADER } from "../../constants/admin-layout.constants";
import { AdminHeaderActions } from "./AdminHeaderActions";

export const AdminHeader = () => (
	<header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-4 sm:px-6">
		<p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
			{ADMIN_HEADER.section}
		</p>
		<AdminHeaderActions />
	</header>
);
