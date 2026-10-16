import type { ColumnDef } from "@tanstack/react-table";
import { SYSTEM_ROLE_CODES } from "../constants/role.constants";
import type { AdminRole } from "../interfaces/role.interface";

export function createRoleColumns({
	userCount,
	pending,
	onView,
	onRename,
	onDelete,
}: {
	userCount: (code: string) => number | undefined;
	pending: boolean;
	onView: (role: AdminRole) => void;
	onRename: (role: AdminRole) => void;
	onDelete: (role: AdminRole) => void;
}): ColumnDef<AdminRole, unknown>[] {
	return [
		{
			id: "code",
			header: "Código",
			accessorKey: "code",
			cell: ({ row }) => (
				<>
					{row.original.code}
					<span className="block text-xs text-muted-foreground">
						ID {row.original.id}
					</span>
				</>
			),
		},
		{ accessorKey: "name", header: "Nombre" },
		{
			id: "users",
			header: "Usuarios actuales",
			accessorFn: (role) => userCount(role.code) ?? -1,
			cell: ({ row }) => userCount(row.original.code) ?? "—",
		},
		{
			id: "type",
			header: "Tipo",
			accessorFn: (role) =>
				SYSTEM_ROLE_CODES.has(role.code) ? "Sistema" : "Personalizado",
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
						className="min-h-9 px-2 underline"
					>
						Ver
					</button>
					<button
						type="button"
						onClick={() => onRename(row.original)}
						className="min-h-9 px-2 underline"
					>
						Renombrar
					</button>
					{!SYSTEM_ROLE_CODES.has(row.original.code) && (
						<button
							type="button"
							onClick={() => onDelete(row.original)}
							disabled={pending}
							className="min-h-9 px-2 text-destructive underline disabled:opacity-50"
						>
							Eliminar
						</button>
					)}
				</div>
			),
		},
	];
}
