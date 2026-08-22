import type { ResetPasswordRequest } from "@/modules/auth/interfaces/reset-password.interface";
import httpClient from "@/modules/shared/providers/http";

export const resetPassword = (body: ResetPasswordRequest): Promise<void> => {
	return httpClient("/auth/password-reset/confirm", {
		method: "post",
		body,
	});
};
