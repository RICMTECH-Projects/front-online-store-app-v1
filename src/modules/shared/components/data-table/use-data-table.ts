"use client";
import {
	type ColumnDef,
	functionalUpdate,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type PaginationState,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import type { PaginationMode } from "./data-table.interface";

export function useDataTable<TData>(
	columns: ColumnDef<TData, unknown>[],
	data: TData[],
	pagination?: PaginationMode,
) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [clientPagination, setClientPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: pagination?.type === "client" ? (pagination.pageSize ?? 10) : 10,
	});
	const serverPagination =
		pagination?.type === "server" ? pagination : undefined;
	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			...(pagination?.type === "client"
				? { pagination: clientPagination }
				: {}),
			...(serverPagination
				? {
						pagination: {
							pageIndex: serverPagination.pageIndex,
							pageSize: serverPagination.pageSize,
						},
					}
				: {}),
		},
		onSortingChange: setSorting,
		onPaginationChange: (updater) => {
			const current = serverPagination
				? {
						pageIndex: serverPagination.pageIndex,
						pageSize: serverPagination.pageSize,
					}
				: clientPagination;
			const next = functionalUpdate(updater, current);
			if (serverPagination) serverPagination.onPageChange(next.pageIndex);
			else setClientPagination(next);
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		...(pagination?.type === "client"
			? { getPaginationRowModel: getPaginationRowModel() }
			: {}),
		...(serverPagination
			? { manualPagination: true, pageCount: serverPagination.pageCount }
			: {}),
	});
	const rows = table.getRowModel().rows;

	return { table, rows };
}
