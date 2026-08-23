"use client";

import {
	type ColumnDef,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import type { ReactNode } from "react";
import { useState } from "react";
import { Table } from "@/modules/shared/components/ui/table";
import { AdminTableBody } from "./AdminTableBody";
import { AdminTableFooter } from "./AdminTableFooter";
import { AdminTableHeader } from "./AdminTableHeader";

export function AdminDataTable<TData>({
	columns,
	data,
	emptyMessage,
	renderBody,
}: {
	columns: ColumnDef<TData>[];
	data: TData[];
	emptyMessage: string;
	renderBody?: (table: ReturnType<typeof useReactTable<TData>>) => ReactNode;
}) {
	const [sorting, setSorting] = useState<SortingState>([]);
	// TanStack Table manages these API references internally.
	// eslint-disable-next-line react-hooks/incompatible-library
	const table = useReactTable({
		data,
		columns,
		state: { sorting },
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		initialState: { pagination: { pageSize: 8 } },
	});
	return (
		<div className="border border-zinc-200 bg-white">
			<Table>
				<AdminTableHeader headerGroups={table.getHeaderGroups()} />
				{renderBody ? (
					renderBody(table)
				) : (
					<AdminTableBody
						rows={table.getRowModel().rows}
						columnCount={columns.length}
						emptyMessage={emptyMessage}
					/>
				)}
				<AdminTableFooter table={table} />
			</Table>
		</div>
	);
}
