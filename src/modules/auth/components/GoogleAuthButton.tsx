import { GoogleIcon } from "./GoogleIcon";

export const GoogleAuthButton = ({ label }: { label: string }) => {
	return (
		<button
			type="button"
			className="flex w-full items-center justify-center gap-3 border border-border py-3.5 text-sm font-medium transition-colors hover:bg-muted/50"
		>
			<GoogleIcon />
			{label}
		</button>
	);
};
