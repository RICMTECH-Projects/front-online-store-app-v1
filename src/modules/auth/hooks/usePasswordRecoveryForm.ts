"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	type PasswordRecoveryFormValues,
	passwordRecoverySchema,
} from "@/modules/auth/schemas/password-recovery/password-recovery.schema";
import { RECOVERY_DEFAULT_VALUES } from "../constants/auth-form-defaults.constants";
import { recoveryPassword } from "../services/recovery-password.service";

export const usePasswordRecoveryForm = () => {
	const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

	const form = useForm<PasswordRecoveryFormValues>({
		defaultValues: RECOVERY_DEFAULT_VALUES,
		mode: "onBlur",
		resolver: zodResolver(passwordRecoverySchema),
	});

	const mutation = useMutation({
		mutationFn: recoveryPassword,
		meta: { silentError: true },
	});

	const handleSubmit = async (data: PasswordRecoveryFormValues) => {
		form.clearErrors("root");

		try {
			await mutation.mutateAsync(data);
			setSubmittedEmail(data.email);
		} catch {
			form.setError("root", {
				type: "server",
				message: "No pudimos registrar la solicitud. Inténtalo de nuevo.",
			});
		}
	};

	const retry = () => {
		setSubmittedEmail(null);
	};

	return {
		form,
		isPending: mutation.isPending,
		retry,
		submittedEmail,
		handleSubmit: form.handleSubmit(handleSubmit),
	};
};
