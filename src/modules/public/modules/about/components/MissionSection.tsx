'use client';

import Image from 'next/image';

export function MissionSection() {
	return (
		<section className="w-full py-16 md:py-24">
			<div className="grid lg:grid-cols-2 gap-12 items-center">
				<div className="relative aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden bg-muted">
					<Image
						src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop"
						alt="Nuestra Filosofía"
						fill
						className="object-cover"
					/>
				</div>

				<div className="flex flex-col flex-1 justify-center space-y-6">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-anton tracking-tight text-foreground">
						LA FILOSOFÍA DETRÁS DE CADA PRENDA
					</h2>
					<div className="space-y-4 text-muted-foreground font-inter text-base md:text-lg">
						<p>
							Nacimos de la idea de que la ropa no es solo tela, es una declaración de intenciones. 
							Nos frustraba la producción masiva donde todos visten igual, así que decidimos hacer 
							exactamente lo contrario.
						</p>
						<p>
							Creemos en las <strong>colecciones limitadas</strong>. Cada pieza de nuestra tienda
							fue diseñada, seleccionada y producida en pequeñas tandas. Si algo se agota, es muy 
							probable que no vuelva. Así garantizamos que tu estilo siga siendo auténtico y exclusivo.
						</p>
						<p>
							Trabajamos con materiales de primera calidad para crear siluetas atemporales con
							un toque moderno. No seguimos tendencias efímeras, construimos básicos premium que
							resisten el paso del tiempo.
						</p>
					</div>

					<div className="pt-8 grid grid-cols-2 gap-6">
						<div>
							<h3 className="text-4xl font-anton">2021</h3>
							<p className="text-sm text-muted-foreground mt-2 font-inter">Año de fundación revolucionando nuestro primer diseño.</p>
						</div>
						<div>
							<h3 className="text-4xl font-anton">+5k</h3>
							<p className="text-sm text-muted-foreground mt-2 font-inter">Clientes únicos que visten con exclusividad.</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
