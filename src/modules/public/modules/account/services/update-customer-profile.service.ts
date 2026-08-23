import httpClient from "@/modules/shared/providers/http";
import type {
	CustomerProfileResponse,
	UpdateCustomerProfileRequest,
} from "../interfaces/customer-profile.interface";

export const updateCustomerProfile = (
	body: UpdateCustomerProfileRequest,
): Promise<CustomerProfileResponse> =>
	httpClient("/customers/me", {
		body,
		method: "put",
	});
