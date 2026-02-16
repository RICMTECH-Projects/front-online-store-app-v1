import { CONTACT_ITEMS } from '../constants/contact.const';

export const ContactGrid = () => {
	return (
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
							xl:text-base 
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
	);
};
