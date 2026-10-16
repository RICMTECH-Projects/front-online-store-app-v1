"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { HttpError } from "@/modules/shared/providers/http/http.interface";
import { CHANGE_PASSWORD_DEFAULT_VALUES } from "../constants/auth-form-defaults.constants";
import {
	type ChangePasswordFormValues,
	changePasswordSchema,
} from "../schemas/change-password/change-password.schema";
import { changePassword } from "../services/change-password.service";

export const useChangePasswordForm = () => {
	const form = useForm<ChangePasswordFormValues>({
		defaultValues: CHANGE_PASSWORD_DEFAULT_VALUES,
		mode: "onBlur",
		resolver: zodResolver(changePasswordSchema),
	});

	const mutation = useMutation({
		mutationFn: changePassword,
		meta: { silentError: true },
		onSuccess: () => {
			form.reset(CHANGE_PASSWORD_DEFAULT_VALUES);
			toast.success("Tu contraseña se actualizó correctamente.");
		},
	});

	const onSubmit = form.handleSubmit(async (values) => {
		form.clearErrors("root");

		try {
			await mutation.mutateAsync({
				currentPassword: values.currentPassword,
				newPassword: values.newPassword,
			});
		} catch (error) {
			form.setError("root", {
				type: "server",
				message:
					error instanceof HttpError && error.status === 403
						? "Tu cuenta no tiene permiso para cambiar la contraseña desde aquí."
						: "No se pudo cambiar la contraseña. Verifica la contraseña actual y vuelve a intentarlo.",
			});
		}
	});

	return { form, isPending: mutation.isPending, onSubmit };
};
