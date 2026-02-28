import Image from 'next/image';
import Link from 'next/link';

type ProductCardProps = {
	title: string;
	description: string;
	price: number;
	oldPrice?: number;
	image: string;
};

export function ProductCard({
	title,
	description,
	price,
	oldPrice,
	image,
}: ProductCardProps) {
	return (
		<article className='group cursor-pointer flex flex-col h-full'>
			<div className='relative w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded-2xl bg-muted'>
				<div className='absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10' />
				
				<Image
					src={image}
					alt={title}
					fill
					sizes="(max-width: 768px) 50vw, 33vw"
					className='object-cover transition-transform duration-700 ease-out group-hover:scale-110'
				/>

				<div className='absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20'>
					<button className='w-full py-3 bg-foreground text-background font-inter text-sm font-semibold rounded-xl hover:scale-[1.02] transition-transform active:scale-[0.98]'>
						Añadir a la bolsa
					</button>
				</div>
				
				{oldPrice && (
					<div className='absolute top-3 left-3 z-20'>
						<span className='bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full'>
							OFERTA
						</span>
					</div>
				)}
			</div>

			<div className='mt-4 flex flex-col flex-1'>
				<div className='flex justify-between items-start gap-2'>
					<h3 className='font-anton text-lg sm:text-xl md:text-2xl uppercase tracking-wide leading-tight group-hover:text-primary transition-colors'>
						{title}
					</h3>
					<div className='flex flex-col items-end shrink-0'>
						<p className='text-base sm:text-lg font-bold font-inter'>
							${price}
						</p>
						{oldPrice && (
							<span className='text-xs sm:text-sm text-muted-foreground line-through font-inter'>
								${oldPrice}
							</span>
						)}
					</div>
				</div>
				<p className='mt-2 text-xs sm:text-sm text-muted-foreground font-inter line-clamp-2 leading-relaxed'>
					{description}
				</p>
			</div>
		</article>
	);
}
