export const AuthDivider = ({ label }: { label: string }) => {
	return (
		<div className="my-8 flex items-center gap-4">
			<div className="h-px flex-1 bg-border" />
			<span className="text-xs uppercase tracking-wider text-muted-foreground">
				{label}
			</span>
			<div className="h-px flex-1 bg-border" />
		</div>
	);
};
