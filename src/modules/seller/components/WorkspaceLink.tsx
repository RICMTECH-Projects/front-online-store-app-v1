"use client";

import Link from "next/link";

export function WorkspaceLink({
	href,
	active,
	children,
}: {
	href: string;
	active: boolean;
	children: React.ReactNode;
}) {
	return (
		<Link
			href={href}
			aria-current={active ? "page" : undefined}
			className={`inline-flex min-h-10 items-center border px-3 ${active ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-300 hover:border-zinc-950"}`}
		>
			{children}
		</Link>
	);
}
