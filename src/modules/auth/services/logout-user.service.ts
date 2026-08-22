import httpClient from "@/modules/shared/providers/http";

export const logoutUser = (): Promise<void> =>
	httpClient("/auth/logout", { method: "post" });
