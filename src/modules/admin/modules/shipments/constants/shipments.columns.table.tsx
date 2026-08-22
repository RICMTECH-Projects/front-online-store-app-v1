import type { ColumnDef } from "@tanstack/react-table";
import { AdminRowActions } from "@/modules/admin/components/table/AdminRowActions";
import { AdminTableStatusBadge } from "@/modules/admin/components/table/AdminTableStatusBadge";
import type { ShipmentRow } from "../mocks/shipments.mock";

export const COLUMNS_SHIPMENTS: ColumnDef<ShipmentRow>[] = [
	{ accessorKey: "pedido", header: "Pedido" }, { accessorKey: "transportista", header: "Transportista" }, { accessorKey: "tracking", header: "Tracking" },
	{ accessorKey: "estado", header: "Estado", cell: ({ row }) => <AdminTableStatusBadge>{row.original.estado}</AdminTableStatusBadge> },
	{ id: "acciones", header: "", cell: () => <AdminRowActions /> },
];
