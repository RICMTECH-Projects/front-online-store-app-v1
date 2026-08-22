"use client";

import { AdminModuleHeader } from "@/modules/admin/components/header/AdminModuleHeader";
import { AdminDataTable } from "@/modules/admin/components/table/AdminDataTable";
import { COLUMNS_SHIPMENTS } from "../constants/shipments.columns.table";
import { SHIPMENTS_ROWS } from "../mocks/shipments.mock";

export const ShipmentsPage = () => (
	<main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
		<AdminModuleHeader title="Envios" description="Seguimiento de entregas y transportistas." actionLabel="Nuevo envio" />
		<AdminDataTable columns={COLUMNS_SHIPMENTS} data={SHIPMENTS_ROWS} emptyMessage="No hay registros de envios." />
	</main>
);
