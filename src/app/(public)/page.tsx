import Hero from '@/modules/public/modules/home/components/Hero';
import { NewReleases } from '@/modules/public/modules/home/components/NewReleases';
import { PromoSection } from '@/modules/public/modules/home/components/PromoSection';

export default function LandingPage() {
	return (
		<>
			<Hero />
			<NewReleases />
			<PromoSection />
		</>
	);
}
