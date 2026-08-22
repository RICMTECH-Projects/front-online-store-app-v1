export const ContactMap = () => {
	return (
		<div className='overflow-hidden rounded-lg border border-border bg-card shadow-sm'>
			<div className='p-5'>
				<p className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
					Ubicacion
				</p>
				<h3 className='mt-2 text-lg font-semibold text-foreground'>Showroom URBNVOID</h3>
				<p className='mt-1 text-sm leading-6 text-muted-foreground'>
					Coordina tu visita antes de acercarte para asegurar disponibilidad de tallas.
				</p>
			</div>
			<iframe
				title='Mapa de ubicacion URBNVOID'
				src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15613.275128802245!2d-77.0682714371588!3d-11.95241681243181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105d1d56067e44d%3A0x928f4c1ead15d0cf!2sVilla%20Sol%2C%20Comas%2015311!5e0!3m2!1ses-419!2spe!4v1771216773839!5m2!1ses-419!2spe'
				allowFullScreen
				className='h-72 w-full border-0'
				loading='lazy'
				referrerPolicy='no-referrer-when-downgrade'
			/>
		</div>
	);
};
