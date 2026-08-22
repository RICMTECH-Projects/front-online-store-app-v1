import type { NextRequest } from "next/server";
import {
	getApiRequestBody,
	getApiUpstreamHeaders,
	getApiUpstreamUrl,
} from "./api-proxy.request";

type ForwardApiRequestParams = {
	accessToken?: string;
	path: string[];
	request: NextRequest;
};

export const forwardApiRequest = async ({
	accessToken,
	path,
	request,
}: ForwardApiRequestParams) =>
	fetch(getApiUpstreamUrl(path, request), {
		body: await getApiRequestBody(request),
		headers: getApiUpstreamHeaders(request, accessToken),
		method: request.method,
		cache: "no-store",
	});
