"use client";

import { LoaderCircle } from "lucide-react";

export function Loading({
	label = "Cargando información",
}: {
	label?: string;
}) {
	return (
		<div
			className="flex min-h-52 items-center justify-center gap-3 text-sm text-zinc-600"
			role="status"
		>
			<LoaderCircle className="size-4 animate-spin" />
			{label}
		</div>
	);
}
