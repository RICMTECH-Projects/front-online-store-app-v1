import { Metadata } from 'next';
import { HeroAbout } from '@/modules/public/modules/about/components/HeroAbout';
import { MissionSection } from '@/modules/public/modules/about/components/MissionSection';
import { ValuesSection } from '@/modules/public/modules/about/components/ValuesSection';
import { CTASection } from '@/modules/public/modules/about/components/CTASection';

export const metadata: Metadata = {
	title: 'Sobre Nosotros - E-commerce',
	description: 'Descubre nuestra historia, filosofía y los pilares que nos hacen diferentes.',
};

export default function SobreNosotrosPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<HeroAbout />
			<div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
				<MissionSection />
				<ValuesSection />
				<CTASection />
			</div>
		</div>
	);
}
