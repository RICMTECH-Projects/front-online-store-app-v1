"use client";

import { Button } from "@/modules/shared/components/ui/button";

export function Problem({
	message,
	retry,
}: {
	message: string;
	retry?: () => void;
}) {
	return (
		<div className="border border-zinc-300 bg-white p-6" role="alert">
			<p className="font-medium text-zinc-950">{message}</p>
			{retry && (
				<Button className="mt-4" variant="outline" onClick={retry}>
					Intentar de nuevo
				</Button>
			)}
		</div>
	);
}
