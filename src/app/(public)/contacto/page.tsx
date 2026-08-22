import { ContactChannels } from '@/modules/public/modules/contact/components/ContactChannels';
import { ContactForm } from '@/modules/public/modules/contact/components/ContactForm';
import { ContactHero } from '@/modules/public/modules/contact/components/ContactHero';
import { ContactMap } from '@/modules/public/modules/contact/components/ContactMap';
import { ContactSupportPanel } from '@/modules/public/modules/contact/components/ContactSupportPanel';

const ContactPage = () => {
	return (
		<div className='w-full pb-16 font-inter'>
			<ContactHero />

			<section className='mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:gap-8'>
				<ContactForm />

				<aside className='grid gap-5'>
					<ContactSupportPanel />
					<ContactChannels />
					<ContactMap />
				</aside>
			</section>
		</div>
	);
};

export default ContactPage;
