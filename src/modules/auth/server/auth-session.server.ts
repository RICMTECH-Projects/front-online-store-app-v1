import { cookies } from "next/headers";
import type { NextResponse } from "next/server";
import { AUTH_TOKEN_COOKIE } from "../constants/auth-cookie.constants";

export const getAuthAccessToken = async () =>
	(await cookies()).get(AUTH_TOKEN_COOKIE)?.value;

export const clearAuthSession = (response: NextResponse) => {
	response.cookies.delete(AUTH_TOKEN_COOKIE);
	return response;
};

export const persistAuthSession = (
	response: NextResponse,
	token: string,
	expiresIn?: number,
) => {
	response.cookies.set(AUTH_TOKEN_COOKIE, token, {
		httpOnly: true,
		maxAge: typeof expiresIn === "number" ? expiresIn : undefined,
		path: "/",
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
	});

	return response;
};
