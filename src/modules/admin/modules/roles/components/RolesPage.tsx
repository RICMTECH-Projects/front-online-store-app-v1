"use client";

import { AdminModuleHeader } from "@/modules/admin/components/header/AdminModuleHeader";
import { AdminDataTable } from "@/modules/admin/components/table/AdminDataTable";
import { COLUMNS_ROLES } from "../constants/roles.columns.table";
import { ROLES_ROWS } from "../mocks/roles.mock";

export const RolesPage = () => (
	<main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
		<AdminModuleHeader title="Roles" description="Permisos y responsabilidades del sistema." actionLabel="Nuevo rol" />
		<AdminDataTable columns={COLUMNS_ROLES} data={ROLES_ROWS} emptyMessage="No hay registros de roles." />
	</main>
);
