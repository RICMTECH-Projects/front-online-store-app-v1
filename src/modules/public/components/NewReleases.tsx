'use client';

import { SectionHeading } from '../../shared/components/ui/SectionHeading';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/modules/shared/components/ui/carousel';
import { ProductCard } from './ProductCard';
import Autoplay from 'embla-carousel-autoplay';

export function NewReleases() {
	return (
		<section className='w-full font-inter mt-10'>
			<SectionHeading
				title='NUEVOS LANZAMIENTOS'
				description='DESTACA CON NUESTRA ULTIMA COLECCION: DISEÑOS 
                    AUDACES, TELAS PRIMIUM Y UN ESTILO URBANO 
                    LISTO PARA LA CALLE'
			/>
			<div className='mt-3 gap-3 md:mt-6 md:gap-5 lg:mt-8 lg:gap-8'>
				<Carousel
					className='w-full'
					opts={{
						loop: true,
					}}
					/*Instalar dependecia de autoplay*/
					plugins={[
						Autoplay({
							delay: 3000,
							stopOnInteraction: false,
						}),
					]}>
					<CarouselContent>
						{Array.from({ length: 5 }).map((_, index) => (
							<CarouselItem
								key={index}
								className='basis-full sm:basis-1/2 lg:basis-1/3'>
								<div className='p-1'>
									<ProductCard
										title={index + 1 + ' SHADOW DRIP'}
										description='URBAN PHANTOM - A BOLD, OVERSIZED HODDIE WITH
                    EDGY FRAPHICS AND A STEAKTHY AESTHETIC INSPIRED
                    BY CITY NIGHTS'
										price={150}
										oldPrice={180}
										image='/landing/newreleases.png'
									/>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious
						className='hidden md:flex justify-center items-center absolute -left-4'
						variant='default'
					/>
					<CarouselNext
						className='hidden md:flex justify-center items-center absolute -right-4'
						variant='default'
					/>
				</Carousel>
			</div>
		</section>
	);
}
