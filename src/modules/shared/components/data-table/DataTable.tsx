"use client";

import { type ColumnDef, flexRender } from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/modules/shared/components/ui/table";
import type { PaginationMode } from "./data-table.interface";
import { useDataTable } from "./use-data-table";

export function DataTable<TData>({
	columns,
	data,
	emptyMessage,
	caption,
	pagination,
}: {
	columns: ColumnDef<TData, unknown>[];
	data: TData[];
	emptyMessage: string;
	caption?: string;
	pagination?: PaginationMode;
}) {
	const { table, rows } = useDataTable(columns, data, pagination);
	return (
		<div className="overflow-x-auto border border-border bg-background">
			<Table>
				{caption && <TableCaption>{caption}</TableCaption>}
				<TableHeader>
					{table.getHeaderGroups().map((group) => (
						<TableRow key={group.id}>
							{group.headers.map((header) => (
								<TableHead key={header.id} scope="col">
									{header.isPlaceholder ? null : header.column.getCanSort() ? (
										<button
											type="button"
											aria-label={`Ordenar por ${header.column.id}`}
											onClick={header.column.getToggleSortingHandler()}
											className="inline-flex min-h-8 items-center gap-2 text-left"
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
											<span aria-hidden="true">
												{{ asc: "↑", desc: "↓" }[
													header.column.getIsSorted() as "asc" | "desc"
												] ?? "↕"}
											</span>
										</button>
									) : (
										flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)
									)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{rows.length ? (
						rows.map((row) => (
							<TableRow key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								{emptyMessage}
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			{pagination && (
				<div className="flex items-center justify-end gap-2 border-t border-border p-3">
					<p className="mr-auto text-sm text-muted-foreground">
						Página {table.getState().pagination.pageIndex + 1} de{" "}
						{table.getPageCount()}
					</p>
					<button
						type="button"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
						className="min-h-9 border border-border px-3 text-sm disabled:opacity-50"
					>
						Anterior
					</button>
					<button
						type="button"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
						className="min-h-9 border border-border px-3 text-sm disabled:opacity-50"
					>
						Siguiente
					</button>
				</div>
			)}
		</div>
	);
}
