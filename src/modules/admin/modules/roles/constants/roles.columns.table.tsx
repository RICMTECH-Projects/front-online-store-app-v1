import type { ColumnDef } from "@tanstack/react-table";
import { AdminRowActions } from "@/modules/admin/components/table/AdminRowActions";
import { AdminTableStatusBadge } from "@/modules/admin/components/table/AdminTableStatusBadge";
import type { RoleRow } from "../mocks/roles.mock";

export const COLUMNS_ROLES: ColumnDef<RoleRow>[] = [
	{ accessorKey: "codigo", header: "Codigo" }, { accessorKey: "nombre", header: "Nombre" }, { accessorKey: "usuarios", header: "Usuarios" },
	{ accessorKey: "estado", header: "Estado", cell: ({ row }) => <AdminTableStatusBadge>{row.original.estado}</AdminTableStatusBadge> },
	{ id: "acciones", header: "", cell: () => <AdminRowActions /> },
];
