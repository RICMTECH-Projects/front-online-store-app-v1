"use client";

import { ChevronDown, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";
import { cn } from "@/modules/shared/lib/utils";

type AdminSidebarNavGroupProps = {
	icon: LucideIcon;
	isOpen: boolean;
	items: readonly { href: string; label: string }[];
	label: string;
	pathname: string;
};

export const AdminSidebarNavGroup = ({
	icon: Icon,
	isOpen,
	items,
	label,
	pathname,
}: AdminSidebarNavGroupProps) => {
	const [isExpanded, setIsExpanded] = useState(isOpen);
	const contentId = useId();

	return (
		<div>
			<button
				type="button"
				aria-controls={contentId}
				aria-expanded={isExpanded}
				onClick={() => setIsExpanded((expanded) => !expanded)}
				className={cn(
					"flex h-11 w-full items-center gap-3 rounded-md px-3 text-left text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950",
					isExpanded && "text-zinc-950",
				)}
			>
				<Icon className="size-4 shrink-0" aria-hidden="true" />
				<span>{label}</span>
				<ChevronDown
					className={cn(
						"ml-auto size-4 shrink-0 transition-transform duration-300 ease-out motion-reduce:transition-none",
						isExpanded && "rotate-180",
					)}
					aria-hidden="true"
				/>
			</button>

			<div
				id={contentId}
				className={cn(
					"grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
					isExpanded
						? "grid-rows-[1fr] opacity-100"
						: "grid-rows-[0fr] opacity-0",
				)}
			>
				<div className="overflow-hidden">
					<div
						className={cn(
							"ml-5 border-l border-zinc-200 transition-transform duration-300 ease-out motion-reduce:transition-none",
							isExpanded ? "translate-y-0" : "-translate-y-1",
						)}
					>
						<div className="flex flex-col py-1">
							{items.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									tabIndex={isExpanded ? undefined : -1}
									className={cn(
										"px-3 py-2 text-sm transition-colors",
										pathname === item.href
											? "font-semibold text-zinc-950"
											: "text-zinc-500 hover:text-zinc-950",
									)}
								>
									{item.label}
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
