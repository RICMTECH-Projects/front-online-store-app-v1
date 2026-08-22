import type { ColumnDef } from "@tanstack/react-table";
import { AdminRowActions } from "@/modules/admin/components/table/AdminRowActions";
import { AdminTableStatusBadge } from "@/modules/admin/components/table/AdminTableStatusBadge";
import type { UserRow } from "../mocks/users.mock";

export const COLUMNS_USERS: ColumnDef<UserRow>[] = [
	{ accessorKey: "nombre", header: "Usuario" }, { accessorKey: "correo", header: "Correo" }, { accessorKey: "rol", header: "Rol" },
	{ accessorKey: "estado", header: "Estado", cell: ({ row }) => <AdminTableStatusBadge>{row.original.estado}</AdminTableStatusBadge> },
	{ id: "acciones", header: "", cell: () => <AdminRowActions /> },
];
