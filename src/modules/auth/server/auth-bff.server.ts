import "server-only";
import type { NextResponse } from "next/server";
import {
	clearAuthSession,
	getAuthAccessToken,
	persistAuthSession,
} from "./auth-session.server";

const LOGIN_ENDPOINT = "auth/login";

type LoginResponse = {
	accessToken?: string;
	expiresIn?: number;
	data?: LoginResponse;
};

const isLoginResponse = (payload: unknown): payload is LoginResponse =>
	typeof payload === "object" && payload !== null;

export const isLoginEndpoint = (endpoint: string) =>
	endpoint === LOGIN_ENDPOINT;

export const getApiAccessToken = async (endpoint: string) =>
	isLoginEndpoint(endpoint) ? undefined : getAuthAccessToken();

export const applyAuthBffResponse = (
	response: NextResponse,
	endpoint: string,
	payload: unknown,
	status: number,
) => {
	if (status === 401 && !isLoginEndpoint(endpoint)) {
		return clearAuthSession(response);
	}

	if (!isLoginEndpoint(endpoint) || !isLoginResponse(payload)) {
		return response;
	}

	const loginPayload = payload as LoginResponse;
	const tokenPayload = loginPayload.data ?? loginPayload;
	const accessToken = tokenPayload.accessToken;
	const expiresIn =
		typeof tokenPayload.expiresIn === "number" &&
		Number.isFinite(tokenPayload.expiresIn) &&
		tokenPayload.expiresIn > 0
			? tokenPayload.expiresIn
			: undefined;

	return accessToken
		? persistAuthSession(response, accessToken, expiresIn)
		: response;
};

export const sanitizeLoginPayload = (endpoint: string, payload: unknown) =>
	isLoginEndpoint(endpoint) && isLoginResponse(payload)
		? { data: null, message: "", status: "SUCCESS" }
		: payload;
