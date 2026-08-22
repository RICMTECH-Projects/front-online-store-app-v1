import type { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
	TableCell,
	TableFooter,
	TableRow,
} from "@/modules/shared/components/ui/table";

export function AdminTableFooter<TData>({ table }: { table: Table<TData> }) {
	return (
		<TableFooter>
			<TableRow>
				<TableCell colSpan={table.getAllColumns().length} className="px-4 py-3">
					<div className="flex items-center justify-between gap-3 text-xs text-zinc-600">
						<span>
							{table.getRowModel().rows.length} de{" "}
							{table.getFilteredRowModel().rows.length} registros
						</span>
						<div className="flex items-center gap-2">
							<button
								type="button"
								aria-label="Pagina anterior"
								disabled={!table.getCanPreviousPage()}
								onClick={() => table.previousPage()}
								className="inline-flex size-8 items-center justify-center border border-zinc-200 disabled:opacity-40"
							>
								<ChevronLeft className="size-4" />
							</button>
							<span>
								Pagina {table.getState().pagination.pageIndex + 1} de{" "}
								{table.getPageCount()}
							</span>
							<button
								type="button"
								aria-label="Pagina siguiente"
								disabled={!table.getCanNextPage()}
								onClick={() => table.nextPage()}
								className="inline-flex size-8 items-center justify-center border border-zinc-200 disabled:opacity-40"
							>
								<ChevronRight className="size-4" />
							</button>
						</div>
					</div>
				</TableCell>
			</TableRow>
		</TableFooter>
	);
}
