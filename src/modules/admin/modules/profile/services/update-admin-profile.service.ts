import httpClient from "@/modules/shared/providers/http";
import type {
	AdminProfileResponse,
	UpdateAdminProfileRequest,
} from "../interfaces/admin-profile.interface";

export const updateAdminProfile = (
	userId: number,
	body: UpdateAdminProfileRequest,
): Promise<AdminProfileResponse> =>
	httpClient(`/admin/users/${userId}`, {
		body,
		method: "put",
	});
