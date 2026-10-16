import type {
	AxiosRequestConfig,
	AxiosResponseHeaders,
	RawAxiosResponseHeaders,
} from "axios";

export type HttpMethod = "delete" | "get" | "head" | "patch" | "post" | "put";

export type HttpExpectedType = "Blob" | "File";

export type BaseResponse<TData> = {
	data: TData;
	message: string;
	status: string;
};

export type HttpBlobResponse = {
	data: Blob;
	headers: AxiosResponseHeaders | RawAxiosResponseHeaders;
};

export type HttpClientOptions<TBody = unknown> = {
	baseURL?: string;
	body?: TBody;
	config?: Omit<AxiosRequestConfig, "baseURL" | "data" | "method" | "url">;
	expectedType?: HttpExpectedType;
	headers?: Record<string, string>;
	method?: HttpMethod;
};

export type HttpProviderOptions = {
	baseURL?: string;
	onServiceUnavailable?: (error: HttpError) => void;
	onUnauthorized?: (error: HttpError) => void;
	timeout?: number;
};

export class HttpError extends Error {
	readonly details: unknown;
	readonly status?: number;
	readonly type: string;
	readonly correlationId?: string;

	constructor({
		message,
		status,
		type,
		details,
		correlationId,
	}: {
		message: string;
		status?: number;
		type: string;
		details: unknown;
		correlationId?: string;
	}) {
		super(message);
		this.name = "HttpError";
		this.status = status;
		this.type = type;
		this.correlationId = correlationId;
		this.details = details;
	}
}
