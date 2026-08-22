import type { AuthUser } from "../interfaces/auth-user.interface";
import httpClient from "@/modules/shared/providers/http";

export const getCurrentUser = (): Promise<AuthUser> =>
	httpClient("/auth/me");
