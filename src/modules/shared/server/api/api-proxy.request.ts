import type { NextRequest } from "next/server";
import { METHODS_WITHOUT_BODY } from "./api-proxy.constants";

export const getApiUpstreamUrl = (path: string[], request: NextRequest) => {
	const baseUrl = process.env.API_BASE_URL;

	if (!baseUrl) {
		throw new Error("API_BASE_URL no esta configurada.");
	}

	const upstreamUrl = new URL(
		`${baseUrl.replace(/\/$/, "")}/${path.join("/")}`,
	);
	upstreamUrl.search = request.nextUrl.search;

	return upstreamUrl;
};

export const getApiUpstreamHeaders = (
	request: NextRequest,
	accessToken?: string,
) => {
	const headers = new Headers({
		Accept: request.headers.get("accept") ?? "application/json",
	});
	const contentType = request.headers.get("content-type");

	if (contentType) {
		headers.set("Content-Type", contentType);
	}

	if (accessToken) {
		headers.set("Authorization", `Bearer ${accessToken}`);
	}

	return headers;
};

export const getApiRequestBody = async (request: NextRequest) => {
	if (METHODS_WITHOUT_BODY.has(request.method)) {
		return undefined;
	}

	const body = await request.arrayBuffer();

	return body.byteLength ? body : undefined;
};
