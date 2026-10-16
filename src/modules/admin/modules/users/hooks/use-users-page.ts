"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type ChangeEvent, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore, useLogout } from "@/modules/auth";
import { createUserColumns } from "../columns/users.columns";
import {
	EMPTY_ADMIN_USERS,
	USER_FORM_DEFAULTS,
	type UserForm,
} from "../constants/user.constants";
import { type AdminUser, useAdminUsers } from "../index";
import { userSchema } from "../schemas/user.schema";

export function useUsersPage() {
	const currentUserId = useAuthStore((state) => state.user?.id);
	const logout = useLogout();
	const { usersQuery, rolesQuery, createMutation, updateMutation } =
		useAdminUsers();
	const [search, setSearch] = useState("");
	const [editing, setEditing] = useState<AdminUser | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [formError, setFormError] = useState("");
	const form = useForm<UserForm>({
		resolver: zodResolver(userSchema),
		defaultValues: USER_FORM_DEFAULTS,
	});
	const users = usersQuery.data ?? EMPTY_ADMIN_USERS;
	const filtered = useMemo(
		() =>
			users.filter((user) =>
				`${user.firstName} ${user.lastName} ${user.email} ${user.roles.join(" ")}`
					.toLowerCase()
					.includes(search.toLowerCase()),
			),
		[users, search],
	);
	const columns = createUserColumns(openEdit);
	const openCreate = () => {
		setEditing(null);
		setFormError("");
		form.reset(USER_FORM_DEFAULTS);
		setIsOpen(true);
	};
	function openEdit(user: AdminUser) {
		setEditing(user);
		setFormError("");
		form.reset({
			email: user.email,
			password: "",
			firstName: user.firstName,
			lastName: user.lastName,
			status: user.status === "INACTIVE" ? "INACTIVE" : "ACTIVE",
			roleCodes: user.roles,
		});
		setIsOpen(true);
	}
	const submit = form.handleSubmit(async (values) => {
		setFormError("");
		if (!editing && values.password.length === 0) {
			setFormError("Ingresa una contraseña inicial de al menos 8 caracteres.");
			return;
		}
		if (
			editing &&
			editing.status !== values.status &&
			values.status === "INACTIVE" &&
			!window.confirm(
				`Desactivar a ${editing.email}; perderá acceso a la cuenta. ¿Continuar?`,
			)
		)
			return;
		try {
			if (editing)
				await updateMutation.mutateAsync({
					id: editing.id,
					body: {
						firstName: values.firstName,
						lastName: values.lastName,
						status: values.status,
					},
				});
			else
				await createMutation.mutateAsync({
					email: values.email,
					password: values.password,
					firstName: values.firstName,
					lastName: values.lastName,
					status: values.status,
					roleCodes: values.roleCodes,
				});
			setIsOpen(false);
			if (editing?.id === currentUserId && values.status === "INACTIVE")
				logout();
		} catch {
			setFormError(
				"No se pudo guardar. Revisa correo duplicado, roles y datos requeridos.",
			);
		}
	});
	const _fieldError = (name: keyof UserForm) =>
		form.formState.errors[name]?.message as string | undefined;
	const roleOptions = (rolesQuery.data ?? []).map((role) => ({
		value: role.code,
		label: `${role.code} · ${role.name}`,
	}));
	const changeSearch = (event: ChangeEvent<HTMLInputElement>) =>
		setSearch(event.target.value);
	const close = () => setIsOpen(false);
	const retry = () => void usersQuery.refetch();

	return {
		roleOptions,
		changeSearch,
		close,
		retry,
		usersQuery,
		rolesQuery,
		createMutation,
		updateMutation,
		search,
		setSearch,
		editing,
		setEditing,
		isOpen,
		setIsOpen,
		formError,
		setFormError,
		form,
		users,
		filtered,
		columns,
		openCreate,
		submit,
	};
}
