import type { ColumnDef } from "@tanstack/react-table";
import { AdminRowActions } from "@/modules/admin/components/table/AdminRowActions";
import { AdminTableStatusBadge } from "@/modules/admin/components/table/AdminTableStatusBadge";
import type { SellerRow } from "../mocks/sellers.mock";

export const COLUMNS_SELLERS: ColumnDef<SellerRow>[] = [
	{ accessorKey: "tienda", header: "Tienda" }, { accessorKey: "legal", header: "Razon social" }, { accessorKey: "productos", header: "Productos" },
	{ accessorKey: "estado", header: "Estado", cell: ({ row }) => <AdminTableStatusBadge>{row.original.estado}</AdminTableStatusBadge> },
	{ id: "acciones", header: "", cell: () => <AdminRowActions /> },
];
