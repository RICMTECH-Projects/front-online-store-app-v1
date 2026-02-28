'use client';

import { SectionHeading } from '../../../../shared/components/ui/SectionHeading';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/modules/shared/components/ui/carousel';
import { ProductCard } from './ProductCard';
import Autoplay from 'embla-carousel-autoplay';

const IMAGES = [
	'https://images.unsplash.com/photo-1578681994506-b8f463449011?q=80&w=1500&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1500&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1500&auto=format&fit=crop',
	'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1500&auto=format&fit=crop',
];

export function NewReleases() {
	return (
		<section className='w-full font-inter mt-10 sm:mt-16'>
			<SectionHeading
				title='NUEVOS LANZAMIENTOS'
				description='DESTACA CON NUESTRA ULTIMA COLECCION: DISEÑOS 
                    AUDACES, TELAS PREMIUM Y UN ESTILO URBANO 
                    LISTO PARA LA CALLE'
			/>
			<div className='mt-6 md:mt-10 lg:mt-12 overflow-visible px-4'>
				<Carousel
					className='w-full'
					opts={{
						loop: true,
					}}
					plugins={[
						Autoplay({
							delay: 4000,
							stopOnInteraction: false,
						}),
					]}>
					<CarouselContent className="-ml-2 md:-ml-4 pt-4 pb-12">
						{IMAGES.map((imgSrc, index) => (
							<CarouselItem
								key={index}
								className='pl-2 md:pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4'>
								<div className='h-full'>
									<ProductCard
										title={`URBAN TEAR VOL ${index + 1}`}
										description='URBAN PHANTOM SERIES - OVERSIZED FIT WITH EDGY GRAPHICS. HIGH QUALITY MATERIALS.'
										price={150}
										oldPrice={index % 2 === 0 ? 180 : undefined}
										image={imgSrc}
									/>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious
						className='hidden md:flex justify-center items-center absolute -left-4 xl:-left-12'
						variant='default'
					/>
					<CarouselNext
						className='hidden md:flex justify-center items-center absolute -right-4 xl:-right-12'
						variant='default'
					/>
				</Carousel>
			</div>
		</section>
	);
}
