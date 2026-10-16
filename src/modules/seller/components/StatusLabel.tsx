"use client";
import { productStatusLabels } from "../constants/product-status-labels.constants";

export function StatusLabel({ status }: { status: string }) {
	return (
		<span className="inline-flex items-center border border-zinc-300 px-2 py-1 text-xs">
			{productStatusLabels[status] ?? status}
		</span>
	);
}
