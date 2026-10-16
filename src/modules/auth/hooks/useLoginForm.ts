"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
	type LoginFormValues,
	loginSchema,
} from "@/modules/auth/schemas/login/login.schema";
import { useCartStore } from "@/modules/public/modules/cart/store";
import { HttpError } from "@/modules/shared/providers/http/http.interface";
import { LOGIN_DEFAULT_VALUES } from "../constants/auth-form-defaults.constants";
import { getCurrentUser } from "../services/get-current-user.service";
import { loginUser } from "../services/login-user.service";
import { useAuthStore } from "../store/useAuthStore";
import { getRoleHomeRoute } from "../utils/auth-authorization";

export const useLoginForm = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const setUser = useAuthStore((state) => state.setUser);
	const form = useForm<LoginFormValues>({
		defaultValues: LOGIN_DEFAULT_VALUES,
		mode: "onBlur",
		resolver: zodResolver(loginSchema),
	});

	const loginMutation = useMutation({
		mutationFn: loginUser,
		meta: { silentError: true },
	});
	const currentUserMutation = useMutation({
		mutationFn: getCurrentUser,
		meta: { silentError: true },
	});

	const handleSubmit = async (data: LoginFormValues) => {
		form.clearErrors("root");

		try {
			await loginMutation.mutateAsync(data);
			const user = await currentUserMutation.mutateAsync();
			setUser(user);
			useCartStore.getState().useUserContext(user.id);
			queryClient.setQueryData(["auth", "me"], user);
			router.replace(getRoleHomeRoute(user.roles));
		} catch (error) {
			form.setError("root", {
				type: "server",
				message:
					error instanceof HttpError && error.status === 401
						? "El correo o la contraseña no son correctos."
						: "No se pudo iniciar sesión. Inténtalo de nuevo.",
			});
		}
	};

	return {
		form,
		isPending: loginMutation.isPending || currentUserMutation.isPending,
		handleSubmit: form.handleSubmit(handleSubmit),
	};
};
