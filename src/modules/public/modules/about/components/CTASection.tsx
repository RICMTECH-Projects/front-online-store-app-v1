'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
	return (
		<section className="w-full py-16 md:py-24 mb-16">
			<div className="relative overflow-hidden rounded-[2rem] bg-black border border-white/10 p-8 md:p-16 lg:p-24 text-center shadow-2xl">
				<div className="absolute inset-0 bg-gradient-to-br from-[#121212] via-black to-[#0a0a0a] z-0" />
				
				<div className="relative z-10 max-w-4xl mx-auto space-y-10 flex flex-col items-center">
					<h2 className="text-4xl md:text-6xl lg:text-7xl font-anton tracking-wide text-white uppercase leading-tight">
						¿LISTO PARA EXPERIMENTAR LA EXCLUSIVIDAD?
					</h2>
					<p className="text-white/60 font-inter max-w-2xl mx-auto text-lg leading-relaxed">
						Nuestra última colección acaba de llegar al asfalto. El inventario, como siempre, es estrictamente limitado. No dejes que alguien más defina tu estilo.
					</p>
					
					<Link
						href="/catalogo"
						className="mt-4 inline-flex items-center bg-white text-black py-2 px-3 rounded-full hover:bg-gray-200 transition-colors group/btn"
					>
						<p className="px-6 font-bold uppercase tracking-wider text-sm">Explorar Catálogo</p>
						<div className="bg-black text-white rounded-full p-2.5 transform group-hover/btn:translate-x-1 transition-transform">
							<ArrowRight size={20} strokeWidth={2.5} />
						</div>
					</Link>
				</div>
			</div>
		</section>
	);
}
