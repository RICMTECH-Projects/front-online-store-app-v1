"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import type { z } from "zod";
import { useAuthStore } from "@/modules/auth";
import { HttpError } from "@/modules/shared/providers/http";
import { formatMoney } from "@/modules/shared/utils/format-money";
import { selectCartItems, useCartStore } from "../../cart/store/useCartStore";
import { usePublicProducts } from "../../catalog/hooks/use-public-store";
import type { PublicProduct } from "../../catalog/interfaces/public-catalog.interface";
import {
	useCheckoutQuote,
	useCreateOrder,
	useCustomerAddresses,
} from "../../customer/hooks/use-customer-commerce";
import { CHECKOUT_FORM_DEFAULT_VALUES } from "../constants/checkout-form-defaults.constants";
import type { CheckoutReceipt } from "../interfaces/receipt.interface";
import { checkoutSchema, parseCouponCodes } from "../schemas/checkout.schema";
import { receiptKey } from "../utils/receipt-key.util";

type CheckoutValues = z.input<typeof checkoutSchema>;
type CheckoutResult = z.output<typeof checkoutSchema>;
export function useCheckoutPage() {
	const router = useRouter();
	const user = useAuthStore((state) => state.user);
	const items = useCartStore(selectCartItems);
	const clearCart = useCartStore((state) => state.clear);
	const productsQuery = usePublicProducts();
	const addressesQuery = useCustomerAddresses();
	const orderMutation = useCreateOrder();
	const [preparing, setPreparing] = useState(false);
	const form = useForm<CheckoutValues, undefined, CheckoutResult>({
		resolver: zodResolver(checkoutSchema),
		defaultValues: CHECKOUT_FORM_DEFAULT_VALUES,
	});
	const selectedAddressValue = useWatch({
		control: form.control,
		name: "shippingAddressId",
	});
	const couponTextValue =
		useWatch({ control: form.control, name: "couponText" }) ?? "";
	const selectedAddressId = Number(selectedAddressValue);
	const activeProducts = (productsQuery.data ?? []).filter((product) =>
		items.some((cartItem) => cartItem.productId === product.id),
	);
	const nonPENProducts = activeProducts.filter(
		(product) => product.currency !== "PEN",
	);
	const subtotal = activeProducts
		.filter((product) => product.currency === "PEN")
		.reduce(
			(sum, product) =>
				sum +
				product.price *
					(items.find((item) => item.productId === product.id)?.quantity ?? 0),
			0,
		);
	const quote = useCheckoutQuote(
		selectedAddressId,
		subtotal,
		activeProducts.length > 0 && nonPENProducts.length === 0,
	);
	const chosenAddress = addressesQuery.data?.find(
		(address) => address.id === selectedAddressId,
	);
	const missingItems = items.filter(
		(cartItem) =>
			!activeProducts.some((product) => product.id === cartItem.productId),
	);
	const hasInvalidQuantity = items.some(
		(item) => !Number.isInteger(item.quantity) || item.quantity < 1,
	);
	const codes = parseCouponCodes(couponTextValue);
	const duplicateCodes =
		new Set(codes.map((code) => code.toUpperCase())).size !== codes.length;
	const uncertainNetworkResult =
		orderMutation.error instanceof HttpError &&
		(orderMutation.error.status === undefined ||
			orderMutation.error.status === 503);
	const correlationId =
		orderMutation.error instanceof HttpError
			? orderMutation.error.correlationId
			: undefined;

	const submit = form.handleSubmit(
		async ({ shippingAddressId, couponText }) => {
			form.clearErrors("root");
			if (!user || orderMutation.isPending || preparing) return;
			if (duplicateCodes) {
				form.setError("couponText", {
					message: "Quita los códigos repetidos.",
				});
				return;
			}
			setPreparing(true);
			try {
				const fresh = await productsQuery.refetch();
				if (!fresh.data || fresh.isError) {
					form.setError("root", {
						message:
							"No se pudo actualizar el catálogo. Tu bolsa sigue intacta.",
					});
					return;
				}
				const byId = new Map(
					fresh.data.map((product) => [product.id, product]),
				);
				const validProducts: PublicProduct[] = [];
				for (const cartItem of items) {
					const current = byId.get(cartItem.productId);
					if (current?.status !== "ACTIVE") {
						form.setError("root", {
							message:
								"Algún producto dejó de estar disponible. Vuelve a la bolsa y corrige el pedido.",
						});
						return;
					}
					if (current.currency !== "PEN") {
						form.setError("root", {
							message:
								"Solo puedes comprar productos con precio en PEN. Retira los demás de la bolsa.",
						});
						return;
					}
					if (!Number.isInteger(cartItem.quantity) || cartItem.quantity < 1) {
						form.setError("root", {
							message: "Revisa las cantidades de tu bolsa.",
						});
						return;
					}
					validProducts.push(current);
				}
				if (
					!validProducts.length ||
					missingItems.length ||
					hasInvalidQuantity
				) {
					form.setError("root", {
						message: "Revisa los productos de tu bolsa antes de continuar.",
					});
					return;
				}
				const created = await orderMutation.mutateAsync({
					shippingAddressId: Number(shippingAddressId),
					lines: items.map(({ productId, quantity }) => ({
						productId,
						quantity,
					})),
					couponCodes: parseCouponCodes(couponText ?? ""),
				});
				const receipt: CheckoutReceipt = {
					order: created,
					createdAt: new Date().toISOString(),
					lines: validProducts.map((product) => ({
						productId: product.id,
						name: product.name,
						sku: product.sku,
						quantity:
							items.find((entry) => entry.productId === product.id)?.quantity ??
							0,
						unitPrice: product.price,
						currency: product.currency,
					})),
				};
				try {
					sessionStorage.setItem(
						receiptKey(user.id, created.id),
						JSON.stringify(receipt),
					);
				} catch {
					/* El pedido confirmado sigue siendo válido aunque el navegador no permita guardar el recibo. */
				}
				clearCart();
				router.replace(`/checkout/confirmacion/${created.id}`);
			} catch {
				// Mantener el carrito: el backend pudo confirmar la transacción aunque la respuesta no haya llegado.
			} finally {
				setPreparing(false);
			}
		},
	);

	const busy = preparing || orderMutation.isPending;
	const addressOptions = (addressesQuery.data ?? []).map((address) => ({
		value: String(address.id),
		label: `${address.label || "Dirección"}${address.defaultAddress ? " · Predeterminada" : ""}`,
		description: `${address.recipientName} · ${[address.line1, address.district, address.city, address.region, address.countryCode].filter(Boolean).join(", ")}`,
	}));
	const retryAddresses = () => void addressesQuery.refetch();
	const productRows = items.map((cartItem) => {
		const product = activeProducts.find(
			(item) => item.id === cartItem.productId,
		);
		return {
			id: cartItem.productId,
			name: product?.name ?? `Producto #${cartItem.productId} no disponible`,
			quantity: cartItem.quantity,
			image:
				product?.images.find((entry) => entry.primary) ?? product?.images[0],
			priceLabel: product
				? formatMoney(product.price * cartItem.quantity, product.currency)
				: null,
		};
	});
	const subtotalLabel = formatMoney(subtotal, "PEN");
	const shippingLabel = quote.data
		? formatMoney(quote.data.total, quote.data.currency)
		: "—";
	return {
		user,
		items,
		productsQuery,
		addressesQuery,
		orderMutation,
		preparing,
		form,
		selectedAddressId,
		activeProducts,
		nonPENProducts,
		subtotal,
		quote,
		chosenAddress,
		missingItems,
		hasInvalidQuantity,
		codes,
		duplicateCodes,
		uncertainNetworkResult,
		correlationId,
		submit,
		busy,
		addressOptions,
		retryAddresses,
		productRows,
		subtotalLabel,
		shippingLabel,
	};
}
