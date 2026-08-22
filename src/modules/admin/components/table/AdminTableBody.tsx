import { flexRender, type Row } from "@tanstack/react-table";
import {
	TableBody,
	TableCell,
	TableRow,
} from "@/modules/shared/components/ui/table";

export function AdminTableBody<TData>({
	rows,
	columnCount,
	emptyMessage,
}: {
	rows: Row<TData>[];
	columnCount: number;
	emptyMessage: string;
}) {
	return (
		<TableBody>
			{rows.length ? (
				rows.map((row) => (
					<TableRow key={row.id}>
						{row.getVisibleCells().map((cell) => (
							<TableCell key={cell.id} className="px-4 py-3">
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</TableCell>
						))}
					</TableRow>
				))
			) : (
				<TableRow>
					<TableCell
						colSpan={columnCount}
						className="h-28 text-center text-zinc-500"
					>
						{emptyMessage}
					</TableCell>
				</TableRow>
			)}
		</TableBody>
	);
}
