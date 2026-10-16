"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type ChangeEvent, useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { createCouponColumns } from "../columns/coupons.columns";
import {
	COUPON_FORM_DEFAULTS,
	EMPTY_ADMIN_COUPONS,
} from "../constants/coupon.constants";
import {
	type AdminCoupon,
	useAdminCouponReferences,
	useAdminCoupons,
} from "../index";
import {
	type CouponFormValues,
	type CouponParsedValues,
	couponSchema,
} from "../schemas/coupon.schema";

export function useCouponsPage() {
	const { couponsQuery, createMutation, activeMutation } = useAdminCoupons();
	const { categoriesQuery, productsQuery, usersQuery } =
		useAdminCouponReferences();
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const form = useForm<CouponFormValues, undefined, CouponParsedValues>({
		resolver: zodResolver(couponSchema),
		defaultValues: COUPON_FORM_DEFAULTS,
	});
	const rows = couponsQuery.data ?? EMPTY_ADMIN_COUPONS;
	const filtered = useMemo(
		() =>
			rows.filter((coupon) =>
				coupon.code.toLowerCase().includes(search.toLowerCase()),
			),
		[rows, search],
	);
	const submit = form.handleSubmit(async (parsed) => {
		setErrorMessage("");
		const body = {
			...parsed,
			startsAt: new Date(parsed.startsAt).toISOString(),
			endsAt: new Date(parsed.endsAt).toISOString(),
			active: true,
		};
		try {
			await createMutation.mutateAsync(body);
			setIsCreateOpen(false);
			form.reset(COUPON_FORM_DEFAULTS);
		} catch {
			setErrorMessage(
				"No se pudo crear el cupón. Revisa código único, fechas e IDs de segmentación.",
			);
		}
	});
	const setActive = useCallback(
		async (coupon: AdminCoupon) => {
			try {
				await activeMutation.mutateAsync({
					id: coupon.id,
					active: !coupon.active,
				});
			} catch {
				setErrorMessage("No se pudo actualizar la activación del cupón.");
			}
		},
		[activeMutation],
	);
	const columns = createCouponColumns(setActive, activeMutation.isPending);
	const changeSearch = (event: ChangeEvent<HTMLInputElement>) =>
		setSearch(event.target.value);
	const close = () => setIsCreateOpen(false);
	const retry = () => void couponsQuery.refetch();
	const productHint = `Activos: ${productsQuery.data?.map((item) => item.id).join(", ") || "cargando/no disponibles"}`;
	const categoryHint = `Disponibles: ${categoriesQuery.data?.map((item) => `${item.id} ${item.name}`).join(" · ") || "cargando"}`;
	const userHint = `Cuentas disponibles: ${usersQuery.data?.map((item) => `${item.id} ${item.email}`).join(" · ") || "cargando"}`;
	const openCreate = () => {
		setErrorMessage("");
		setIsCreateOpen(true);
		form.reset(COUPON_FORM_DEFAULTS);
	};

	return {
		changeSearch,
		close,
		retry,
		productHint,
		categoryHint,
		userHint,
		openCreate,
		couponsQuery,
		createMutation,
		activeMutation,
		categoriesQuery,
		productsQuery,
		usersQuery,
		isCreateOpen,
		setIsCreateOpen,
		search,
		setSearch,
		errorMessage,
		setErrorMessage,
		form,
		rows,
		filtered,
		submit,
		columns,
	};
}
