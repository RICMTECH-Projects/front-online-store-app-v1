"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuthStore } from "@/modules/auth";
import { EMPTY_PROFILE } from "../constants/profile-form-defaults.constants";
import {
	type AdminProfileFormValues,
	adminProfileSchema,
} from "../schemas/admin-profile.schema";
import { updateAdminProfile } from "../services/update-admin-profile.service";

export const useAdminProfileForm = () => {
	const user = useAuthStore((state) => state.user);
	const setUser = useAuthStore((state) => state.setUser);
	const form = useForm<AdminProfileFormValues>({
		defaultValues: EMPTY_PROFILE,
		mode: "onBlur",
		resolver: zodResolver(adminProfileSchema),
	});

	useEffect(() => {
		if (user) {
			form.reset({ firstName: user.firstName, lastName: user.lastName });
		}
	}, [form, user]);

	const mutation = useMutation({
		mutationFn: (values: AdminProfileFormValues) => {
			if (!user) {
				throw new Error("No se encontro la sesion del administrador.");
			}

			return updateAdminProfile(user.id, {
				...values,
				status: user.status,
			});
		},
		onSuccess: (profile) => {
			if (!user) return;

			setUser({ ...user, ...profile });
			form.reset({
				firstName: profile.firstName,
				lastName: profile.lastName,
			});
			toast.success("Tu perfil se actualizo correctamente.");
		},
	});

	return {
		form,
		isPending: mutation.isPending,
		onSubmit: form.handleSubmit((values) => mutation.mutateAsync(values)),
		user,
	};
};
