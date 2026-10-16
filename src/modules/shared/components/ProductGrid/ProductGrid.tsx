"use client";

import { Filter } from "lucide-react";
import { PublicProductCard } from "@/modules/public/modules/catalog/components/PublicProductCard";
import { CATALOG_SKELETON_IDS } from "@/modules/shared/constants/catalog-grid.constants";
import { useProductGrid } from "@/modules/shared/hooks/use-product-grid";
import { SectionHeading } from "../ui/SectionHeading";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

export default function ProductGrid() {
	const {
		categoryId,
		sort,
		setSort,
		products,
		visibleProducts,
		categories,
		changeCategory,
		retry,
	} = useProductGrid();
	return (
		<div className="w-full pb-16 font-inter">
			<div className="mt-8 mb-8 flex flex-col justify-between gap-4 border-b border-border pb-4 md:flex-row md:items-end">
				<SectionHeading
					title="CATÁLOGO"
					description="Productos publicados por las tiendas del marketplace."
				/>
				<div className="flex flex-wrap items-center gap-3">
					<div className="flex items-center gap-2 text-sm">
						<Filter className="size-4" aria-hidden="true" />
						<label htmlFor="product-category-filter" className="sr-only">
							Filtrar por categoría
						</label>
						<Select
							value={categoryId?.toString() ?? "all"}
							onValueChange={changeCategory}
						>
							<SelectTrigger id="product-category-filter" className="min-w-40">
								<SelectValue placeholder="Todas las categorías" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Todas las categorías</SelectItem>
								{categories.map((category) => (
									<SelectItem key={category.id} value={String(category.id)}>
										{category.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="text-sm">
						<label htmlFor="product-sort" className="sr-only">
							Ordenar productos
						</label>
						<Select value={sort} onValueChange={setSort}>
							<SelectTrigger id="product-sort" className="min-w-40">
								<SelectValue placeholder="Orden del catálogo" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="default">Orden del catálogo</SelectItem>
								<SelectItem value="asc">Precio: menor a mayor</SelectItem>
								<SelectItem value="desc">Precio: mayor a menor</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>
			{products.isPending ? (
				<div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
					{CATALOG_SKELETON_IDS.map((skeletonId) => (
						<div
							key={skeletonId}
							className="aspect-3/4 animate-pulse bg-zinc-100"
						/>
					))}
				</div>
			) : products.isError ? (
				<div className="border border-zinc-200 p-6">
					<p role="alert">No pudimos cargar el catálogo.</p>
					<button type="button" onClick={retry} className="mt-3 underline">
						Intentar de nuevo
					</button>
				</div>
			) : visibleProducts.length === 0 ? (
				<p className="border border-dashed border-zinc-300 p-8 text-sm text-zinc-600">
					No hay productos publicados para esta selección.
				</p>
			) : (
				<div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8">
					{visibleProducts.map((product) => (
						<PublicProductCard key={product.id} product={product} />
					))}
				</div>
			)}
			<p className="mt-8 text-xs text-zinc-500">
				La disponibilidad de inventario y el precio definitivo se validan al
				crear tu pedido.
			</p>
		</div>
	);
}
