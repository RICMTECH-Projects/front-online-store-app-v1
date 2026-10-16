import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { fulfillmentStatusLabels } from "../constants/fulfillment.constants";
import type { SellerOrder } from "../interfaces/fulfillment.interface";
import { money } from "../utils/money";

export function createSellerOrderColumns(
	sellerId: number,
): ColumnDef<SellerOrder, unknown>[] {
	return [
		{
			accessorKey: "orderNumber",
			header: "Orden",
			cell: ({ row }) => (
				<div className="font-medium">
					<Link
						href={`/vendedor/${sellerId}/ordenes/${row.original.orderId}`}
						className="underline underline-offset-4"
					>
						{row.original.orderNumber}
					</Link>
					<span className="mt-1 block text-xs font-normal text-muted-foreground">
						Comercial: {row.original.orderStatus}
					</span>
				</div>
			),
		},
		{
			id: "products",
			header: "Productos de la tienda",
			accessorFn: (order) =>
				order.lines.map((line) => line.productName).join(" "),
			cell: ({ row }) => (
				<div className="max-w-sm">
					{row.original.lines.map((line) => (
						<p key={line.id} className="truncate">
							{line.quantity} × {line.productName}{" "}
							<span className="text-muted-foreground">({line.sku})</span>
						</p>
					))}
				</div>
			),
		},
		{
			id: "status",
			header: "Preparación",
			accessorFn: (order) => order.fulfillment.status,
			cell: ({ row }) =>
				fulfillmentStatusLabels[row.original.fulfillment.status],
		},
		{
			id: "subtotal",
			header: "Subtotal de líneas",
			accessorFn: (order) =>
				order.lines.reduce((total, line) => total + line.lineTotal, 0),
			cell: ({ row }) => (
				<span className="tabular-nums">
					{money(
						row.original.lines.reduce(
							(total, line) => total + line.lineTotal,
							0,
						),
						row.original.currency,
					)}
				</span>
			),
		},
		{
			id: "actions",
			header: "Acciones",
			enableSorting: false,
			cell: ({ row }) => (
				<Link
					className="inline-flex min-h-10 items-center underline"
					href={`/vendedor/${sellerId}/ordenes/${row.original.orderId}`}
				>
					Gestionar
				</Link>
			),
		},
	];
}
