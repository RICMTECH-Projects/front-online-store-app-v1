import type { ColumnDef } from "@tanstack/react-table";
import { AdminRowActions } from "@/modules/admin/components/table/AdminRowActions";
import { AdminTableStatusBadge } from "@/modules/admin/components/table/AdminTableStatusBadge";
import type { CouponRow } from "../mocks/coupons.mock";

export const COLUMNS_COUPONS: ColumnDef<CouponRow>[] = [
	{ accessorKey: "codigo", header: "Codigo" }, { accessorKey: "descuento", header: "Descuento" }, { accessorKey: "usos", header: "Usos" },
	{ accessorKey: "estado", header: "Estado", cell: ({ row }) => <AdminTableStatusBadge>{row.original.estado}</AdminTableStatusBadge> },
	{ id: "acciones", header: "", cell: () => <AdminRowActions /> },
];
