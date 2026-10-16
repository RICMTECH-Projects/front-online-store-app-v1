import "server-only";
import type { NextRequest } from "next/server";
import { AUTH_TOKEN_COOKIE } from "../constants/auth-cookie.constants";
import type { AuthUser } from "../interfaces/auth-user.interface";

export const hasAuthSession = (request: NextRequest) =>
	request.cookies.has(AUTH_TOKEN_COOKIE);

export const getRequestAuthUser = async (request: NextRequest) => {
	const accessToken = request.cookies.get(AUTH_TOKEN_COOKIE)?.value;
	const baseUrl = process.env.API_BASE_URL;

	if (!accessToken) return null;
	if (!baseUrl) return undefined;

	try {
		const response = await fetch(`${baseUrl.replace(/\/$/, "")}/auth/me`, {
			headers: { Authorization: `Bearer ${accessToken}` },
			cache: "no-store",
		});

		if (!response.ok) {
			return response.status === 401 || response.status === 404
				? null
				: undefined;
		}

		const payload: unknown = await response.json();
		if (isAuthUser(payload)) return payload;

		if (
			typeof payload === "object" &&
			payload !== null &&
			"data" in payload &&
			isAuthUser(payload.data)
		) {
			return payload.data;
		}

		return undefined;
	} catch {
		return undefined;
	}
};

const isAuthUser = (value: unknown): value is AuthUser => {
	if (!value || typeof value !== "object") return false;
	const user = value as Partial<AuthUser>;

	return (
		typeof user.id === "number" &&
		typeof user.email === "string" &&
		typeof user.firstName === "string" &&
		typeof user.lastName === "string" &&
		typeof user.status === "string" &&
		Array.isArray(user.roles) &&
		user.roles.every((role) => typeof role === "string")
	);
};
