"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
	type LoginFormValues,
	loginSchema,
} from "@/modules/auth/schemas/login/login.schema";
import { getCurrentUser } from "../services/get-current-user.service";
import { loginUser } from "../services/login-user.service";
import { useAuthStore } from "../store/useAuthStore";
import { getRoleHomeRoute } from "../utils/auth-authorization";

const DEFAULT_VALUES = {
	email: "",
	password: "",
};

export const useLoginForm = () => {
	const router = useRouter();
	const setUser = useAuthStore((state) => state.setUser);
	const form = useForm<LoginFormValues>({
		defaultValues: DEFAULT_VALUES,
		mode: "onBlur",
		resolver: zodResolver(loginSchema),
	});

	const { mutateAsync: loginUserMutate } = useMutation({
		mutationFn: loginUser,
	});
	const { mutateAsync: getCurrentUserMutate } = useMutation({
		mutationFn: getCurrentUser,
	});

	const handleSubmit = async (data: LoginFormValues) => {
		await loginUserMutate(data);
		const user = await getCurrentUserMutate();
		setUser(user);
		router.replace(getRoleHomeRoute(user.roles));
	};

	return {
		form,
		handleSubmit: form.handleSubmit(handleSubmit),
	};
};
