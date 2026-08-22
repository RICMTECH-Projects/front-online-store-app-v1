"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	type PasswordRecoveryFormValues,
	passwordRecoverySchema,
} from "@/modules/auth/schemas/password-recovery/password-recovery.schema";
import { recoveryPassword } from "../services/recovery-password.service";

const DEFAULT_VALUES = {
	email: "",
};

export const usePasswordRecoveryForm = () => {
	const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

	const form = useForm<PasswordRecoveryFormValues>({
		defaultValues: DEFAULT_VALUES,
		mode: "onBlur",
		resolver: zodResolver(passwordRecoverySchema),
	});

	const { mutateAsync: recoveryPasswordAsync } = useMutation({
		mutationFn: recoveryPassword,
	});

	const handleSubmit = async (data: PasswordRecoveryFormValues) => {
		await recoveryPasswordAsync(data);
		setSubmittedEmail(data.email);
	};

	const retry = () => {
		setSubmittedEmail(null);
	};

	return {
		form,
		retry,
		submittedEmail,
		handleSubmit: form.handleSubmit(handleSubmit),
	};
};
