import type { ColumnDef } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { StatusLabel } from "../components/StatusLabel";
import type { SellerProduct } from "../interfaces/seller-api.interface";

export function createSellerProductColumns(sellerId: number) {
	return [
		{
			accessorKey: "name",
			header: "Producto",
			cell: ({ row }) => (
				<div>
					<Link
						className="font-medium underline-offset-4 hover:underline"
						href={`/vendedor/${sellerId}/productos/${row.original.id}`}
					>
						{row.original.name}
					</Link>
					<span className="mt-1 block text-xs text-zinc-500">
						{row.original.slug}
					</span>
				</div>
			),
		},
		{ accessorKey: "sku", header: "SKU" },
		{
			accessorKey: "status",
			header: "Estado",
			cell: ({ row }) => <StatusLabel status={row.original.status} />,
		},
		{
			id: "price",
			accessorKey: "price",
			header: "Precio",
			cell: ({ row }) => (
				<span className="tabular-nums">
					{new Intl.NumberFormat("es-PE", {
						style: "currency",
						currency: row.original.currency,
					}).format(row.original.price)}
				</span>
			),
		},
		{
			id: "actions",
			header: "Acciones",
			enableSorting: false,
			cell: ({ row }) => (
				<Link
					href={`/vendedor/${sellerId}/productos/${row.original.id}`}
					aria-label={`Ver ${row.original.name}`}
					className="inline-flex min-h-10 items-center gap-1 underline underline-offset-4"
				>
					Ver <ExternalLink className="size-3" />
				</Link>
			),
		},
	] satisfies ColumnDef<SellerProduct, unknown>[];
}
