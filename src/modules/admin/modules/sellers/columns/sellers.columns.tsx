import type { ColumnDef } from "@tanstack/react-table";
import type { AdminSeller } from "../interfaces/seller.interface";

export function createSellerColumns({
	onView,
	onEdit,
	onDeactivate,
}: {
	onView: (seller: AdminSeller) => void;
	onEdit: (seller: AdminSeller) => void;
	onDeactivate: (seller: AdminSeller) => void;
}): ColumnDef<AdminSeller, unknown>[] {
	return [
		{
			accessorKey: "legalName",
			header: "Razón social",
			cell: ({ row }) => (
				<div className="font-medium">
					{row.original.legalName}
					<span className="block text-xs text-muted-foreground">
						ID {row.original.id}
					</span>
				</div>
			),
		},
		{ accessorKey: "taxId", header: "ID fiscal" },
		{ accessorKey: "email", header: "Correo" },
		{
			accessorKey: "status",
			header: "Estado",
			cell: ({ row }) =>
				row.original.status === "ACTIVE" ? "Activo" : "Inactivo",
		},
		{
			id: "actions",
			header: "Acciones",
			enableSorting: false,
			cell: ({ row }) => (
				<div className="flex justify-end gap-2">
					<button
						type="button"
						onClick={() => onView(row.original)}
						className="min-h-9 px-2 underline underline-offset-4"
					>
						Ver equipo
					</button>
					<button
						type="button"
						onClick={() => onEdit(row.original)}
						className="min-h-9 px-2 underline underline-offset-4"
					>
						Editar
					</button>
					{row.original.status !== "INACTIVE" && (
						<button
							type="button"
							onClick={() => onDeactivate(row.original)}
							className="min-h-9 px-2 text-destructive underline underline-offset-4"
						>
							Desactivar
						</button>
					)}
				</div>
			),
		},
	];
}
