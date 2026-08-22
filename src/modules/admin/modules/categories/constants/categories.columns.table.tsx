import type { ColumnDef } from "@tanstack/react-table";
import { AdminRowActions } from "@/modules/admin/components/table/AdminRowActions";
import { AdminTableStatusBadge } from "@/modules/admin/components/table/AdminTableStatusBadge";
import type { CategoryRow } from "../mocks/categories.mock";

export const COLUMNS_CATEGORIES: ColumnDef<CategoryRow>[] = [
	{ accessorKey: "nombre", header: "Categoria" }, { accessorKey: "padre", header: "Categoria padre" }, { accessorKey: "productos", header: "Productos" },
	{ accessorKey: "estado", header: "Estado", cell: ({ row }) => <AdminTableStatusBadge>{row.original.estado}</AdminTableStatusBadge> },
	{ id: "acciones", header: "", cell: () => <AdminRowActions /> },
];
