import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
	type LoginFormValues,
	loginSchema,
} from "@/modules/auth/schemas/login/login.schema";
import { getCurrentUser } from "../services/get-current-user.service";
import { loginUser } from "../services/login-user.service";
import { useAuthStore } from "../store/useAuthStore";

const DEFAULT_VALUES = {
	email: "",
	password: "",
};

export const useLoginForm = () => {
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
		setUser(await getCurrentUserMutate());
	};

	return {
		form,
		handleSubmit: form.handleSubmit(handleSubmit),
	};
};
