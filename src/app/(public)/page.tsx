import Hero from '@/modules/public/components/Hero';
import { NewReleases } from '@/modules/public/components/NewReleases';
import { PromoSection } from '@/modules/public/components/PromoSection';

export default function LandingPage() {
	return (
		<main className='w-full px-8 lg:px-30'>
			<Hero />
			<NewReleases />
			<PromoSection />
		</main>
	);
}
