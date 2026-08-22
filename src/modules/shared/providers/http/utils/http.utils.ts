import { AxiosError, isAxiosError } from 'axios';

const FALLBACK_ERROR_MESSAGE = 'Ocurrio un error al procesar la solicitud.';

export const getErrorMessage = (error: unknown): string => {
	if (error instanceof Error && error.message.trim()) {
		return error.message;
	}

	return FALLBACK_ERROR_MESSAGE;
};

const getFirstMessage = (value: unknown): string | undefined => {
	if (typeof value === 'string' && value.trim()) {
		return value;
	}

	if (Array.isArray(value)) {
		return value.map(getFirstMessage).find(Boolean);
	}

	if (value && typeof value === 'object') {
		const data = value as Record<string, unknown>;
		const preferredKeys = ['message', 'mensaje', 'error', 'detail', 'title', 'errors'];

		for (const key of preferredKeys) {
			const message = getFirstMessage(data[key]);

			if (message) {
				return message;
			}
		}

		return Object.values(data).map(getFirstMessage).find(Boolean);
	}

	return undefined;
};

const parseBlob = async (blob: Blob): Promise<unknown> => {
	try {
		return JSON.parse(await blob.text());
	} catch {
		return undefined;
	}
};

export const isNetworkError = (error: unknown): error is AxiosError =>
	isAxiosError(error) && !error.response;

export const extractErrorMessage = async (data: unknown): Promise<string> => {
	const parsedData = data instanceof Blob ? await parseBlob(data) : data;

	return getFirstMessage(parsedData) ?? FALLBACK_ERROR_MESSAGE;
};
