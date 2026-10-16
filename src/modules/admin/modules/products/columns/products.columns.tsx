import type { ColumnDef } from "@tanstack/react-table";
import type {
	AdminProduct,
	ProductImportResult,
} from "../interfaces/product.interface";

export function createProductColumns({
	sellerNames,
	pending,
	onAddImage,
	onChangeStatus,
}: {
	sellerNames: Map<number, string>;
	pending: boolean;
	onAddImage: (product: AdminProduct) => void;
	onChangeStatus: (product: AdminProduct) => void;
}): ColumnDef<AdminProduct, unknown>[] {
	return [
		{
			id: "product",
			header: "Producto",
			accessorKey: "name",
			cell: ({ row }) => (
				<>
					{row.original.name}
					<span className="block text-xs text-muted-foreground">
						ID {row.original.id} · {row.original.images.length} imágenes
					</span>
				</>
			),
		},
		{
			id: "seller",
			header: "Comercio",
			accessorFn: (product) =>
				sellerNames.get(product.sellerId) ?? `#${product.sellerId}`,
		},
		{ accessorKey: "sku", header: "SKU" },
		{
			id: "price",
			header: "Precio",
			accessorFn: (product) => product.price,
			cell: ({ row }) =>
				`${row.original.currency} ${row.original.price.toFixed(2)}`,
		},
		{ accessorKey: "status", header: "Estado" },
		{
			id: "actions",
			header: "Acciones",
			enableSorting: false,
			cell: ({ row }) => (
				<div className="flex justify-end gap-2">
					<button
						type="button"
						onClick={() => onAddImage(row.original)}
						className="min-h-9 px-2 underline"
					>
						Agregar imagen
					</button>
					<button
						type="button"
						disabled={pending}
						onClick={() => onChangeStatus(row.original)}
						className="min-h-9 px-2 underline disabled:opacity-50"
					>
						{row.original.status === "ACTIVE" ? "Desactivar" : "Publicar"}
					</button>
				</div>
			),
		},
	];
}

export const productImportErrorColumns: ColumnDef<
	ProductImportResult["errors"][number],
	unknown
>[] = [
	{ accessorKey: "row", header: "Fila" },
	{ accessorKey: "field", header: "Campo" },
	{ accessorKey: "message", header: "Detalle" },
];
