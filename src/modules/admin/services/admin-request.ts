import httpClient from "@/modules/shared/providers/http";

export const adminRequest = <T>(
	path: string,
	method: "get" | "post" | "put" | "patch" | "delete" = "get",
	body?: unknown,
) => httpClient<T>(path, { method, ...(body === undefined ? {} : { body }) });
