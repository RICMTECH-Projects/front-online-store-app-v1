"use client";

import { ArrowLeft, Check, ImagePlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/modules/shared/components/ui/button";
import { eyebrow } from "../constants/seller-ui.constants";
import { useSellerProductDetail } from "../hooks/use-seller-product-detail";
import { ImageUrlForm } from "./ImageUrlForm";
import { Loading } from "./Loading";
import { Problem } from "./Problem";
import { StatusLabel } from "./StatusLabel";

export function SellerProductDetail({
	sellerId,
	productId,
	writable,
}: {
	sellerId: number;
	productId: number;
	writable: boolean;
}) {
	const {
		retry,
		publish,
		deactivate,
		archive,
		addImageUrl,
		productQuery,
		product,
		priceLabel,
		profile,
		changeStatus,
		addImage,
		images,
		primaryImage,
	} = useSellerProductDetail(sellerId, productId);
	if (!Number.isInteger(productId) || productId < 1)
		return <Problem message="El identificador del producto no es válido." />;
	if (productQuery.isPending)
		return <Loading label="Cargando ficha del producto" />;
	if (productQuery.isError || !product)
		return (
			<Problem
				message="No pudimos cargar este producto de la tienda."
				retry={retry}
			/>
		);
	return (
		<div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
			<div>
				<Link
					href={`/vendedor/${sellerId}/productos`}
					className="inline-flex min-h-10 items-center gap-2 text-sm underline underline-offset-4"
				>
					<ArrowLeft className="size-4" />
					Volver al catálogo
				</Link>
				<div className="mt-6 flex flex-wrap items-center gap-3">
					<p className={eyebrow}>Producto #{product.id}</p>
					<StatusLabel status={product.status} />
				</div>
				<h2 className="mt-3 font-antonio text-3xl font-semibold uppercase sm:text-4xl">
					{product.name}
				</h2>
				<p className="mt-2 font-mono text-sm text-zinc-500">
					{product.sku} · /{product.slug}
				</p>
				<p className="mt-5 max-w-2xl whitespace-pre-line text-sm leading-7 text-zinc-700">
					{product.description || "Este producto no tiene descripción."}
				</p>
				<p className="mt-5 text-2xl font-semibold tabular-nums">{priceLabel}</p>
				{primaryImage ? (
					<div className="relative mt-8 aspect-4/3 max-w-2xl overflow-hidden bg-zinc-100">
						<Image
							src={primaryImage.url}
							alt={primaryImage.altText || product.name}
							fill
							sizes="(max-width: 768px) 100vw, 672px"
							className="object-contain"
							unoptimized
							placeholder="empty"
						/>
					</div>
				) : (
					<div className="mt-8 flex aspect-4/3 max-w-2xl items-center justify-center bg-zinc-100 text-sm text-zinc-500">
						<ImagePlus className="mr-2 size-4" />
						Sin imágenes
					</div>
				)}
				{images.length > 1 && (
					<div className="mt-3 grid max-w-2xl grid-cols-3 gap-3 sm:grid-cols-4">
						{images.map((image) => (
							<div
								key={image.id}
								className="relative aspect-square overflow-hidden bg-zinc-100"
							>
								<Image
									src={image.url}
									alt={image.altText || product.name}
									fill
									sizes="(max-width: 640px) 30vw, 160px"
									className="object-cover"
									unoptimized
									placeholder="empty"
								/>
							</div>
						))}
					</div>
				)}
			</div>
			<aside className="h-fit border border-zinc-200 p-5">
				<p className={eyebrow}>Acciones de catálogo</p>
				<h3 className="mt-2 text-lg font-semibold">Estado e imágenes</h3>
				<p className="mt-2 text-sm leading-6 text-zinc-600">
					Los datos descriptivos no se pueden editar con las APIs actuales.
				</p>
				<div className="mt-5 grid gap-2">
					{product.status !== "ACTIVE" ? (
						<Button
							disabled={!writable || changeStatus.isPending}
							onClick={publish}
						>
							{changeStatus.isPending ? "Actualizando…" : "Publicar producto"}
						</Button>
					) : (
						<Button
							variant="outline"
							disabled={!writable || changeStatus.isPending}
							onClick={deactivate}
						>
							Pausar publicación
						</Button>
					)}
					{product.status !== "ARCHIVED" && (
						<Button
							variant="outline"
							disabled={!writable || changeStatus.isPending}
							onClick={archive}
						>
							Archivar
						</Button>
					)}
				</div>
				<ImageUrlForm
					disabled={
						!writable || profile.data?.status !== "ACTIVE" || addImage.isPending
					}
					pending={addImage.isPending}
					onAdd={addImageUrl}
				/>
				{changeStatus.isSuccess && (
					<p
						className="mt-4 flex items-center gap-2 text-sm text-emerald-800"
						role="status"
					>
						<Check className="size-4" />
						Estado actualizado.
					</p>
				)}
				{addImage.isSuccess && (
					<p className="mt-4 text-sm text-emerald-800" role="status">
						Imagen añadida.
					</p>
				)}
				<p className="mt-5 border-t border-zinc-200 pt-4 text-xs leading-5 text-zinc-500">
					Este flujo no modifica ni crea stock. Verifica existencias con el
					equipo que gestiona inventario.
				</p>
			</aside>
		</div>
	);
}
