import { flexRender, type HeaderGroup } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import {
	TableHead,
	TableHeader,
	TableRow,
} from "@/modules/shared/components/ui/table";

export function AdminTableHeader<TData>({
	headerGroups,
}: {
	headerGroups: HeaderGroup<TData>[];
}) {
	return (
		<TableHeader className="bg-zinc-50">
			{headerGroups.map((group) => (
				<TableRow key={group.id}>
					{group.headers.map((header) => (
						<TableHead
							key={header.id}
							className="px-4 text-xs uppercase tracking-wide text-zinc-500"
						>
							{header.isPlaceholder ? null : (
								<button
									type="button"
									className="inline-flex items-center gap-1.5"
									onClick={header.column.getToggleSortingHandler()}
								>
									{flexRender(
										header.column.columnDef.header,
										header.getContext(),
									)}
									{header.column.getCanSort() && (
										<ArrowUpDown className="size-3.5" />
									)}
								</button>
							)}
						</TableHead>
					))}
				</TableRow>
			))}
		</TableHeader>
	);
}
