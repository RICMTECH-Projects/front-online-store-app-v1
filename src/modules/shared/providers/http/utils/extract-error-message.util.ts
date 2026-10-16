import { FALLBACK_ERROR_MESSAGE } from "../constants/http-error.constants";
import { getFirstMessage } from "./get-first-message.util";
import { parseBlob } from "./parse-blob.util";

export async function extractErrorMessage(data: unknown): Promise<string> {
	const parsedData = data instanceof Blob ? await parseBlob(data) : data;
	return getFirstMessage(parsedData) ?? FALLBACK_ERROR_MESSAGE;
}
