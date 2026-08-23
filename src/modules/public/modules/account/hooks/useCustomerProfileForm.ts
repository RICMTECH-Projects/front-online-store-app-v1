"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuthStore } from "@/modules/auth/store/useAuthStore";
import {
	type CustomerProfileFormValues,
	customerProfileSchema,
} from "../schemas/customer-profile.schema";
import { updateCustomerProfile } from "../services/update-customer-profile.service";

const EMPTY_PROFILE = {
	firstName: "",
	lastName: "",
};

export const useCustomerProfileForm = () => {
	const user = useAuthStore((state) => state.user);
	const setUser = useAuthStore((state) => state.setUser);
	const form = useForm<CustomerProfileFormValues>({
		defaultValues: EMPTY_PROFILE,
		mode: "onBlur",
		resolver: zodResolver(customerProfileSchema),
	});

	useEffect(() => {
		if (user) {
			form.reset({ firstName: user.firstName, lastName: user.lastName });
		}
	}, [form, user]);

	const mutation = useMutation({
		mutationFn: updateCustomerProfile,
		onSuccess: (profile) => {
			if (!user) return;

			setUser({ ...user, ...profile });
			form.reset({
				firstName: profile.firstName,
				lastName: profile.lastName,
			});
			toast.success("Tus datos se actualizaron correctamente.");
		},
	});

	return {
		form,
		isPending: mutation.isPending,
		onSubmit: form.handleSubmit((values) => mutation.mutateAsync(values)),
		user,
	};
};
