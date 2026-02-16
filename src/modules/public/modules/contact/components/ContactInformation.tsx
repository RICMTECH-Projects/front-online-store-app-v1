import { ContactGrid } from './ContactGrid';

export default function ContactInformation() {
	return (
		<div className='space-y-6 w-full'>
			<ContactGrid />

			<iframe
				src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15613.275128802245!2d-77.0682714371588!3d-11.95241681243181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105d1d56067e44d%3A0x928f4c1ead15d0cf!2sVilla%20Sol%2C%20Comas%2015311!5e0!3m2!1ses-419!2spe!4v1771216773839!5m2!1ses-419!2spe'
				allowFullScreen={true}
				className='w-full h-70 rounded-sm'
				loading='lazy'></iframe>
		</div>
	);
}
