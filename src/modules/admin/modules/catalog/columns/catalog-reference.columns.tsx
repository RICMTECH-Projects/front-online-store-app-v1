import type { ColumnDef } from "@tanstack/react-table";
import type {
	AdminBrand,
	AdminCategory,
} from "../interfaces/catalog-reference.interface";

export function createCatalogReferenceColumns({
	isCategory,
	categories,
	pending,
	onEdit,
	onDeactivate,
}: {
	isCategory: boolean;
	categories: AdminCategory[];
	pending: boolean;
	onEdit: (row: AdminBrand | AdminCategory) => void;
	onDeactivate: (row: AdminBrand | AdminCategory) => void;
}): ColumnDef<AdminBrand | AdminCategory, unknown>[] {
	return [
		{ accessorKey: "name", header: "Nombre" },
		...(isCategory
			? [
					{
						id: "parent",
						header: "Superior",
						accessorFn: (row: AdminBrand | AdminCategory) =>
							"parentId" in row ? (row.parentId ?? 0) : 0,
						cell: ({
							row,
						}: {
							row: { original: AdminBrand | AdminCategory };
						}) => {
							const item = row.original;
							return "parentId" in item && item.parentId
								? (categories.find((category) => category.id === item.parentId)
										?.name ?? `#${item.parentId}`)
								: "Raíz";
						},
					},
				]
			: []),
		{ accessorKey: "slug", header: "Slug" },
		{
			id: "status",
			accessorKey: "active",
			header: "Estado",
			cell: ({ row }) => (row.original.active ? "Activa" : "Inactiva"),
		},
		{
			id: "actions",
			header: "Acciones",
			enableSorting: false,
			cell: ({ row }) => (
				<div className="flex justify-end gap-2">
					<button
						type="button"
						onClick={() => onEdit(row.original)}
						className="min-h-9 px-3 underline underline-offset-4"
					>
						Editar
					</button>
					{row.original.active && (
						<button
							type="button"
							onClick={() => onDeactivate(row.original)}
							disabled={pending}
							className="min-h-9 px-3 text-destructive underline underline-offset-4"
						>
							Desactivar
						</button>
					)}
				</div>
			),
		},
	];
}
