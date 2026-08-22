"use client";

import { AdminModuleHeader } from "@/modules/admin/components/header/AdminModuleHeader";
import { AdminDataTable } from "@/modules/admin/components/table/AdminDataTable";
import { COLUMNS_FULFILLMENTS } from "../constants/fulfillments.columns.table";
import { FULFILLMENTS_ROWS } from "../mocks/fulfillments.mock";

export const FulfillmentsPage = () => (
	<main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
		<AdminModuleHeader title="Fulfillment" description="Preparacion y despacho de pedidos." actionLabel="Nuevo registro" />
		<AdminDataTable columns={COLUMNS_FULFILLMENTS} data={FULFILLMENTS_ROWS} emptyMessage="No hay registros de fulfillment." />
	</main>
);
