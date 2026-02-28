'use client';

import { ProductCard } from '../../../public/modules/home/components/ProductCard';
import { SectionHeading } from '../ui/SectionHeading';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/modules/shared/components/ui/select';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/modules/shared/components/ui/sheet';
import { Filter } from 'lucide-react';

const FILTERS = [
	{
		title: 'Categorías',
		options: ['Todas', 'Hoodies', 'T-Shirts', 'Pantalones', 'Accesorios'],
	},
	{
		title: 'Tallas',
		options: ['S', 'M', 'L', 'XL'],
	},
	{
		title: 'Colecciones',
		options: ['SHADOW DRIP', 'URBAN BASE', 'LIMITED EST 2024'],
	},
];

export default function ProductGrid() {
	return (
		<div className="w-full font-inter pb-16">
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-8 mb-8 pb-4 border-b border-border">
				<SectionHeading
					title="COLECCIÓN PRINCIPAL"
					description="Descubre piezas diseñadas para la calle. Cortes modernos, telas premium."
				/>
				
				<div className="flex items-center justify-between gap-4 w-full md:w-auto mt-4 md:mt-0">
					<div className="md:hidden">
						<Sheet>
							<SheetTrigger className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
								<Filter size={16} />
								<span>Filtros</span>
							</SheetTrigger>
							<SheetContent side="left" className="w-[300px] sm:w-[400px]">
								<SheetHeader>
									<SheetTitle className="font-anton text-2xl tracking-wide text-left mb-4">FILTROS</SheetTitle>
								</SheetHeader>
								<div className="space-y-6 mt-4">
									{FILTERS.map((section, idx) => (
										<div key={idx} className="space-y-3">
											<h3 className="font-semibold text-sm uppercase tracking-wider">{section.title}</h3>
											<div className="space-y-2">
												{section.options.map((opt, oIdx) => (
													<label key={oIdx} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground">
														<input type="checkbox" className="rounded-sm border-gray-300 dark:border-gray-700 bg-transparent text-primary focus:ring-primary h-4 w-4" />
														<span>{opt}</span>
													</label>
												))}
											</div>
										</div>
									))}
								</div>
							</SheetContent>
						</Sheet>
					</div>

					<div className="w-40 md:w-48 ml-auto">
						<Select defaultValue="1">
							<SelectTrigger className="w-full bg-background border-border">
								<SelectValue placeholder="Ordenar por" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="1">Novedades</SelectItem>
								<SelectItem value="2">Precio: Menor a Mayor</SelectItem>
								<SelectItem value="3">Precio: Mayor a Menor</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>

			<div className="flex flex-col md:flex-row gap-8 lg:gap-12">
				<aside className="hidden md:block w-64 shrink-0 pr-4">
					<div className="sticky top-24 space-y-8">
						<h3 className="font-anton text-2xl tracking-wide flex items-center gap-2">
							<Filter size={20} /> FILTROS
						</h3>
						{FILTERS.map((section, idx) => (
							<div key={idx} className="space-y-4">
								<h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground pb-2 border-b border-border/50">
									{section.title}
								</h4>
								<div className="space-y-3">
									{section.options.map((opt, oIdx) => (
										<label key={oIdx} className="flex items-center gap-3 cursor-pointer group">
											<div className="relative flex items-center justify-center w-5 h-5 border border-muted-foreground/30 rounded-md group-hover:border-foreground transition-colors overflow-hidden">
												<input type="checkbox" className="peer absolute opacity-0 w-full h-full cursor-pointer" />
												<div className="absolute inset-0 bg-foreground scale-0 peer-checked:scale-100 transition-transform origin-center flex items-center justify-center">
												</div>
											</div>
											<span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
												{opt}
											</span>
										</label>
									))}
								</div>
							</div>
						))}
					</div>
				</aside>

				<main className="flex-1">
					<div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8">
						{Array.from({ length: 9 }).map((_, index) => (
							<ProductCard
								key={index}
								title={`SHADOW DRIP VOL.${index + 1}`}
								description="OVERSIZED FIT • HEAVYWEIGHT COTTON. Colección limitada."
								price={150}
								oldPrice={index % 3 === 0 ? 180 : undefined}
								image={`https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop&sig=${index}`}
							/>
						))}
					</div>

					<div className="mt-16 flex justify-center">
						<button className="px-8 py-3 bg-secondary text-secondary-foreground rounded-full text-sm font-bold uppercase tracking-widest hover:bg-secondary/80 transition-colors">
							Cargar más productos
						</button>
					</div>
				</main>
			</div>
		</div>
	);
}
