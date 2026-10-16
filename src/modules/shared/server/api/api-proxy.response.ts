import "server-only";
import { NextResponse } from "next/server";

const DEFAULT_ERROR_MESSAGE = "No se pudo procesar la solicitud.";

const getResponseHeaders = (response: Response, correlationId?: string) => {
	const headers = new Headers({ "Cache-Control": "no-store" });
	const contentType = response.headers.get("content-type");
	const location = response.headers.get("location");
	const responseCorrelationId = response.headers.get("X-Correlation-ID");

	if (contentType) headers.set("Content-Type", contentType);
	if (location) headers.set("Location", location);
	const requestCorrelationId = responseCorrelationId ?? correlationId;
	if (requestCorrelationId)
		headers.set("X-Correlation-ID", requestCorrelationId);

	return headers;
};

const getMessage = (payload: unknown): string | undefined => {
	if (typeof payload === "string" && payload.trim()) return payload.trim();
	if (!payload || typeof payload !== "object") return undefined;

	const record = payload as Record<string, unknown>;
	for (const key of ["message", "detail", "error", "title"]) {
		if (typeof record[key] === "string" && record[key].trim()) {
			return record[key].trim();
		}
	}

	return undefined;
};

export const createApiSuccessPayload = (payload: unknown) => {
	if (
		payload &&
		typeof payload === "object" &&
		"data" in payload &&
		"status" in payload
	) {
		const envelope = payload as { data: unknown; message?: unknown };
		return {
			data: envelope.data,
			message: typeof envelope.message === "string" ? envelope.message : "",
			status: "SUCCESS",
		};
	}

	return { data: payload, message: "", status: "SUCCESS" };
};

export const createApiUnavailableResponse = (correlationId?: string) =>
	NextResponse.json(
		{
			data: null,
			message: "No se pudo conectar con el servicio.",
			status: "ERROR",
		},
		{
			headers: {
				"Cache-Control": "no-store",
				...(correlationId ? { "X-Correlation-ID": correlationId } : {}),
			},
			status: 503,
		},
	);

export const isJsonResponse = (response: Response) =>
	/\/(?:[^;]+\+)?json(?:\s*;|$)/i.test(
		response.headers.get("content-type") ?? "",
	);

export const createProxyResponse = (
	response: Response,
	correlationId?: string,
) =>
	new NextResponse(response.body, {
		headers: getResponseHeaders(response, correlationId),
		status: response.status,
	});

export const createApiErrorResponse = async (
	response: Response,
	correlationId?: string,
) => {
	const contentType = response.headers.get("content-type") ?? "";
	const rawBody = await response.text();
	let details: unknown = rawBody || null;

	if (/\/(?:[^;]+\+)?json(?:\s*;|$)/i.test(contentType) && rawBody) {
		try {
			details = JSON.parse(rawBody);
		} catch {
			details = rawBody;
		}
	}

	const headers = getResponseHeaders(response, correlationId);
	headers.set("Content-Type", "application/json; charset=utf-8");

	return NextResponse.json(
		{
			data: null,
			message: getMessage(details) ?? DEFAULT_ERROR_MESSAGE,
			status: "ERROR",
			details,
		},
		{ headers, status: response.status },
	);
};
