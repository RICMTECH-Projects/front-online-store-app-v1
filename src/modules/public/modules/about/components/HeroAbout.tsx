'use client';

import Image from 'next/image';

export function HeroAbout() {
	return (
		<section className="w-full mt-4 font-inter">
			<div className="relative overflow-hidden rounded-4xl aspect-video lg:aspect-21/9">
				<Image
					src="/landing/about-us.avif"
					alt="Nuestra Historia - Urbana y Exclusiva"
					fill
					priority
					className="object-cover object-top"
				/>
				<div className="absolute inset-0 bg-black/75" />

				<div className="relative z-10 flex h-full flex-col items-center justify-center text-center p-4 sm:p-6 lg:p-8">
					<h1 className="max-w-4xl text-white text-3xl font-anton tracking-wider uppercase leading-tight sm:text-6xl lg:text-8xl animate-in fade-in slide-in-from-bottom-5 duration-1000">
						NUESTRA HISTORIA
					</h1>
					<p className="mt-8 max-w-2xl text-white/70 font-inter text-sm sm:text-base lg:text-lg animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-150 fill-mode-forwards ">
						Más que una tienda, somos un movimiento de estilo y exclusividad. 
						Conoce el origen de nuestra pasión por la moda urbana y premium.
					</p>
				</div>
			</div>
		</section>
	);
}
