import { describe, expect, it } from "vitest";
import {
	extractErrorMessage,
	getErrorMessage,
} from "@/modules/shared/providers/http/utils/http.utils";

describe("HTTP error message normalization", () => {
	it.each([
		[{ message: "No autorizado" }, "No autorizado"],
		[{ mensaje: "Datos inválidos" }, "Datos inválidos"],
		[{ errors: { email: ["Correo duplicado"] } }, "Correo duplicado"],
	])(
		"extracts readable message from backend payload %j",
		async (payload, expected) => {
			expect(await extractErrorMessage(payload)).toBe(expected);
		},
	);

	it("parses JSON text returned as a Blob", async () => {
		expect(
			await extractErrorMessage(
				new Blob([JSON.stringify({ detail: "Conflicto" })]),
			),
		).toBe("Conflicto");
	});

	it("uses safe fallback for opaque failures", async () => {
		expect(await extractErrorMessage({ code: "UNKNOWN" })).toBe(
			"Ocurrio un error al procesar la solicitud.",
		);
		expect(getErrorMessage({})).toBe(
			"Ocurrio un error al procesar la solicitud.",
		);
	});
});
