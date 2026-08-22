"use client";

import { AdminModuleHeader } from "@/modules/admin/components/header/AdminModuleHeader";
import { AdminDataTable } from "@/modules/admin/components/table/AdminDataTable";
import { COLUMNS_COUPONS } from "../constants/coupons.columns.table";
import { COUPONS_ROWS } from "../mocks/coupons.mock";

export const CouponsPage = () => (
	<main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
		<AdminModuleHeader title="Cupones" description="Descuentos y campanas comerciales." actionLabel="Nuevo cupon" />
		<AdminDataTable columns={COLUMNS_COUPONS} data={COUPONS_ROWS} emptyMessage="No hay registros de cupones." />
	</main>
);
