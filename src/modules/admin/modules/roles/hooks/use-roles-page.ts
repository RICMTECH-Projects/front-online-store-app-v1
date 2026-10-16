"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type ChangeEvent, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useAdminUserList } from "../../users";
import { createRoleColumns } from "../columns/roles.columns";
import { SYSTEM_ROLE_CODES } from "../constants/role.constants";
import {
	type AdminRole,
	renameRoleSchema,
	roleSchema,
	useAdminRoleDetail,
	useAdminRoles,
} from "../index";

export function useRolesPage() {
	const { rolesQuery, createMutation, renameMutation, deleteMutation } =
		useAdminRoles();
	const usersQuery = useAdminUserList();
	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState<AdminRole | null>(null);
	const [dialogMode, setDialogMode] = useState<"create" | "rename" | null>(
		null,
	);
	const [formError, setFormError] = useState("");
	const form = useForm<{ code: string; name: string }>({
		resolver: zodResolver(roleSchema),
		defaultValues: { code: "", name: "" },
	});
	const renameForm = useForm<{ name: string }>({
		resolver: zodResolver(renameRoleSchema),
		defaultValues: { name: "" },
	});
	const detailQuery = useAdminRoleDetail(selected?.id);
	const filtered = useMemo(
		() =>
			(rolesQuery.data ?? []).filter((role) =>
				`${role.code} ${role.name}`
					.toLowerCase()
					.includes(search.toLowerCase()),
			),
		[rolesQuery.data, search],
	);
	const userCount = (code: string) =>
		usersQuery.data?.filter((user) => user.roles.includes(code)).length;
	const submitCreate = form.handleSubmit(async (values) => {
		setFormError("");
		try {
			await createMutation.mutateAsync({
				code: values.code.toUpperCase(),
				name: values.name,
			});
			setDialogMode(null);
			form.reset();
		} catch {
			setFormError("No se pudo crear el rol. El código podría existir ya.");
		}
	});
	const submitRename = renameForm.handleSubmit(async (values) => {
		if (!selected) return;
		setFormError("");
		try {
			await renameMutation.mutateAsync({ id: selected.id, name: values.name });
			setDialogMode(null);
			setSelected(null);
		} catch {
			setFormError("No se pudo cambiar el nombre del rol.");
		}
	});
	const remove = async (role: AdminRole) => {
		if (SYSTEM_ROLE_CODES.has(role.code)) return;
		if (
			!window.confirm(
				`¿Eliminar rol “${role.code}”? Solo puede borrarse si ningún usuario lo tiene asignado.`,
			)
		)
			return;
		try {
			await deleteMutation.mutateAsync(role.id);
		} catch {
			setFormError(
				"No se pudo eliminar. El rol puede estar asignado a usuarios.",
			);
		}
	};
	const columns = createRoleColumns({
		userCount: (code) =>
			usersQuery.data?.filter((user) => user.roles.includes(code)).length,
		pending: deleteMutation.isPending,
		onView: setSelected,
		onRename: (role) => {
			setSelected(role);
			renameForm.reset({ name: role.name });
			setFormError("");
			setDialogMode("rename");
		},
		onDelete: (role) => void remove(role),
	});
	const openCreate = () => {
		setFormError("");
		form.reset();
		setDialogMode("create");
	};
	const closeDetail = () => setSelected(null);
	const closeDialog = () => setDialogMode(null);
	const closeRename = () => {
		setDialogMode(null);
		setSelected(null);
	};
	const changeSearch = (event: ChangeEvent<HTMLInputElement>) =>
		setSearch(event.target.value);
	const retry = () => void rolesQuery.refetch();

	return {
		openCreate,
		closeDetail,
		closeDialog,
		closeRename,
		changeSearch,
		retry,
		rolesQuery,
		createMutation,
		renameMutation,
		deleteMutation,
		usersQuery,
		search,
		setSearch,
		selected,
		setSelected,
		dialogMode,
		setDialogMode,
		formError,
		setFormError,
		form,
		renameForm,
		detailQuery,
		filtered,
		userCount,
		submitCreate,
		submitRename,
		columns,
	};
}
