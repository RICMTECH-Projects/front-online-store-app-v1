import { type NextRequest, NextResponse } from "next/server";
import {
	applyAuthBffResponse,
	getApiAccessToken,
	sanitizeLoginPayload,
} from "@/modules/auth/server/auth-bff.server";
import {
	getApiCorrelationId,
	isCrossOriginMutation,
} from "@/modules/shared/server/api/api-proxy.request";
import {
	createApiErrorResponse,
	createApiSuccessPayload,
	createApiUnavailableResponse,
	createProxyResponse,
	isJsonResponse,
} from "@/modules/shared/server/api/api-proxy.response";
import { forwardApiRequest } from "@/modules/shared/server/api/api-proxy.service";

type ApiRouteContext = {
	params: Promise<{ path: string[] }>;
};

const proxyRequest = async (request: NextRequest, context: ApiRouteContext) => {
	const { path } = await context.params;
	const endpoint = path.join("/");
	const accessToken = await getApiAccessToken(endpoint);
	const correlationId = getApiCorrelationId(request);

	if (isCrossOriginMutation(request)) {
		return NextResponse.json(
			{
				data: null,
				message: "La solicitud debe originarse en este sitio.",
				status: "ERROR",
			},
			{
				headers: {
					"Cache-Control": "no-store",
					...(correlationId ? { "X-Correlation-ID": correlationId } : {}),
				},
				status: 403,
			},
		);
	}

	try {
		const upstreamResponse = await forwardApiRequest({
			accessToken,
			correlationId,
			path,
			request,
		});

		if (upstreamResponse.status === 204) {
			const response = createProxyResponse(upstreamResponse, correlationId);
			return applyAuthBffResponse(response, endpoint, null, 204);
		}

		if (!upstreamResponse.ok) {
			const response = await createApiErrorResponse(
				upstreamResponse,
				correlationId,
			);
			return applyAuthBffResponse(
				response,
				endpoint,
				null,
				upstreamResponse.status,
			);
		}

		if (!isJsonResponse(upstreamResponse)) {
			return applyAuthBffResponse(
				createProxyResponse(upstreamResponse, correlationId),
				endpoint,
				null,
				upstreamResponse.status,
			);
		}

		const payload: unknown = await upstreamResponse.json();
		const safePayload = sanitizeLoginPayload(endpoint, payload);
		const responseCorrelationId =
			upstreamResponse.headers.get("X-Correlation-ID") ?? correlationId;
		const location = upstreamResponse.headers.get("Location");
		const response = NextResponse.json(createApiSuccessPayload(safePayload), {
			headers: {
				"Cache-Control": "no-store",
				...(responseCorrelationId
					? { "X-Correlation-ID": responseCorrelationId }
					: {}),
				...(location ? { Location: location } : {}),
			},
			status: upstreamResponse.status,
		});

		return applyAuthBffResponse(
			response,
			endpoint,
			payload,
			upstreamResponse.status,
		);
	} catch {
		return createApiUnavailableResponse(correlationId);
	}
};

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
