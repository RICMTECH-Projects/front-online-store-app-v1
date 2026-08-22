import type { ColumnDef } from "@tanstack/react-table";
import { AdminRowActions } from "@/modules/admin/components/table/AdminRowActions";
import { AdminTableStatusBadge } from "@/modules/admin/components/table/AdminTableStatusBadge";
import type { BrandRow } from "../mocks/brands.mock";

export const COLUMNS_BRANDS: ColumnDef<BrandRow>[] = [
	{ accessorKey: "nombre", header: "Marca" }, { accessorKey: "slug", header: "Slug" }, { accessorKey: "productos", header: "Productos" },
	{ accessorKey: "estado", header: "Estado", cell: ({ row }) => <AdminTableStatusBadge>{row.original.estado}</AdminTableStatusBadge> },
	{ id: "acciones", header: "", cell: () => <AdminRowActions /> },
];
