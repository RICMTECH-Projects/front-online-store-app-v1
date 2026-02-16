import { CONTACT_ITEMS } from '@/modules/public/modules/contact/constants/contact.const';
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

			<div className='grid w-full grid-cols-1 lg:grid-cols-2 mt-8'>
				<div className='space-y-6 w-full'>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
						{CONTACT_ITEMS.map((item) => (
							<div
								key={item.id}
								className='
        				bg-zinc-100 
        				rounded-lg 
        				flex 
        				flex-col 
        				items-center 
        				justify-center 
        				p-10 
        				gap-3
        				transition-all 
        				duration-300
        				hover:bg-zinc-200
        				hover:-translate-y-1
      					'>
								{item.icon && (
									<item.icon
										className='
            				size-8 
            				text-zinc-700 
            				transition-transform 
            				duration-300
            				group-hover:scale-110
          					'
									/>
								)}

								<span
									className='
        						font-medium 
        						text-sm 
        						md:text-base 
        						text-center 
        						tracking-wide
        						text-zinc-800
										font-inter
     							'>
									{item.label}
								</span>
							</div>
						))}
					</div>

					<iframe
						src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15613.275128802245!2d-77.0682714371588!3d-11.95241681243181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105d1d56067e44d%3A0x928f4c1ead15d0cf!2sVilla%20Sol%2C%20Comas%2015311!5e0!3m2!1ses-419!2spe!4v1771216773839!5m2!1ses-419!2spe'
						allowFullScreen={true}
						className='w-full h-70 rounded-sm'
						loading='lazy'></iframe>
				</div>
			</div>
		</>
	);
};

export default page;
