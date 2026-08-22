"use client";

import { AdminModuleHeader } from "@/modules/admin/components/header/AdminModuleHeader";
import { AdminDataTable } from "@/modules/admin/components/table/AdminDataTable";
import { COLUMNS_BRANDS } from "../constants/brands.columns.table";
import { BRANDS_ROWS } from "../mocks/brands.mock";

export const BrandsPage = () => (
	<main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
		<AdminModuleHeader title="Marcas" description="Marcas disponibles en el catalogo." actionLabel="Nueva marca" />
		<AdminDataTable columns={COLUMNS_BRANDS} data={BRANDS_ROWS} emptyMessage="No hay registros de marcas." />
	</main>
);
