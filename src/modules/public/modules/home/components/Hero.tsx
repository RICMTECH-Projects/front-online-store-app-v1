'use client';

import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HERO_ITEMS } from '../constants/heroSlider.const';

export default function Hero() {
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % HERO_ITEMS.length);
		}, 9000);
		return () => clearInterval(interval);
	}, []);

	return (
		<section className='w-full mt-4 font-inter'>
			<div className='relative overflow-hidden rounded-4xl aspect-9/16 sm:aspect-4/3 lg:aspect-video'>
				{HERO_ITEMS.map((item, index) => (
					<Image
						key={`bg-${item.number}`}
						src={item.image}
						alt={item.title}
						fill
						priority={index === 0}
						className={`object-cover transition-opacity duration-1000 ease-in-out ${
							index === activeIndex ? 'opacity-100' : 'opacity-0'
						}`}
					/>
				))}
				
				<div className='absolute inset-0 bg-black/60' />

				<div className='relative z-10 text-white flex h-full flex-col justify-end p-4 sm:p-6 lg:p-8'>
					
					<div 
						key={`text-${activeIndex}`}
						className='animate-in fade-in slide-in-from-bottom-4 duration-700'
					>
						<h1 className='max-w-xl flex text-3xl font-anton leading-tight sm:text-4xl lg:text-5xl uppercase'>
							{HERO_ITEMS[activeIndex].title}
						</h1>
						<p className='mt-4 flex max-w-xl text-sm sm:text-base text-white/90'>
							{HERO_ITEMS[activeIndex].description}
						</p>
					</div>

					<div className='mt-6'>
						<Link
							href='/catalogo'
							className='inline-flex items-center p-2 rounded-full bg-white text-black hover:bg-gray-200 
                            mb-8 lg:mb-0 transition-colors'>
							<p className='px-3 sm:text-base font-semibold'>Comprar ahora</p>
							<ChevronRight className='bg-black text-white h-auto w-auto p-2 rounded-full' />
						</Link>
					</div>

					<div className='mt-10 hidden xl:grid grid-cols-5'>
						{HERO_ITEMS.map((item, index) => {
							const isActive = index === activeIndex;

							return (
								<div
									key={item.number}
									onClick={() => setActiveIndex(index)}
									className={`p-2 border-t-3 transition-colors duration-700 sm:p-5 lg:p-6 cursor-pointer
                                        ${
																					isActive
																						? 'text-white border-white'
																						: 'text-white/50 border-white/30 hover:border-white/60 hover:text-white/80'
																				}`}>
									<p
										className={`font-anton transition-colors text-lg duration-700 
                                        ${
																					isActive
																						? 'text-white'
																						: 'text-white/50'
																				}`}>
										{item.number}
									</p>
									<p
										className={`mt-4 transition-colors duration-700 text-sm ${
											isActive ? 'text-white' : 'text-white/50'
										}`}>
										{item.text}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
