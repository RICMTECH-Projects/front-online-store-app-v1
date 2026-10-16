import { type AxiosError, isAxiosError } from "axios";

export function isNetworkError(error: unknown): error is AxiosError {
	return isAxiosError(error) && !error.response;
}
