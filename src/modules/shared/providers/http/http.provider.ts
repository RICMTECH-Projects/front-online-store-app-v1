import axios, {
	type AxiosInstance,
	type AxiosRequestConfig,
	type AxiosResponse,
	type ResponseType,
} from "axios";
import { AUTH_SESSION_EXPIRED_EVENT } from "../../constants/app-events.constants";
import type {
	BaseResponse,
	HttpBlobResponse,
	HttpClientOptions,
	HttpExpectedType,
	HttpProviderOptions,
} from "./http.interface";
import {
	createResponseErrorInterceptor,
	handleSuccessfulResponse,
} from "./interceptors/response.interceptor";

const DEFAULT_TIMEOUT = 30_000;

const getResponseConfig = (expectedType?: HttpExpectedType) => {
	if (expectedType === "Blob" || expectedType === "File") {
		return {
			accept: "application/octet-stream",
			responseType: "blob" as ResponseType,
		};
	}

	return {
		accept:
			"application/json, text/plain, application/x-www-form-urlencoded, */*",
		responseType: "json" as ResponseType,
	};
};

export class HttpProvider {
	private readonly instances = new Map<string, AxiosInstance>();

	constructor(private readonly options: HttpProviderOptions = {}) {}

	async request<TResponse = unknown, TBody = unknown>(
		endpoint: string,
		options: HttpClientOptions<TBody> = {},
	): Promise<TResponse> {
		const {
			baseURL,
			body,
			config,
			expectedType,
			headers,
			method = "get",
		} = options;
		const instance = this.getInstance(
			baseURL ?? this.options.baseURL,
			expectedType,
		);
		const requestConfig: AxiosRequestConfig = {
			...config,
			data: body,
			headers: {
				...config?.headers,
				...headers,
			},
			method,
			url: endpoint,
		};
		const response =
			await instance.request<BaseResponse<TResponse>>(requestConfig);

		if (response.status === 204) {
			return undefined as TResponse;
		}

		if (expectedType === "Blob" || expectedType === "File") {
			return {
				data: response.data,
				headers: response.headers,
			} as TResponse;
		}

		return response.data.data;
	}

	private getInstance(
		baseURL: string | undefined,
		expectedType?: HttpExpectedType,
	) {
		const { accept, responseType } = getResponseConfig(expectedType);
		const instanceKey = `${baseURL ?? ""}:${responseType}`;
		const cachedInstance = this.instances.get(instanceKey);

		if (cachedInstance) {
			return cachedInstance;
		}

		const instance = axios.create({
			baseURL,
			headers: {
				Accept: accept,
				"Content-Type": "application/json",
			},
			responseType,
			timeout: this.options.timeout ?? DEFAULT_TIMEOUT,
		});

		instance.interceptors.response.use(
			handleSuccessfulResponse as (response: AxiosResponse) => AxiosResponse,
			createResponseErrorInterceptor(this.options),
		);

		this.instances.set(instanceKey, instance);

		return instance;
	}
}

export const httpProvider = new HttpProvider({
	baseURL: "/api",
	onUnauthorized: () => {
		if (typeof window !== "undefined") {
			window.dispatchEvent(new Event(AUTH_SESSION_EXPIRED_EVENT));
		}
	},
});

export const httpClient = <TResponse = unknown, TBody = unknown>(
	endpoint: string,
	options: HttpClientOptions<TBody> = {},
) => httpProvider.request<TResponse, TBody>(endpoint, options);

export type { HttpBlobResponse };

export default httpClient;
