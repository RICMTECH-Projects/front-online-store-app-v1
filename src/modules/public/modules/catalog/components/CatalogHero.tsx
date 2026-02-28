'use client';

import Image from 'next/image';

export function CatalogHero() {
	return (
		<section className="w-full font-inter">
			<div className="relative overflow-hidden aspect-21/9 sm:aspect-3/1 lg:aspect-4/1">
				<Image
					src="/landing/slider/slider-01.avif"
					alt="Catálogo"
					fill
					priority
					className="object-cover object-center" 
				/>
				<div className="absolute inset-0 bg-black/50" />

				<div className="relative z-10 flex h-full flex-col items-center justify-center text-center p-4">
					<h1 className="text-white text-3xl sm:text-5xl lg:text-6xl font-anton tracking-wide animate-in fade-in slide-in-from-bottom-4 duration-700">
						COLECCIÓN COMPLETA
					</h1>
					<p className="mt-3 text-white/90 text-sm sm:text-base font-inter max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-forwards">
						Encuentra tu próximo esencial. Diseños audaces y telas premium listas para la calle.
					</p>
				</div>
			</div>
		</section>
	);
}
