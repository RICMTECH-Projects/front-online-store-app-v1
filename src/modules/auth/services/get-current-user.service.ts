import httpClient from "@/modules/shared/providers/http";
import type { AuthUser } from "../interfaces/auth-user.interface";

export const getCurrentUser = (): Promise<AuthUser> => httpClient("/auth/me");
