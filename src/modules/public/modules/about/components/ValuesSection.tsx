'use client';

import { ShieldCheck, Zap, Gem, Leaf } from 'lucide-react';

const VALUES = [
	{
		title: 'EXCLUSIVIDAD',
		description: 'Tiradas limitadas. Lo que llevas puesto, no lo verás en cada esquina.',
		icon: Gem,
	},
	{
		title: 'CALIDAD PREMIUM',
		description: 'Materiales seleccionados a mano para garantizar durabilidad y confort excelente.',
		icon: ShieldCheck,
	},
	{
		title: 'ESTILO DINÁMICO',
		description: 'Siluetas modernas que se adaptan a tu ritmo de vida rápido e impredecible.',
		icon: Zap,
	},
	{
		title: 'CONSCIENCIA',
		description: 'Mejores prácticas en el diseño y manufactura para cuidar nuestro entorno real.',
		icon: Leaf,
	},
];

export function ValuesSection() {
	return (
		<section className="w-full py-16 md:py-24 bg-[#0a0a0a] rounded-[2rem] my-12 px-6 sm:px-12 lg:px-16 border border-white/5 relative overflow-hidden">
			<div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
			<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

			<div className="relative z-10 text-center mb-16 space-y-6">
				<h2 className="text-4xl md:text-5xl lg:text-6xl font-anton text-white tracking-widest uppercase">
					NUESTROS PILARES
				</h2>
				<p className="text-white/60 max-w-2xl mx-auto font-inter md:text-lg leading-relaxed">
					Los principios inquebrantables que guían cada puntada, cada colección y cada envío que sale de nuestras instalaciones.
				</p>
			</div>

			<div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
				{VALUES.map((value, index) => {
					const Icon = value.icon;
					return (
						<div 
							key={index} 
							className="group flex flex-col items-start p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/40 hover:bg-white/10 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] duration-500 hover:-translate-y-2 backdrop-blur-sm"
						>
							<div className="p-4 rounded-xl bg-white/10 text-white mb-8 group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-500">
								<Icon className="w-7 h-7" strokeWidth={1.5} />
							</div>
							<h3 className="font-anton tracking-wider text-white text-xl mb-4 group-hover:text-white transition-colors">{value.title}</h3>
							<p className="text-sm text-white/50 font-inter leading-relaxed group-hover:text-white/80 transition-colors">
								{value.description}
							</p>
						</div>
					);
				})}
			</div>
		</section>
	);
}
