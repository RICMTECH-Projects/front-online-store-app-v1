import { NextResponse } from "next/server";

export const createApiUnavailableResponse = () =>
	NextResponse.json(
		{
			data: null,
			message: "No se pudo conectar con el servicio.",
			status: "ERROR",
		},
		{ status: 503 },
	);

export const isJsonResponse = (response: Response) =>
	(response.headers.get("content-type") ?? "").includes("application/json");

export const createBinaryProxyResponse = (response: Response) =>
	new NextResponse(response.body, {
		headers: {
			"Content-Type": response.headers.get("content-type") ?? "",
		},
		status: response.status,
	});
