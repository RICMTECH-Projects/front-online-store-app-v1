import type { ColumnDef } from "@tanstack/react-table";
import { AdminRowActions } from "@/modules/admin/components/table/AdminRowActions";
import { AdminTableStatusBadge } from "@/modules/admin/components/table/AdminTableStatusBadge";
import type { ProductRow } from "../mocks/products.mock";

export const COLUMNS_PRODUCTS: ColumnDef<ProductRow>[] = [
	{ accessorKey: "nombre", header: "Producto" },
	{ accessorKey: "sku", header: "SKU" },
	{ accessorKey: "marca", header: "Marca" },
	{ accessorKey: "precio", header: "Precio" },
	{ accessorKey: "estado", header: "Estado", cell: ({ row }) => <AdminTableStatusBadge>{row.original.estado}</AdminTableStatusBadge> },
	{ id: "acciones", header: "", cell: () => <AdminRowActions /> },
];
