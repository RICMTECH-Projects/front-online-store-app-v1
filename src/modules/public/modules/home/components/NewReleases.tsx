"use client";

import { SectionHeading } from "@/modules/shared/components/ui/SectionHeading";
import { PublicProductCard } from "../../catalog/components/PublicProductCard";
import { usePublicProducts } from "../../catalog/hooks/use-public-store";

export function NewReleases() {
	const products = usePublicProducts();
	return (
		<section className="mt-10 w-full font-inter sm:mt-16">
			<SectionHeading
				title="PRODUCTOS DESTACADOS"
				description="Explora productos activos disponibles en nuestro catálogo."
			/>
			{products.isPending ? (
				<div
					role="status"
					aria-label="Cargando productos"
					className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4"
				>
					{[
						"release-skeleton-one",
						"release-skeleton-two",
						"release-skeleton-three",
						"release-skeleton-four",
					].map((skeletonId) => (
						<div
							key={skeletonId}
							className="aspect-3/4 animate-pulse bg-zinc-100"
						/>
					))}
				</div>
			) : products.isError ? (
				<div className="mt-8 border border-zinc-200 p-6">
					<p role="alert" className="text-sm">
						No pudimos cargar el catálogo.
					</p>
					<button
						type="button"
						onClick={() => void products.refetch()}
						className="mt-3 underline underline-offset-4"
					>
						Intentar de nuevo
					</button>
				</div>
			) : products.data.length === 0 ? (
				<p className="mt-8 border border-dashed border-zinc-300 p-8 text-sm text-zinc-600">
					Todavía no hay productos publicados.
				</p>
			) : (
				<div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 lg:grid-cols-4">
					{products.data.slice(0, 8).map((product) => (
						<PublicProductCard key={product.id} product={product} />
					))}
				</div>
			)}
		</section>
	);
}
