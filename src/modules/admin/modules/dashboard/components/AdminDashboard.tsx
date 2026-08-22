"use client";

import { BadgePercent, Boxes, Truck, UsersRound } from "lucide-react";
import { AdminDataTable } from "@/modules/admin/components/table/AdminDataTable";
import { COLUMNS_DASHBOARD_ORDERS } from "../constants/dashboard.columns.table";
import { DASHBOARD_ORDERS_ROWS } from "../mocks/dashboard.mock";

export const AdminDashboard = () => (
	<main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
		<p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
			Panel operativo
		</p>
		<h1 className="mt-2 font-antonio text-3xl font-semibold uppercase sm:text-4xl">
			Centro de control
		</h1>
		<p className="mt-2 text-sm text-zinc-600">
			Vista general de la operación comercial.
		</p>
		<section className="mt-8 grid grid-cols-2 gap-px border border-zinc-200 bg-zinc-200 lg:grid-cols-4">
			{[
				{ label: "Productos activos", value: "128", icon: Boxes },
				{ label: "Pedidos pendientes", value: "24", icon: Truck },
				{ label: "Usuarios", value: "48", icon: UsersRound },
				{ label: "Cupones activos", value: "12", icon: BadgePercent },
			].map(({ label, value, icon: Icon }) => (
				<div key={label} className="min-h-36 bg-white p-5">
					<Icon className="size-5 text-zinc-500" />
					<p className="mt-8 text-3xl font-semibold">{value}</p>
					<p className="mt-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
						{label}
					</p>
				</div>
			))}
		</section>
		<section className="mt-8">
			<h2 className="mb-4 font-antonio text-xl font-semibold uppercase">
				Pedidos recientes
			</h2>
			<AdminDataTable
				columns={COLUMNS_DASHBOARD_ORDERS}
				data={DASHBOARD_ORDERS_ROWS}
				emptyMessage="No hay pedidos recientes."
			/>
		</section>
	</main>
);
