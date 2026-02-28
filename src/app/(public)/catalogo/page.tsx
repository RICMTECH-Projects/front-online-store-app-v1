import ProductGrid from '@/modules/shared/components/ProductGrid/ProductGrid';
import { CatalogHero } from '@/modules/public/modules/catalog/components/CatalogHero';

export default function Categorias() {
	return (
		<main className='w-full'>
			<CatalogHero />
			<div className='px-5 sm:px-10 lg:px-20'>
				<ProductGrid />
			</div>
		</main>
	);
}
