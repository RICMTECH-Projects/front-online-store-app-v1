"use client";

import { AlertTriangle, LoaderCircle, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FormInput } from "@/modules/shared/components/forms/FormInput";
import { FormRadioGroup } from "@/modules/shared/components/forms/FormRadioGroup";
import { Button } from "@/modules/shared/components/ui/button";
import { useCheckoutPage } from "../hooks/use-checkout-page";

export function CheckoutPage() {
	const {
		addressOptions,
		productRows,
		subtotalLabel,
		shippingLabel,
		retryAddresses,
		user,
		items,
		productsQuery,
		addressesQuery,
		orderMutation,
		form,
		selectedAddressId,
		nonPENProducts,
		quote,
		chosenAddress,
		missingItems,
		hasInvalidQuantity,
		duplicateCodes,
		uncertainNetworkResult,
		correlationId,
		submit,
		busy,
	} = useCheckoutPage();

	if (items.length === 0 && !orderMutation.isSuccess)
		return (
			<section className="mx-auto max-w-3xl py-16">
				<h1 className="font-antonio text-4xl uppercase">
					No hay productos por comprar
				</h1>
				<Link
					href="/catalogo"
					className="mt-5 inline-flex min-h-11 items-center underline"
				>
					Volver al catálogo
				</Link>
			</section>
		);
	return (
		<section className="mx-auto w-full max-w-6xl py-10 sm:py-14">
			<p className="text-xs font-semibold uppercase tracking-label text-zinc-500">
				Compra segura · Paso final
			</p>
			<h1 className="mt-2 font-antonio text-4xl font-semibold uppercase">
				Revisa tu pedido
			</h1>
			<p className="mt-2 text-sm text-zinc-600">
				El stock y los precios se validan en el servidor al crear la orden.
			</p>
			<form
				onSubmit={submit}
				className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_21rem]"
				noValidate
			>
				<div className="grid content-start gap-8">
					<section className="border border-zinc-200 p-5">
						<h2 className="text-xl font-semibold">1. Dirección de entrega</h2>
						{addressesQuery.isPending ? (
							<p className="mt-4 text-sm">Cargando libreta…</p>
						) : addressesQuery.isError ? (
							<p role="alert" className="mt-4 text-sm">
								No pudimos leer tus direcciones.{" "}
								<button
									type="button"
									onClick={retryAddresses}
									className="underline"
								>
									Reintentar
								</button>
							</p>
						) : addressesQuery.data.length === 0 ? (
							<div className="mt-4">
								<p className="text-sm text-zinc-600">
									Necesitas guardar una dirección antes de confirmar la compra.
								</p>
								<Button asChild variant="outline" className="mt-4">
									<Link href="/mi-cuenta/direcciones">Añadir dirección</Link>
								</Button>
							</div>
						) : (
							<FormRadioGroup
								control={form.control}
								name="shippingAddressId"
								label="Selecciona una dirección"
								options={addressOptions}
							/>
						)}
						<Link
							href="/mi-cuenta/direcciones"
							className="mt-4 inline-flex min-h-10 items-center text-sm underline"
						>
							Administrar direcciones
						</Link>
					</section>
					<section className="border border-zinc-200 p-5">
						<h2 className="text-xl font-semibold">2. Códigos de cupón</h2>
						<div className="mt-4">
							<FormInput
								control={form.control}
								name="couponText"
								label="Escribe los códigos separados por coma"
								placeholder="CODIGO1, CODIGO2"
								className="h-11"
							/>
						</div>
						<p className="mt-2 text-xs leading-5 text-zinc-500">
							No hay vista previa de aplicación. El backend valida vigencia,
							límites y elegibilidad al confirmar. Un código inválido rechazará
							la orden.
						</p>
					</section>
					<section className="border border-zinc-200 p-5">
						<h2 className="text-xl font-semibold">3. Productos</h2>
						{productsQuery.isPending ? (
							<p className="mt-4 text-sm">Actualizando catálogo…</p>
						) : (
							<div className="mt-4 grid gap-4">
								{productRows.map((row) => (
									<div
										key={row.id}
										className="flex items-center gap-3 border-b border-zinc-100 pb-3"
									>
										{row.image && (
											<div className="relative size-14 shrink-0 bg-zinc-100">
												<Image
													src={row.image.url}
													alt=""
													fill
													sizes="56px"
													className="object-cover"
													unoptimized
												/>
											</div>
										)}
										<div className="min-w-0 flex-1">
											<p className="truncate text-sm font-medium">{row.name}</p>
											<p className="text-xs text-zinc-500">
												Cantidad: {row.quantity}
											</p>
										</div>
										{row.priceLabel && (
											<p className="text-sm tabular-nums">{row.priceLabel}</p>
										)}
									</div>
								))}
							</div>
						)}
					</section>
				</div>
				<aside className="h-fit border border-zinc-200 p-5">
					<h2 className="text-lg font-semibold">Resumen estimado</h2>
					<div className="mt-4 flex justify-between text-sm">
						<span>Productos</span>
						<span>{subtotalLabel}</span>
					</div>
					<div className="mt-3 flex justify-between text-sm">
						<span>Envío estimado</span>
						<span>{shippingLabel}</span>
					</div>
					{quote.isPending && selectedAddressId > 0 && (
						<p className="mt-2 text-xs text-zinc-500">Calculando estimación…</p>
					)}
					{quote.isError && (
						<p className="mt-2 text-xs text-amber-800">
							No se pudo estimar el envío. El backend calculará el importe
							final.
						</p>
					)}
					{chosenAddress && (
						<p className="mt-3 text-xs leading-5 text-zinc-500">
							Destino: {chosenAddress.city}, {chosenAddress.countryCode}. La
							cotización es estimada; la orden devolverá importes oficiales.
						</p>
					)}
					<div className="mt-4 border-t border-zinc-200 pt-4">
						<p className="flex items-center gap-2 text-xs text-zinc-600">
							<ShieldCheck className="size-4" />
							Importes finales del servidor
						</p>
					</div>
					{missingItems.length > 0 && (
						<p className="mt-4 text-sm text-red-700" role="alert">
							Hay productos que ya no están publicados. Vuelve a la bolsa y
							retíralos.
						</p>
					)}
					{nonPENProducts.length > 0 && (
						<p className="mt-4 text-sm text-red-700" role="alert">
							Solo se aceptan productos en PEN. Retira los otros productos de la
							bolsa.
						</p>
					)}
					{hasInvalidQuantity && (
						<p className="mt-4 text-sm text-red-700" role="alert">
							Corrige las cantidades del carrito.
						</p>
					)}
					{duplicateCodes && (
						<p className="mt-4 text-sm text-red-700" role="alert">
							Hay códigos de cupón repetidos.
						</p>
					)}
					{form.formState.errors.root?.message && (
						<div
							className="mt-4 border-l-2 border-red-600 bg-red-50 p-3 text-sm text-red-900"
							role="alert"
						>
							<AlertTriangle className="mr-1 inline size-4" />
							{form.formState.errors.root.message}
						</div>
					)}
					{orderMutation.isError && (
						<div
							className="mt-4 border-l-2 border-red-600 bg-red-50 p-3 text-sm text-red-900"
							role="alert"
						>
							{uncertainNetworkResult
								? "No pudimos confirmar la respuesta. Tu bolsa se conservó; no vuelvas a enviar el pedido hasta verificar su estado con soporte."
								: orderMutation.error.message}
							{correlationId && (
								<span className="mt-2 block text-xs">
									Referencia: {correlationId}
								</span>
							)}
						</div>
					)}
					<Button
						className="mt-6 min-h-12 w-full"
						type="submit"
						disabled={
							busy ||
							!user ||
							productsQuery.isError ||
							addressesQuery.isPending ||
							addressesQuery.isError ||
							!chosenAddress ||
							missingItems.length > 0 ||
							nonPENProducts.length > 0 ||
							hasInvalidQuantity ||
							duplicateCodes
						}
					>
						{busy ? (
							<>
								<LoaderCircle className="size-4 animate-spin" />
								Verificando…
							</>
						) : (
							"Crear pedido"
						)}
					</Button>
					<Link
						href="/carrito"
						className="mt-4 inline-flex min-h-10 items-center text-sm underline"
					>
						Volver a la bolsa
					</Link>
				</aside>
			</form>
		</section>
	);
}
