import { Filter, Plus, Search } from "lucide-react";
import type { ReactNode } from "react";

type AdminModuleHeaderProps = {
	title: string;
	description: string;
	actionLabel: string;
	children?: ReactNode;
};

export const AdminModuleHeader = ({
	title,
	description,
	actionLabel,
	children,
}: AdminModuleHeaderProps) => (
	<>
		<div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
			<div>
				<p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
					Gestion administrativa
				</p>
				<h1 className="mt-2 font-antonio text-3xl font-semibold uppercase sm:text-4xl">
					{title}
				</h1>
				<p className="mt-2 text-sm text-zinc-600">{description}</p>
			</div>
			<button
				type="button"
				className="inline-flex h-10 items-center justify-center gap-2 bg-zinc-950 px-4 text-sm font-medium text-white hover:bg-zinc-800"
			>
				<Plus className="size-4" />
				{actionLabel}
			</button>
		</div>
		<div className="mb-4 flex flex-col gap-3 sm:flex-row">
			<label className="relative block sm:w-80">
				<Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
				<input
					aria-label={`Buscar en ${title}`}
					placeholder="Buscar..."
					className="h-10 w-full border border-zinc-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-zinc-950"
				/>
			</label>
			<button
				type="button"
				className="inline-flex h-10 items-center justify-center gap-2 border border-zinc-200 bg-white px-3 text-sm hover:bg-zinc-50"
			>
				<Filter className="size-4" />
				Filtros
			</button>
			{children}
		</div>
	</>
);
