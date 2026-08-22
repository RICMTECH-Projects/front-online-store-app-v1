import { type NextRequest, NextResponse } from "next/server";
import {
	applyAuthBffResponse,
	getApiAccessToken,
	sanitizeLoginPayload,
} from "@/modules/auth/server/auth-bff.server";
import {
	createApiUnavailableResponse,
	createBinaryProxyResponse,
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

	try {
		const upstreamResponse = await forwardApiRequest({
			accessToken,
			path,
			request,
		});

		if (!isJsonResponse(upstreamResponse)) {
			return applyAuthBffResponse(
				createBinaryProxyResponse(upstreamResponse),
				endpoint,
				null,
				upstreamResponse.status,
			);
		}

		const payload: unknown = await upstreamResponse.json();
		const response = NextResponse.json(sanitizeLoginPayload(endpoint, payload), {
			status: upstreamResponse.status,
		});

		return applyAuthBffResponse(
			response,
			endpoint,
			payload,
			upstreamResponse.status,
		);
	} catch {
		return createApiUnavailableResponse();
	}
};

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
