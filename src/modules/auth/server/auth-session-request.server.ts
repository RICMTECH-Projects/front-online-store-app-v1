import type { NextRequest } from "next/server";
import { AUTH_TOKEN_COOKIE } from "../constants/auth-cookie.constants";
import type { AuthUser } from "../interfaces/auth-user.interface";

export const hasAuthSession = (request: NextRequest) =>
	request.cookies.has(AUTH_TOKEN_COOKIE);

export const getRequestAuthUser = async (request: NextRequest) => {
	const accessToken = request.cookies.get(AUTH_TOKEN_COOKIE)?.value;
	const baseUrl = process.env.API_BASE_URL;

	if (!accessToken || !baseUrl) {
		return null;
	}

	try {
		const response = await fetch(`${baseUrl.replace(/\/$/, "")}/auth/me`, {
			headers: { Authorization: `Bearer ${accessToken}` },
			cache: "no-store",
		});

		if (!response.ok) {
			return null;
		}

		const payload = (await response.json()) as { data?: AuthUser };

		return payload.data ?? null;
	} catch {
		return null;
	}
};
