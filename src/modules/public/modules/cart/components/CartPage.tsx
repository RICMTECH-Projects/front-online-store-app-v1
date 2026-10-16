"use client";

import { ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/modules/shared/components/ui/button";
import { Input } from "@/modules/shared/components/ui/input";
import { useCartPage } from "../hooks/use-cart-page";

export function CartPage() {
	const {
		items,
		products,
		cartRows,
		unavailable,
		nonPENProducts,
		subtotalLabel,
		canCheckout,
		changeQuantity,
		removeItem,
	} = useCartPage();
	return (
		<section className="mx-auto w-full max-w-6xl py-10 sm:py-14">
			<p className="text-xs font-semibold uppercase tracking-label text-zinc-500">
				URBNVOID · Compra
			</p>
			<h1 className="mt-2 font-antonio text-4xl font-semibold uppercase">
				Tu bolsa
			</h1>
			<p className="mt-2 text-sm text-zinc-600">
				Los productos y cantidades se guardan localmente en este navegador.
			</p>
			{products.isError && (
				<div
					className="mt-6 border border-amber-300 bg-amber-50 p-4 text-sm"
					role="alert"
				>
					No pudimos actualizar los productos. Revisa tu conexión antes de
					continuar.
				</div>
			)}
			{products.isPending ? (
				<p className="mt-8 text-sm text-zinc-600">Actualizando catálogo…</p>
			) : items.length === 0 ? (
				<div className="mt-8 border border-dashed border-zinc-300 p-10 text-center">
					<ShoppingBag className="mx-auto size-8 text-zinc-400" />
					<h2 className="mt-4 text-lg font-semibold">Tu bolsa está vacía</h2>
					<Link
						href="/catalogo"
						className="mt-5 inline-flex min-h-11 items-center underline"
					>
						Explorar catálogo
					</Link>
				</div>
			) : (
				<div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
					<div className="grid content-start gap-4">
						{cartRows.map(({ product, cartItem, image, priceLabel }) => (
							<article
								key={product.id}
								className="grid grid-cols-[5rem_minmax(0,1fr)] gap-4 border-b border-zinc-200 pb-4 sm:grid-cols-[7rem_minmax(0,1fr)_auto]"
							>
								<Link
									href={`/catalogo/${product.id}`}
									className="relative aspect-4/5 overflow-hidden bg-zinc-100"
								>
									{image && (
										<Image
											src={image.url}
											alt={image.altText || product.name}
											fill
											sizes="112px"
											className="object-cover"
											unoptimized
										/>
									)}
								</Link>
								<div>
									<Link
										href={`/catalogo/${product.id}`}
										className="font-semibold underline-offset-4 hover:underline"
									>
										{product.name}
									</Link>
									<p className="mt-1 font-mono text-xs text-zinc-500">
										{product.sku}
									</p>
									<p className="mt-2 text-sm">{priceLabel}</p>
									<label
										htmlFor={`quantity-${product.id}`}
										className="mt-3 flex w-fit items-center gap-2 text-xs text-zinc-600"
									>
										Cantidad{" "}
										<Input
											id={`quantity-${product.id}`}
											type="number"
											min={1}
											value={cartItem.quantity}
											onChange={(event) => changeQuantity(product.id, event)}
											className="h-9 w-16 border border-zinc-300 px-2 text-sm text-zinc-900"
										/>
									</label>
									<p className="mt-2 text-xs text-zinc-500">
										Existencias se confirman al crear el pedido.
									</p>
								</div>
								<Button
									className="col-span-2 w-fit sm:col-span-1 sm:self-start"
									variant="ghost"
									onClick={() => removeItem(product.id)}
								>
									<Trash2 className="size-4" />
									Quitar
								</Button>
							</article>
						))}
						{unavailable.map((item) => (
							<article
								key={item.productId}
								className="flex items-center justify-between gap-4 border border-amber-300 bg-amber-50 p-4"
							>
								<div>
									<p className="font-medium">Producto no disponible</p>
									<p className="mt-1 text-xs text-amber-900">
										El ID {item.productId} ya no aparece en el catálogo público;
										no se enviará al checkout.
									</p>
								</div>
								<Button
									variant="outline"
									onClick={() => removeItem(item.productId)}
								>
									Quitar
								</Button>
							</article>
						))}
					</div>
					<aside className="h-fit border border-zinc-200 p-5">
						<p className="text-xs font-semibold uppercase tracking-label text-zinc-500">
							Estimación
						</p>
						<div className="mt-4 flex justify-between text-sm">
							<span>Subtotal de productos PEN</span>
							<span>{subtotalLabel}</span>
						</div>
						{nonPENProducts.length > 0 && (
							<p className="mt-3 text-sm text-amber-900" role="alert">
								Hay productos fuera de PEN. Retíralos antes de comprar.
							</p>
						)}
						<p className="mt-3 text-xs leading-5 text-zinc-500">
							El servidor valida precio, cupones y stock al confirmar. En el
							siguiente paso eliges dirección.
						</p>
						<Button
							asChild
							className="mt-6 min-h-11 w-full"
							disabled={!canCheckout}
						>
							<Link href="/checkout">Continuar al checkout</Link>
						</Button>
						<Link
							href="/catalogo"
							className="mt-4 inline-flex min-h-10 items-center text-sm underline"
						>
							Seguir comprando
						</Link>
					</aside>
				</div>
			)}
		</section>
	);
}
