import { ContactForm } from '@/modules/public/modules/contact/components/ContactForm';
import ContactInformation from '@/modules/public/modules/contact/components/ContactInformation';
import Image from 'next/image';

const page = () => {
	return (
		<>
			<div className='w-full h-80 relative rounded-sm overflow-hidden'>
				<Image
					src='/landing/background-contact-3.jpg'
					alt='Contacto'
					fill
					className='object-cover'
				/>

				<div className='absolute top-0 left-0 w-full h-full bg-black opacity-70'></div>

				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full text-white space-y-4 p-4'>
					<h1 className='text-3xl sm:text-4xl font-antonio font-bold'>
						Contacto
					</h1>
					<p className='sm:max-w-sm mx-auto text-sm text-gray-200 font-inter'>
						¿Tienes dudas, pedidos especiales o colaboraciones? Estamos listos
						para ayudarte.
					</p>
				</div>
			</div>

			<div className='grid w-full grid-cols-1 lg:grid-cols-2 mt-8 gap-8'>
				<ContactInformation />
				<ContactForm />
			</div>
		</>
	);
};

export default page;
