"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
} from "@/modules/shared/components/ui/sheet";
import { AdminSidebarBrand } from "./AdminSidebarBrand";
import { AdminSidebarNavigation } from "./AdminSidebarNavigation";

export const AdminSidebar = () => {
	const pathname = usePathname();
	return (
		<>
			<aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col overflow-y-auto border-r border-zinc-200 bg-white lg:flex">
				<AdminSidebarBrand />
				<AdminSidebarNavigation pathname={pathname} />
			</aside>
			<Sheet>
				<SheetTrigger asChild>
					<button
						type="button"
						aria-label="Abrir navegacion administrativa"
						className="fixed left-3 top-3 z-40 inline-flex size-10 items-center justify-center border border-zinc-200 bg-white lg:hidden"
					>
						<Menu className="size-5" />
					</button>
				</SheetTrigger>
				<SheetContent
					side="left"
					className="w-72 border-zinc-200 bg-white p-0 text-zinc-950"
				>
					<AdminSidebarBrand />
					<AdminSidebarNavigation pathname={pathname} />
				</SheetContent>
			</Sheet>
		</>
	);
};
