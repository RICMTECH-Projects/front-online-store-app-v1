import type { ReactNode } from "react";

type AdminHeaderIconButtonProps = {
	label: string;
	children: ReactNode;
	onClick?: () => void;
};

export const AdminHeaderIconButton = ({
	label,
	children,
	onClick,
}: AdminHeaderIconButtonProps) => (
	<button
		type="button"
		aria-label={label}
		title={label}
		onClick={onClick}
		className="inline-flex size-9 items-center justify-center text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
	>
		{children}
	</button>
);
