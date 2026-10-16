"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
	type RegisterFormValues,
	registerSchema,
} from "@/modules/auth/schemas/register/register.schema";
import { HttpError } from "@/modules/shared/providers/http/http.interface";
import { AUTH_ROUTES } from "../constants/auth.const";
import { REGISTER_DEFAULT_VALUES } from "../constants/auth-form-defaults.constants";
import { registerUser } from "../services/register-user.service";

export const useRegisterForm = () => {
	const router = useRouter();
	const form = useForm<RegisterFormValues>({
		defaultValues: REGISTER_DEFAULT_VALUES,
		mode: "onBlur",
		resolver: zodResolver(registerSchema),
	});

	const mutation = useMutation({
		mutationFn: (values: RegisterFormValues) =>
			registerUser({
				email: values.email,
				password: values.password,
				firstName: values.firstName,
				lastName: values.lastName,
			}),
		meta: { silentError: true },
		onSuccess: () => {
			toast.success(
				"Tu cuenta se creó correctamente. Inicia sesión para continuar.",
			);
			router.replace(AUTH_ROUTES.login);
		},
	});

	const handleSubmit = async (data: RegisterFormValues) => {
		form.clearErrors("root");

		try {
			await mutation.mutateAsync(data);
		} catch (error) {
			if (error instanceof HttpError && error.status === 409) {
				form.setError("email", {
					type: "server",
					message: "Este correo ya está registrado.",
				});
				return;
			}

			form.setError("root", {
				type: "server",
				message:
					"No se pudo crear la cuenta. Revisa los datos e inténtalo de nuevo.",
			});
		}
	};

	return {
		form,
		isPending: mutation.isPending,
		handleSubmit: form.handleSubmit(handleSubmit),
	};
};
