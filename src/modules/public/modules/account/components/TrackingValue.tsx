export function TrackingValue({
	label,
	value,
}: {
	label: string;
	value: string | null;
}) {
	return (
		<div>
			<dt className="text-xs uppercase tracking-wide text-zinc-500">{label}</dt>
			<dd className="mt-1 break-all text-sm">
				{value || "Pendiente de actualización"}
			</dd>
		</div>
	);
}
