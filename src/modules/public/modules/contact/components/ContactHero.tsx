import { CheckCircle2Icon, ShieldCheckIcon } from 'lucide-react';
import Image from 'next/image';

const CONTACT_HIGHLIGHTS = [
	'Respuesta en 24 h',
	'Cambios y pedidos',
	'Asesoria de tallas',
];

export const ContactHero = () => {
	return (
		<section className='relative isolate -mx-5 overflow-hidden lg:-mx-20'>
			<Image
				src='/landing/contact.avif'
				alt='Cliente revisando prendas URBNVOID en tienda'
				fill
				priority
				sizes='100vw'
				className='-z-10 object-cover object-center'
			/>
			<div className='absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/55 to-black/20' />

			<div className='mx-auto flex min-h-[420px] max-w-7xl flex-col justify-end px-5 py-10 sm:min-h-[480px] sm:px-10 lg:px-20'>
				<div className='max-w-2xl text-white'>
					<div className='mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-widest backdrop-blur'>
						<ShieldCheckIcon className='size-4' aria-hidden='true' />
						Soporte URBNVOID
					</div>
					<h1 className='font-anton text-5xl uppercase leading-none tracking-wide sm:text-6xl lg:text-7xl'>
						Contacto
					</h1>
					<p className='mt-5 max-w-xl text-base leading-7 text-white/85 sm:text-lg'>
						Resolvemos dudas sobre tallas, pedidos especiales, cambios y colaboraciones.
						Elige un canal directo o dejanos un mensaje con el detalle.
					</p>
				</div>
				<div className='mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3'>
					{CONTACT_HIGHLIGHTS.map((item) => (
						<div
							key={item}
							className='flex min-h-12 items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur'
						>
							<CheckCircle2Icon className='size-4 shrink-0' aria-hidden='true' />
							<span>{item}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
