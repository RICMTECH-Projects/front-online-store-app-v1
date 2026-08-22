import httpClient from "@/modules/shared/providers/http";
import type { LoginUserRequest } from "../interfaces/login-user.interface";

export const loginUser = (
	body: LoginUserRequest,
): Promise<void> => {
	return httpClient("/auth/login", {
		method: "post",
		body,
	});
};
