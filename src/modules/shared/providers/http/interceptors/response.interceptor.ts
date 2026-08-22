import { isAxiosError, type AxiosResponse } from 'axios';
import { HttpError, type HttpProviderOptions } from '../http.interface';
import { extractErrorMessage, isNetworkError } from '../utils/http.utils';

export const handleSuccessfulResponse = <T>(response: AxiosResponse<T>) => response;

export const createResponseErrorInterceptor = ({
	onServiceUnavailable,
	onUnauthorized,
}: HttpProviderOptions) => {
	return async (error: unknown) => {
		if (isNetworkError(error)) {
			return Promise.reject(
				new HttpError({
					details: error,
					message: 'No se pudo conectar con el servicio.',
					type: 'network_error',
				}),
			);
		}

		if (isAxiosError(error)) {
			const normalizedError = new HttpError({
				details: error.response?.data,
				message: await extractErrorMessage(error.response?.data),
				status: error.response?.status,
				type: error.code ?? error.name,
			});

			if (normalizedError.status === 401) {
				onUnauthorized?.(normalizedError);
			}

			if (normalizedError.status === 503) {
				onServiceUnavailable?.(normalizedError);
			}

			return Promise.reject(normalizedError);
		}

		return Promise.reject(error);
	};
};
