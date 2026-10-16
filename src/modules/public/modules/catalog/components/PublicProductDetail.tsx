"use client";

import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/modules/shared/components/ui/button";
import { usePublicProductDetail } from "../hooks/use-public-product-detail";

export function PublicProductDetail() {
	const {
		id,
		product,
		imagesQuery,
		images,
		activeIndex,
		activeImage,
		previousImage,
		nextImage,
		selectImage,
		addCurrentProduct,
		priceLabel,
	} = usePublicProductDetail();
	if (!Number.isInteger(id) || id < 1)
		return <p className="py-16">Este producto no está disponible.</p>;
	if (product.isPending)
		return (
			<div className="py-20 text-sm text-zinc-600" role="status">
				Cargando producto…
			</div>
		);
	if (product.isError || !product.data)
		return (
			<div className="py-16">
				<h1 className="font-antonio text-3xl uppercase">
					Producto no disponible
				</h1>
				<p className="mt-3 text-sm text-zinc-600">
					Puede que ya no esté publicado o que el enlace haya cambiado.
				</p>
				<Link
					className="mt-5 inline-flex min-h-11 items-center gap-2 underline"
					href="/catalogo"
				>
					<ArrowLeft className="size-4" />
					Volver al catálogo
				</Link>
			</div>
		);
	const item = product.data;
	return (
		<section className="mx-auto grid w-full max-w-6xl gap-8 py-8 sm:py-12 lg:grid-cols-2 lg:gap-14">
			<div>
				<Link
					href="/catalogo"
					className="mb-5 inline-flex min-h-10 items-center gap-2 text-sm text-zinc-600 underline-offset-4 hover:underline"
				>
					<ArrowLeft className="size-4" />
					Volver al catálogo
				</Link>
				<div className="relative aspect-4/5 overflow-hidden bg-zinc-100">
					{activeImage ? (
						<Image
							src={activeImage.url}
							alt={activeImage.altText || item.name}
							fill
							sizes="(max-width: 1024px) 100vw, 50vw"
							className="object-contain"
							unoptimized
							placeholder="empty"
						/>
					) : (
						<div className="flex h-full items-center justify-center text-sm text-zinc-500">
							Sin imágenes disponibles
						</div>
					)}
					{images.length > 1 && (
						<>
							<button
								type="button"
								aria-label="Imagen anterior"
								onClick={previousImage}
								className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-zinc-900"
							>
								<ChevronLeft className="size-5" />
							</button>
							<button
								type="button"
								aria-label="Imagen siguiente"
								onClick={nextImage}
								className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-zinc-900"
							>
								<ChevronRight className="size-5" />
							</button>
						</>
					)}
				</div>
				{imagesQuery.isError && (
					<p className="mt-2 text-xs text-zinc-500">
						Mostramos las imágenes incluidas en la ficha; no se pudo actualizar
						la galería.
					</p>
				)}
				{images.length > 1 && (
					<div className="mt-3 grid grid-cols-5 gap-2">
						{images.map((image, index) => (
							<button
								type="button"
								key={image.id}
								aria-label={`Ver imagen ${index + 1}`}
								aria-pressed={index === activeIndex}
								onClick={() => selectImage(index)}
								className={`relative aspect-square overflow-hidden bg-zinc-100 ${index === activeIndex ? "ring-2 ring-zinc-950" : ""}`}
							>
								<Image
									src={image.url}
									alt={image.altText || `${item.name}, imagen ${index + 1}`}
									fill
									sizes="20vw"
									className="object-cover"
									unoptimized
								/>
							</button>
						))}
					</div>
				)}
			</div>
			<div className="flex flex-col justify-center">
				<p className="text-xs font-semibold uppercase tracking-label text-zinc-500">
					URBNVOID · Catálogo
				</p>
				<h1 className="mt-3 font-antonio text-4xl font-semibold uppercase sm:text-5xl">
					{item.name}
				</h1>
				<p className="mt-3 font-mono text-xs text-zinc-500">SKU {item.sku}</p>
				<p className="mt-6 text-2xl font-semibold tabular-nums">{priceLabel}</p>
				<p className="mt-6 whitespace-pre-line text-sm leading-7 text-zinc-700">
					{item.description || "Sin descripción adicional."}
				</p>
				<div className="mt-8 border-y border-zinc-200 py-4 text-sm text-zinc-600">
					El catálogo no informa existencias. Confirmaremos disponibilidad al
					crear el pedido.
				</div>
				<Button
					className="mt-6 min-h-12 w-full sm:w-fit"
					onClick={addCurrentProduct}
				>
					Añadir a la bolsa
				</Button>
				<Link
					href="/carrito"
					className="mt-4 min-h-10 text-sm underline underline-offset-4"
				>
					Ir a la bolsa
				</Link>
			</div>
		</section>
	);
}
