import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import type { AdminUser } from "../interfaces/user.interface";

export function createUserColumns(
	onEdit: (user: AdminUser) => void,
): ColumnDef<AdminUser, unknown>[] {
	return [
		{
			id: "user",
			header: "Usuario",
			accessorFn: (user) => `${user.firstName} ${user.lastName}`,
			cell: ({ row }) => (
				<>
					{row.original.firstName} {row.original.lastName}
					<span className="block text-xs text-muted-foreground">
						ID {row.original.id}
					</span>
				</>
			),
		},
		{ accessorKey: "email", header: "Correo" },
		{
			id: "roles",
			accessorFn: (user) => user.roles.join(", "),
			header: "Roles",
			cell: ({ row }) => row.original.roles.join(", ") || "Sin roles",
		},
		{
			id: "status",
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
					<Link
						href={`/usuarios/${row.original.id}`}
						className="min-h-9 px-2 py-2 underline underline-offset-4"
					>
						Detalle
					</Link>
					<button
						type="button"
						onClick={() => onEdit(row.original)}
						className="min-h-9 px-2 underline underline-offset-4"
					>
						Editar
					</button>
				</div>
			),
		},
	];
}
