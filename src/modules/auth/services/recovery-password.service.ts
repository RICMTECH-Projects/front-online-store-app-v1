import httpClient from "@/modules/shared/providers/http";
import type { RecoveryPasswordRequest } from "../interfaces/recovery-password.interface";

export const recoveryPassword = async (
	body: RecoveryPasswordRequest,
): Promise<void> => {
	return httpClient("/auth/password-reset/request", {
		method: "post",
		body,
	});
};
