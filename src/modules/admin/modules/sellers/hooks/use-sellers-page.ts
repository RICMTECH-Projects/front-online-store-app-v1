"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type ChangeEvent, useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useAdminUserList } from "../../users";
import { createSellerColumns } from "../columns/sellers.columns";
import {
	EMPTY_ADMIN_SELLERS,
	SELLER_FORM_DEFAULTS,
	type SellerForm,
} from "../constants/seller.constants";
import {
	type AdminSeller,
	sellerSchema,
	useAdminSellerDetail,
	useAdminSellerMembers,
	useAdminSellers,
} from "../index";

export function useSellersPage() {
	const { sellersQuery, createMutation, updateMutation, deactivateMutation } =
		useAdminSellers();
	const [search, setSearch] = useState("");
	const [editing, setEditing] = useState<AdminSeller | null>(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [teamSeller, setTeamSeller] = useState<AdminSeller | null>(null);
	const [errorMessage, setErrorMessage] = useState("");
	const form = useForm<SellerForm>({
		resolver: zodResolver(sellerSchema),
		defaultValues: SELLER_FORM_DEFAULTS,
	});
	const rows = sellersQuery.data ?? EMPTY_ADMIN_SELLERS;
	const filtered = useMemo(
		() =>
			rows.filter((seller) =>
				`${seller.legalName} ${seller.taxId} ${seller.email}`
					.toLowerCase()
					.includes(search.toLowerCase()),
			),
		[rows, search],
	);
	const detailQuery = useAdminSellerDetail(teamSeller?.id);
	const membersQuery = useAdminSellerMembers(teamSeller?.id);
	const usersQuery = useAdminUserList();

	const startCreate = () => {
		setEditing(null);
		setErrorMessage("");
		setDialogOpen(true);
		form.reset(SELLER_FORM_DEFAULTS);
	};
	const startEdit = useCallback(
		(seller: AdminSeller) => {
			setEditing(seller);
			setErrorMessage("");
			setDialogOpen(true);
			form.reset({
				legalName: seller.legalName,
				taxId: seller.taxId,
				email: seller.email,
				status: seller.status === "INACTIVE" ? "INACTIVE" : "ACTIVE",
			});
		},
		[form],
	);
	const submit = form.handleSubmit(async (values) => {
		setErrorMessage("");
		try {
			if (editing)
				await updateMutation.mutateAsync({
					id: editing.id,
					body: { ...values, status: editing.status },
				});
			else await createMutation.mutateAsync(values);
			setDialogOpen(false);
		} catch {
			setErrorMessage(
				"No se pudo guardar. Comprueba si el identificador o correo ya están registrados.",
			);
		}
	});
	const deactivate = useCallback(
		async (seller: AdminSeller) => {
			if (
				!window.confirm(
					`¿Desactivar “${seller.legalName}”? Sus referencias se conservarán.`,
				)
			)
				return;
			try {
				await deactivateMutation.mutateAsync(seller.id);
			} catch {
				setErrorMessage("No se pudo desactivar el comercio.");
			}
		},
		[deactivateMutation],
	);
	const columns = createSellerColumns({
		onView: setTeamSeller,
		onEdit: startEdit,
		onDeactivate: (seller) => void deactivate(seller),
	});
	const changeSearch = (event: ChangeEvent<HTMLInputElement>) =>
		setSearch(event.target.value);
	const closeDialog = () => setDialogOpen(false);
	const closeTeam = () => setTeamSeller(null);
	const retry = () => void sellersQuery.refetch();
	const teamMembers = (membersQuery.data ?? []).map((membership) => ({
		membership,
		user: usersQuery.data?.find((item) => item.id === membership.userId),
	}));

	return {
		changeSearch,
		closeDialog,
		closeTeam,
		retry,
		teamMembers,
		sellersQuery,
		createMutation,
		updateMutation,
		deactivateMutation,
		search,
		setSearch,
		editing,
		setEditing,
		dialogOpen,
		setDialogOpen,
		teamSeller,
		setTeamSeller,
		errorMessage,
		setErrorMessage,
		form,
		rows,
		filtered,
		detailQuery,
		membersQuery,
		usersQuery,
		startCreate,
		columns,
		submit,
	};
}
