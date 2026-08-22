"use client";

import { AdminModuleHeader } from "@/modules/admin/components/header/AdminModuleHeader";
import { AdminDataTable } from "@/modules/admin/components/table/AdminDataTable";
import { COLUMNS_CATEGORIES } from "../constants/categories.columns.table";
import { CATEGORIES_ROWS } from "../mocks/categories.mock";

export const CategoriesPage = () => (
	<main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
		<AdminModuleHeader
			title="Categorias"
			description="Jerarquia y clasificacion del catalogo."
			actionLabel="Nueva categoria"
		/>
		<AdminDataTable
			columns={COLUMNS_CATEGORIES}
			data={CATEGORIES_ROWS}
			emptyMessage="No hay registros de categorias."
		/>
	</main>
);
