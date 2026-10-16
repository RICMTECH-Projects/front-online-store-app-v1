export function Summary({
	label,
	value,
	emphasized = false,
}: {
	label: string;
	value: string;
	emphasized?: boolean;
}) {
	return (
		<div className="flex justify-between gap-4 text-sm">
			<span className="text-zinc-600">{label}</span>
			<span className={emphasized ? "font-semibold" : "font-medium"}>
				{value}
			</span>
		</div>
	);
}
