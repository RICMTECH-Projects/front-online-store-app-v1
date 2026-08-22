import { CONTACT_ITEMS } from '@/modules/public/modules/contact/constants/contact.const';
import { ArrowUpRightIcon } from 'lucide-react';

export const ContactChannels = () => {
	return (
		<div className='grid gap-3'>
			{CONTACT_ITEMS.map((item) => {
				const Icon = item.icon;
				const content = (
					<>
						<div className='flex size-11 shrink-0 items-center justify-center rounded-lg bg-foreground text-background transition-colors group-hover:bg-background group-hover:text-foreground'>
							<Icon className='size-5' aria-hidden='true' />
						</div>
						<div className='min-w-0 flex-1'>
							<div className='flex items-center justify-between gap-3'>
								<span className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
									{item.label}
								</span>
								{item.href && (
									<ArrowUpRightIcon
										className='size-4 text-muted-foreground transition-colors group-hover:text-foreground'
										aria-hidden='true'
									/>
								)}
							</div>
							<p className='mt-1 break-words text-base font-semibold text-foreground'>
								{item.value}
							</p>
							<p className='mt-1 text-sm leading-5 text-muted-foreground'>{item.helper}</p>
						</div>
					</>
				);

				return item.href ? (
					<a
						key={item.id}
						href={item.href}
						className='group flex gap-4 rounded-lg border border-border bg-card p-4 shadow-sm transition-colors hover:border-foreground focus:outline-none focus:ring-4 focus:ring-foreground/10'
					>
						{content}
					</a>
				) : (
					<div
						key={item.id}
						className='group flex gap-4 rounded-lg border border-border bg-card p-4 shadow-sm'
					>
						{content}
					</div>
				);
			})}
		</div>
	);
};
