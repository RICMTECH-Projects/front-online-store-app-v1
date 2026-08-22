"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
	type RegisterFormValues,
	registerSchema,
} from "@/modules/auth/schemas/register/register.schema";
import { registerUser } from "../services/register-user.service";

const DEFAULT_VALUES = {
	confirmPassword: "",
	email: "",
	firstName: "",
	lastName: "",
	password: "",
};

export const useRegisterForm = () => {
	const form = useForm<RegisterFormValues>({
		defaultValues: DEFAULT_VALUES,
		mode: "onBlur",
		resolver: zodResolver(registerSchema),
	});

	const { mutateAsync: registerUserMutation } = useMutation({
		mutationFn: registerUser,
	});

	const handleSubmit = async (data: RegisterFormValues) => {
		await registerUserMutation(data);
	};

	return {
		form,
		handleSubmit: form.handleSubmit(handleSubmit),
	};
};
