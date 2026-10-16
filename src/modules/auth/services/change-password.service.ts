import httpClient from "@/modules/shared/providers/http";
import type { ChangePasswordRequest } from "../interfaces/change-password.interface";

export const changePassword = (body: ChangePasswordRequest): Promise<void> =>
	httpClient("/auth/password/change", {
		method: "post",
		body,
	});
