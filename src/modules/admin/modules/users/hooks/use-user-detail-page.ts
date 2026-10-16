"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { useAuthStore, useLogout } from "@/modules/auth";
import { useAdminRoleList } from "../../roles";
import { useAdminSellerList } from "../../sellers";
import {
	sellerMembershipSchema as membershipSchema,
	userRoleSchema as roleSchema,
	useAdminUserDetail,
} from "../index";

export function useUserDetailPage(userId: number) {
	const currentUser = useAuthStore((state) => state.user);
	const logout = useLogout();
	const [feedback, setFeedback] = useState("");
	const {
		userQuery,
		membershipsQuery,
		replaceRolesMutation,
		assignMutation,
		deactivateMutation,
	} = useAdminUserDetail(userId);
	const rolesQuery = useAdminRoleList();
	const sellersQuery = useAdminSellerList();
	const rolesForm = useForm<{ roleCodes: string[] }>({
		resolver: zodResolver(roleSchema),
		defaultValues: { roleCodes: [] },
	});
	const membershipForm = useForm<
		z.input<typeof membershipSchema>,
		undefined,
		z.output<typeof membershipSchema>
	>({
		resolver: zodResolver(membershipSchema),
		defaultValues: { sellerId: 0, owner: false, active: true },
	});
	const user = userQuery.data;
	useEffect(() => {
		if (user) rolesForm.reset({ roleCodes: user.roles });
	}, [rolesForm, user]);
	const submitRoles = rolesForm.handleSubmit(async ({ roleCodes }) => {
		setFeedback("");
		try {
			await replaceRolesMutation.mutateAsync(roleCodes);
			setFeedback(
				"Roles actualizados. La cuenta afectada debe iniciar sesión nuevamente para renovar sus permisos.",
			);
			if (currentUser?.id === userId) logout();
		} catch {
			setFeedback("No se pudo reemplazar el conjunto de roles.");
		}
	});
	const submitMembership = membershipForm.handleSubmit(async (values) => {
		setFeedback("");
		const seller = sellersQuery.data?.find(
			(item) => item.id === values.sellerId,
		);
		if (seller?.status !== "ACTIVE" && values.active) {
			setFeedback(
				"Para una tienda inactiva, desmarca “Activo” antes de guardar la membresía.",
			);
			return;
		}
		if (
			values.owner &&
			!window.confirm(
				"Asignar propietario transfiere la propiedad activa de la tienda; el propietario anterior queda como miembro activo. ¿Continuar?",
			)
		)
			return;
		try {
			await assignMutation.mutateAsync(values);
			setFeedback(
				"Membresía guardada. Si se agregó el rol SELLER, el usuario debe volver a iniciar sesión.",
			);
			membershipForm.reset({ sellerId: 0, owner: false, active: true });
		} catch {
			setFeedback(
				"No se pudo asignar la tienda. Revisa la membresía y el estado del comercio.",
			);
		}
	});
	const deactivate = (sellerId: number, sellerName: string) => {
		if (!window.confirm(`¿Revocar acceso de ${user?.email} a “${sellerName}”?`))
			return;
		deactivateMutation.mutate(sellerId);
	};
	const roleOptions = (rolesQuery.data ?? []).map((role) => ({
		value: role.code,
		label: `${role.code} · ${role.name}`,
	}));
	const sellerOptions = (sellersQuery.data ?? []).map((seller) => ({
		value: String(seller.id),
		label: `${seller.legalName} · #${seller.id}${seller.status !== "ACTIVE" ? " (inactiva)" : ""}`,
	}));
	const membershipsWithSellers = (membershipsQuery.data ?? []).map(
		(membership) => ({
			membership,
			seller: sellersQuery.data?.find(
				(item) => item.id === membership.sellerId,
			),
		}),
	);

	return {
		roleOptions,
		sellerOptions,
		membershipsWithSellers,
		userQuery,
		membershipsQuery,
		replaceRolesMutation,
		assignMutation,
		deactivateMutation,
		rolesQuery,
		sellersQuery,
		rolesForm,
		membershipForm,
		user,
		feedback,
		submitRoles,
		submitMembership,
		deactivate,
	};
}
