import { FALLBACK_ERROR_MESSAGE } from "../constants/http-error.constants";

export function getErrorMessage(error: unknown): string {
	return error instanceof Error && error.message.trim()
		? error.message
		: FALLBACK_ERROR_MESSAGE;
}
