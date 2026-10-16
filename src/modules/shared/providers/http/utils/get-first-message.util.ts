import { ERROR_MESSAGE_KEYS } from "../constants/http-error.constants";

export function getFirstMessage(value: unknown): string | undefined {
	if (typeof value === "string" && value.trim()) return value;
	if (Array.isArray(value)) return value.map(getFirstMessage).find(Boolean);
	if (!value || typeof value !== "object") return undefined;
	const data = value as Record<string, unknown>;
	for (const key of ERROR_MESSAGE_KEYS) {
		const message = getFirstMessage(data[key]);
		if (message) return message;
		if (
			key === "errors" &&
			data[key] &&
			typeof data[key] === "object" &&
			!Array.isArray(data[key])
		) {
			const fieldMessage = Object.values(data[key] as Record<string, unknown>)
				.map(getFirstMessage)
				.find(Boolean);
			if (fieldMessage) return fieldMessage;
		}
	}
	return undefined;
}
