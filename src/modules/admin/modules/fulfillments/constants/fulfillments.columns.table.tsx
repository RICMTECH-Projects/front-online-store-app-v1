import type { ColumnDef } from "@tanstack/react-table";
import { AdminRowActions } from "@/modules/admin/components/table/AdminRowActions";
import { AdminTableStatusBadge } from "@/modules/admin/components/table/AdminTableStatusBadge";
import type { FulfillmentRow } from "../mocks/fulfillments.mock";

export const COLUMNS_FULFILLMENTS: ColumnDef<FulfillmentRow>[] = [
	{ accessorKey: "pedido", header: "Pedido" }, { accessorKey: "vendedor", header: "Vendedor" }, { accessorKey: "cliente", header: "Cliente" },
	{ accessorKey: "estado", header: "Estado", cell: ({ row }) => <AdminTableStatusBadge>{row.original.estado}</AdminTableStatusBadge> },
	{ id: "acciones", header: "", cell: () => <AdminRowActions /> },
];
