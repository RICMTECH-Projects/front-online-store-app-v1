import type { ColumnDef } from "@tanstack/react-table";
import type { AdminCoupon } from "../interfaces/coupon.interface";

export function createCouponColumns(
	onToggle: (coupon: AdminCoupon) => void,
	pending: boolean,
): ColumnDef<AdminCoupon, unknown>[] {
	return [
		{ accessorKey: "code", header: "Código" },
		{
			id: "discount",
			accessorFn: (coupon) => coupon.discountValue,
			header: "Descuento",
			cell: ({ row }) =>
				`${row.original.discountValue}${row.original.discountType === "PERCENTAGE" ? "%" : " PEN"}`,
		},
		{
			id: "validity",
			accessorFn: (coupon) => coupon.startsAt,
			header: "Vigencia",
			cell: ({ row }) =>
				`${new Date(row.original.startsAt).toLocaleDateString("es-PE")} – ${new Date(row.original.endsAt).toLocaleDateString("es-PE")}`,
		},
		{
			id: "usage",
			accessorFn: (coupon) => coupon.usageCount,
			header: "Usos",
			cell: ({ row }) =>
				`${row.original.usageCount}${row.original.usageLimit ? ` / ${row.original.usageLimit}` : ""}`,
		},
		{
			id: "active",
			accessorFn: (coupon) => coupon.active,
			header: "Estado",
			cell: ({ row }) => (row.original.active ? "Activo" : "Inactivo"),
		},
		{
			id: "actions",
			header: "Acción",
			enableSorting: false,
			cell: ({ row }) => (
				<button
					type="button"
					disabled={pending}
					onClick={() => onToggle(row.original)}
					aria-label={`${row.original.active ? "Desactivar" : "Activar"} cupón ${row.original.code}`}
					className="min-h-9 px-3 underline underline-offset-4 disabled:opacity-50"
				>
					{row.original.active ? "Desactivar" : "Activar"}
				</button>
			),
		},
	];
}
