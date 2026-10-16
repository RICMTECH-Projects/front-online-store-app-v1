"use client";

import Image from "next/image";
import Link from "next/link";
import { usePublicProductCard } from "../hooks/use-public-product-card";
import type { PublicProduct } from "../interfaces/public-catalog.interface";

export function PublicProductCard({ product }: { product: PublicProduct }) {
	const { image, price, addToCart } = usePublicProductCard(product);
	return (
		<article className="group flex h-full flex-col">
			<div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl bg-muted sm:aspect-4/5">
				<Link
					href={`/catalogo/${product.id}`}
					aria-label={`Ver ${product.name}`}
					className="absolute inset-0 z-10"
				>
					{image ? (
						<Image
							src={image.url}
							alt={image.altText || product.name}
							fill
							sizes="(max-width: 768px) 50vw, 33vw"
							className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
							unoptimized
							placeholder="empty"
						/>
					) : (
						<span className="flex h-full items-center justify-center text-sm text-muted-foreground">
							Sin imagen
						</span>
					)}
				</Link>
			</div>
			<div className="mt-4 flex flex-1 flex-col">
				<div className="flex items-start justify-between gap-2">
					<h3 className="font-anton text-lg uppercase leading-tight tracking-wide transition-colors group-hover:text-primary sm:text-xl md:text-2xl">
						<Link href={`/catalogo/${product.id}`}>{product.name}</Link>
					</h3>
					<p className="shrink-0 font-inter text-base font-bold sm:text-lg">
						{price}
					</p>
				</div>
				<p className="mt-2 line-clamp-2 font-inter text-xs leading-relaxed text-muted-foreground sm:text-sm">
					{product.description || "Consulta los detalles del producto."}
				</p>
				<button
					type="button"
					onClick={addToCart}
					className="mt-4 min-h-10 border border-foreground px-4 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
				>
					Añadir a la bolsa
				</button>
			</div>
		</article>
	);
}
