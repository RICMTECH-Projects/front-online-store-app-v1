import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import {
	fulfillmentStatusLabels,
	type SellerOrder,
} from "@/modules/fulfillment";
import { FulfillmentOrderActions } from "../components/FulfillmentOrderActions";

export function createFulfillmentColumns(
	onEdit: (key: string) => void,
): ColumnDef<SellerOrder, unknown>[] {
	return [
		{
			accessorKey: "orderNumber",
			header: "Orden",
			cell: ({ row }) => (
				<div>
					<Link
						href={`/envios?orderId=${row.original.orderId}`}
						className="font-medium underline underline-offset-4"
					>
						{row.original.orderNumber}
					</Link>
					<span className="mt-1 block text-xs text-muted-foreground">
						ID {row.original.orderId}
					</span>
				</div>
			),
		},
		{
			id: "seller",
			accessorFn: (row) => row.fulfillment.sellerId,
			header: "Vendedor",
			cell: ({ row }) => `Tienda #${row.original.fulfillment.sellerId}`,
		},
		{
			id: "lines",
			accessorFn: (row) => row.lines.map((line) => line.productName).join(" "),
			header: "Líneas asignadas",
			cell: ({ row }) => (
				<div className="max-w-sm">
					{row.original.lines.map((line) => (
						<p key={line.id} className="truncate">
							{line.quantity} × {line.productName}
						</p>
					))}
				</div>
			),
		},
		{
			id: "fulfillment",
			accessorFn: (row) => row.fulfillment.status,
			header: "Preparación",
			cell: ({ row }) =>
				fulfillmentStatusLabels[row.original.fulfillment.status],
		},
		{ accessorKey: "orderStatus", header: "Pedido comercial" },
		{
			id: "actions",
			header: "Acciones",
			enableSorting: false,
			cell: ({ row }) => (
				<FulfillmentOrderActions
					order={row.original}
					onEdit={() =>
						onEdit(
							`${row.original.orderId}-${row.original.fulfillment.sellerId}`,
						)
					}
				/>
			),
		},
	];
}
