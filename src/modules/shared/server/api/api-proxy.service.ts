import "server-only";
import type { NextRequest } from "next/server";
import {
	getApiRequestBody,
	getApiUpstreamHeaders,
	getApiUpstreamUrl,
} from "./api-proxy.request";

type ForwardApiRequestParams = {
	accessToken?: string;
	correlationId?: string;
	path: string[];
	request: NextRequest;
	body?: BodyInit;
};

export const forwardApiRequest = async ({
	accessToken,
	correlationId,
	path,
	request,
	body,
}: ForwardApiRequestParams) =>
	fetch(getApiUpstreamUrl(path, request), {
		body: body ?? (await getApiRequestBody(request)),
		headers: getApiUpstreamHeaders(request, accessToken, correlationId),
		method: request.method,
		cache: "no-store",
	});
