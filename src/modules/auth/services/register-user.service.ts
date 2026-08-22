import httpClient from "@/modules/shared/providers/http";
import type { RegisterUserRequest } from "../interfaces/register-user.interface";

export const registerUser = (body: RegisterUserRequest): Promise<void> => {
	return httpClient("/auth/register", {
		method: "post",
		body,
	});
};
