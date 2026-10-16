"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuthStore, useLogout } from "@/modules/auth";
import { userFullName, userInitial } from "@/modules/shared/utils/user-display";
import { useCustomerProfile } from "../../customer/hooks/use-customer-commerce";
import { EMPTY_PROFILE } from "../constants/profile-form.constants";
import {
	type CustomerProfileFormValues,
	customerProfileSchema,
} from "../schemas/customer-profile.schema";
import { updateCustomerProfile } from "../services/update-customer-profile.service";

export const useCustomerProfileForm = () => {
	const logout = useLogout();
	const user = useAuthStore((state) => state.user);
	const setUser = useAuthStore((state) => state.setUser);
	const queryClient = useQueryClient();
	const customerProfile = useCustomerProfile();
	const form = useForm<CustomerProfileFormValues>({
		defaultValues: EMPTY_PROFILE,
		mode: "onBlur",
		resolver: zodResolver(customerProfileSchema),
	});

	useEffect(() => {
		if (!customerProfile.data) return;
		form.reset({
			firstName: customerProfile.data.firstName,
			lastName: customerProfile.data.lastName,
		});
		if (
			user &&
			(user.firstName !== customerProfile.data.firstName ||
				user.lastName !== customerProfile.data.lastName ||
				user.status !== customerProfile.data.status)
		) {
			setUser({
				...user,
				firstName: customerProfile.data.firstName,
				lastName: customerProfile.data.lastName,
				status: customerProfile.data.status,
			});
		}
	}, [customerProfile.data, form, setUser, user]);

	const mutation = useMutation({
		mutationFn: updateCustomerProfile,
		onSuccess: (profile) => {
			if (!user) return;

			setUser({ ...user, ...profile });
			form.reset({
				firstName: profile.firstName,
				lastName: profile.lastName,
			});
			void queryClient.invalidateQueries({ queryKey: ["customer", "profile"] });
			toast.success("Tus datos se actualizaron correctamente.");
		},
	});

	const displayUser = user
		? { ...user, ...(customerProfile.data ?? {}) }
		: null;
	return {
		logout,
		initial: displayUser
			? userInitial(displayUser.firstName || displayUser.email)
			: "",
		fullName: displayUser
			? userFullName(displayUser.firstName, displayUser.lastName)
			: "",
		form,
		isPending: mutation.isPending || customerProfile.isPending,
		onSubmit: form.handleSubmit((values) => mutation.mutateAsync(values)),
		user: displayUser,
	};
};
