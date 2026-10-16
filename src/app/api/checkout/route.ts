import { type NextRequest, NextResponse } from "next/server";
import {
	applyAuthBffResponse,
	getApiAccessToken,
} from "@/modules/auth/server/auth-bff.server";
import { getRequestAuthUser } from "@/modules/auth/server/auth-session-request.server";
import {
	getApiCorrelationId,
	isCrossOriginMutation,
} from "@/modules/shared/server/api/api-proxy.request";
import {
	createApiErrorResponse,
	createApiSuccessPayload,
	createApiUnavailableResponse,
	isJsonResponse,
} from "@/modules/shared/server/api/api-proxy.response";
import { forwardApiRequest } from "@/modules/shared/server/api/api-proxy.service";

const localError = (message: string, status: number, correlationId?: string) =>
	NextResponse.json(
		{ data: null, message, status: "ERROR" },
		{
			status,
			headers: {
				"Cache-Control": "no-store",
				...(correlationId ? { "X-Correlation-ID": correlationId } : {}),
			},
		},
	);

export async function POST(request: NextRequest) {
	const correlationId = getApiCorrelationId(request);
	if (isCrossOriginMutation(request))
		return localError(
			"La solicitud debe originarse en este sitio.",
			403,
			correlationId,
		);
	const rawWarehouseId = process.env.CHECKOUT_WAREHOUSE_ID;
	const warehouseId = Number(rawWarehouseId);
	if (
		!rawWarehouseId ||
		!Number.isSafeInteger(warehouseId) ||
		warehouseId < 1
	) {
		return localError(
			"El checkout no está configurado para este entorno. Inténtalo más tarde.",
			503,
			correlationId,
		);
	}
	let input: unknown;
	try {
		input = await request.json();
	} catch {
		return localError(
			"El cuerpo del checkout no es JSON válido.",
			400,
			correlationId,
		);
	}
	if (!input || typeof input !== "object")
		return localError("Completa los datos del checkout.", 400, correlationId);
	const body = input as Record<string, unknown>;
	const lines = body.lines;
	const addressId = body.shippingAddressId;
	const couponCodes = body.couponCodes === undefined ? [] : body.couponCodes;
	if (
		!Number.isSafeInteger(addressId) ||
		Number(addressId) < 1 ||
		!Array.isArray(lines) ||
		lines.length === 0 ||
		!Array.isArray(couponCodes) ||
		!couponCodes.every((code) => typeof code === "string")
	) {
		return localError(
			"Revisa la dirección, los productos y los códigos de cupón.",
			400,
			correlationId,
		);
	}
	const cleanLines: Array<{
		productId: number;
		warehouseId: number;
		quantity: number;
	}> = [];
	for (const line of lines) {
		if (!line || typeof line !== "object")
			return localError(
				"Hay un producto inválido en el pedido.",
				400,
				correlationId,
			);
		const value = line as Record<string, unknown>;
		if (
			!Number.isSafeInteger(value.productId) ||
			Number(value.productId) < 1 ||
			!Number.isSafeInteger(value.quantity) ||
			Number(value.quantity) < 1
		) {
			return localError(
				"Cada producto necesita ID y cantidad válida.",
				400,
				correlationId,
			);
		}
		cleanLines.push({
			productId: Number(value.productId),
			warehouseId,
			quantity: Number(value.quantity),
		});
	}
	const user = await getRequestAuthUser(request);
	if (user === undefined) return createApiUnavailableResponse(correlationId);
	if (user === null)
		return applyAuthBffResponse(
			localError("Inicia sesión para crear tu pedido.", 401, correlationId),
			"orders",
			null,
			401,
		);
	if (!user.roles.includes("CUSTOMER"))
		return localError(
			"Tu cuenta no tiene permiso para comprar.",
			403,
			correlationId,
		);
	const accessToken = await getApiAccessToken("orders");
	try {
		const upstreamResponse = await forwardApiRequest({
			accessToken,
			correlationId,
			path: ["orders"],
			request,
			body: JSON.stringify({
				userId: user.id,
				shippingAddressId: Number(addressId),
				lines: cleanLines,
				couponCodes,
			}),
		});
		if (upstreamResponse.status === 204)
			return applyAuthBffResponse(
				new NextResponse(null, {
					status: 204,
					headers: { "Cache-Control": "no-store" },
				}),
				"orders",
				null,
				204,
			);
		if (!upstreamResponse.ok)
			return applyAuthBffResponse(
				await createApiErrorResponse(upstreamResponse, correlationId),
				"orders",
				null,
				upstreamResponse.status,
			);
		if (!isJsonResponse(upstreamResponse))
			return localError(
				"El servidor devolvió una respuesta inesperada.",
				502,
				correlationId,
			);
		const payload: unknown = await upstreamResponse.json();
		const responseCorrelationId =
			upstreamResponse.headers.get("X-Correlation-ID") ?? correlationId;
		const response = NextResponse.json(createApiSuccessPayload(payload), {
			status: upstreamResponse.status,
			headers: {
				"Cache-Control": "no-store",
				...(responseCorrelationId
					? { "X-Correlation-ID": responseCorrelationId }
					: {}),
			},
		});
		return applyAuthBffResponse(
			response,
			"orders",
			payload,
			upstreamResponse.status,
		);
	} catch {
		return createApiUnavailableResponse(correlationId);
	}
}
