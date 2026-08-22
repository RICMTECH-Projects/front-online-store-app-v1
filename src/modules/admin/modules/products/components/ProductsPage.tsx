"use client";

import { AdminModuleHeader } from "@/modules/admin/components/header/AdminModuleHeader";
import { AdminDataTable } from "@/modules/admin/components/table/AdminDataTable";
import { COLUMNS_PRODUCTS } from "../constants/products.columns.table";
import { PRODUCTS_ROWS } from "../mocks/products.mock";

export const ProductsPage = () => (
	<main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
		<AdminModuleHeader title="Productos" description="Catalogo, inventario y estado comercial." actionLabel="Nuevo producto" />
		<AdminDataTable columns={COLUMNS_PRODUCTS} data={PRODUCTS_ROWS} emptyMessage="No hay registros de productos." />
	</main>
);
