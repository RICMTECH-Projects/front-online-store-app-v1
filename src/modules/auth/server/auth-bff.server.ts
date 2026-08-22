import type { NextResponse } from "next/server";
import { clearAuthSession, getAuthAccessToken, persistAuthSession } from "./auth-session.server";

const LOGIN_ENDPOINT = "auth/login";

type LoginResponse = {
	data?: {
		accessToken?: string;
		expiresIn?: number;
	};
};

const isLoginResponse = (payload: unknown): payload is LoginResponse =>
	typeof payload === "object" && payload !== null;

export const isLoginEndpoint = (endpoint: string) => endpoint === LOGIN_ENDPOINT;

export const getApiAccessToken = async (endpoint: string) =>
	isLoginEndpoint(endpoint) ? undefined : getAuthAccessToken();

export const applyAuthBffResponse = (
	response: NextResponse,
	endpoint: string,
	payload: unknown,
	status: number,
) => {
	if (status === 401) {
		return clearAuthSession(response);
	}

	if (!isLoginEndpoint(endpoint) || !isLoginResponse(payload)) {
		return response;
	}

	const accessToken = payload.data?.accessToken;

	return accessToken
		? persistAuthSession(response, accessToken, payload.data?.expiresIn)
		: response;
};

export const sanitizeLoginPayload = (endpoint: string, payload: unknown) =>
	isLoginEndpoint(endpoint) && isLoginResponse(payload)
		? { ...payload, data: null }
		: payload;
