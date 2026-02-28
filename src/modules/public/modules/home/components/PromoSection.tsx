import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '../../../../shared/components/ui/SectionHeading';

export function PromoSection() {
	return (
		<section className='w-full font-inter mt-16 sm:mt-24 mb-10'>
			<SectionHeading
				title='COMPRA INTELIGENTE, RECIBE RÁPIDO, VIVE CON ESTILO'
				description='TE CONECTAMOS CON PRODUCTOS ÚNICOS Y ENTREGAS SIN DEMORAS,
                TU TIEMPO VALE, Y TU LOOK TAMBIÉN.'
			/>
			<div
				className='mt-8 md:mt-12 grid grid-rows-4 grid-cols-1 gap-4
                md:grid-cols-2 md:grid-rows-2 md:gap-6
                lg:gap-8
                xl:grid-cols-3
                '>
				
				<div className='relative xl:aspect-21/10 xl:col-span-2 rounded-[2rem] overflow-hidden group shadow-lg'>
					<Image
						src='/landing/promo1.png'
						alt='Promo 1'
						fill
						priority
						className='object-cover object-center transition-transform duration-700 group-hover:scale-105'
					/>
					<div className='absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500' />
				</div>

				<div className='bg-[#0a0a0a] rounded-[2rem] p-6 lg:p-10 flex flex-col justify-end group transition-transform duration-300 hover:-translate-y-1 shadow-lg'>
					<p className='font-anton text-white text-2xl lg:text-3xl tracking-wide uppercase'>
						EXPLORA NUESTRAS COLECCIONES
					</p>
					<p className='mt-4 text-[#B1B1B1] font-medium text-sm leading-relaxed'>
						SUMÉRGETE EN NUESTRAS COLECCIONES CUIDADOSAMENTE SELECCIONADAS.
						PRENDAS Y ESTILOS PENSADOS PARA QUIENES VALORAN LA AUTENTICIDAD Y LA
						CALIDAD.
					</p>
					<Link
						href='/catalogo'
						className='mt-8 inline-flex items-center bg-white text-black py-1.5 px-2 rounded-full hover:bg-gray-200 transition-colors self-start group/btn'>
						<p className='px-4 text-sm font-bold uppercase tracking-wider'>Ver catálogo</p>
						<div className="bg-black text-white rounded-full p-2 transform group-hover/btn:translate-x-1 transition-transform">
							<ArrowRight size={18} />
						</div>
					</Link>
				</div>

				<div className='bg-[#E8E8E8] rounded-[2rem] p-6 lg:p-10 flex flex-col justify-end group transition-transform duration-300 hover:-translate-y-1 shadow-md border border-black/5'>
					<p className='font-anton text-black text-2xl lg:text-3xl tracking-wide uppercase'>
						ENCUENTRA TU ESTILO
					</p>
					<p className='mt-4 text-[#505050] font-medium text-sm leading-relaxed'>
						NAVEGA POR NUESTRAS CATEGORÍAS Y DESCUBRE LO QUE MEJOR SE ADAPTA A
						TI. DESDE MODA CASUAL HASTA PIEZAS PREMIUM, TODO EN UN SOLO LUGAR.
					</p>
					<Link
						href='/catalogo'
						className='mt-8 inline-flex items-center bg-black text-white py-1.5 px-2 rounded-full hover:bg-black/80 transition-colors self-start group/btn'>
						<p className='px-4 text-sm font-bold uppercase tracking-wider'>Ver catálogo</p>
						<div className="bg-white text-black rounded-full p-2 transform group-hover/btn:translate-x-1 transition-transform">
							<ArrowRight size={18} />
						</div>
					</Link>
				</div>

				<div className='relative xl:aspect-21/10 xl:col-span-2 rounded-[2rem] overflow-hidden group shadow-lg'>
					<Image
						src='/landing/hero.png'
						alt='Promo 2 Hero'
						fill
						priority
						className='object-cover object-center transition-transform duration-700 group-hover:scale-105'
					/>
					<div className='absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500' />
				</div>
			</div>
		</section>
	);
}

