import { Plus } from "lucide-react";

type AdminModuleHeaderProps = {
	title: string;
	description: string;
	actionLabel?: string;
	onAction?: () => void;
	showAction?: boolean;
};

export const AdminModuleHeader = ({
	title,
	description,
	actionLabel,
	onAction,
	showAction = true,
}: AdminModuleHeaderProps) => (
	<>
		<div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
			<div>
				<p className="text-xs font-semibold uppercase tracking-label text-zinc-500">
					Gestion administrativa
				</p>
				<h1 className="mt-2 font-antonio text-3xl font-semibold uppercase sm:text-4xl">
					{title}
				</h1>
				<p className="mt-2 text-sm text-zinc-600">{description}</p>
			</div>
			{showAction && (
				<button
					type="button"
					onClick={onAction}
					disabled={!onAction}
					className="inline-flex h-10 items-center justify-center gap-2 bg-zinc-950 px-4 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
				>
					<Plus className="size-4" />
					{actionLabel}
				</button>
			)}
		</div>
	</>
);
