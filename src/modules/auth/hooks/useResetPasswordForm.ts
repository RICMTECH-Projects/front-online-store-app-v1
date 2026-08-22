"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { ResetPasswordRequest } from "@/modules/auth/interfaces/reset-password.interface";
import {
	type ResetPasswordFormValues,
	resetPasswordSchema,
} from "@/modules/auth/schemas/reset-password/reset-password.schema";
import { resetPassword } from "../services/reset-password.service";

const DEFAULT_VALUES: ResetPasswordFormValues = {
	confirmPassword: "",
	password: "",
};

export const useResetPasswordForm = (token: string = "") => {
	const [isCompleted, setIsCompleted] = useState(false);
	const form = useForm<ResetPasswordFormValues>({
		defaultValues: DEFAULT_VALUES,
		mode: "onBlur",
		resolver: zodResolver(resetPasswordSchema),
	});

	const { mutateAsync: resetPasswordAsync, isPending } = useMutation({
		mutationFn: resetPassword,
		onSuccess: () => setIsCompleted(true),
	});

	const onSubmit = async (data: ResetPasswordFormValues) => {
		await resetPasswordAsync({
			...data,
			token,
		});
	};

	return {
		form,
		handleSubmit: form.handleSubmit(onSubmit),
		isCompleted,
		isPending,
	};
};
