"use client";

import { AdminModuleHeader } from "@/modules/admin/components/header/AdminModuleHeader";
import { AdminDataTable } from "@/modules/admin/components/table/AdminDataTable";
import { COLUMNS_USERS } from "../constants/users.columns.table";
import { USERS_ROWS } from "../mocks/users.mock";

export const UsersPage = () => (
	<main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
		<AdminModuleHeader title="Usuarios" description="Cuentas, roles y accesos administrativos." actionLabel="Nuevo usuario" />
		<AdminDataTable columns={COLUMNS_USERS} data={USERS_ROWS} emptyMessage="No hay registros de usuarios." />
	</main>
);
