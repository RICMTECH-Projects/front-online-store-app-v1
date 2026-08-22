"use client";

import { AdminModuleHeader } from "@/modules/admin/components/header/AdminModuleHeader";
import { AdminDataTable } from "@/modules/admin/components/table/AdminDataTable";
import { COLUMNS_SELLERS } from "../constants/sellers.columns.table";
import { SELLERS_ROWS } from "../mocks/sellers.mock";

export const SellersPage = () => (
	<main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
		<AdminModuleHeader title="Vendedores" description="Comercios y sus operaciones en la plataforma." actionLabel="Nuevo vendedor" />
		<AdminDataTable columns={COLUMNS_SELLERS} data={SELLERS_ROWS} emptyMessage="No hay registros de vendedores." />
	</main>
);
