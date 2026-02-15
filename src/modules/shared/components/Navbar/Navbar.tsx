'use client';

import Link from 'next/link';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/modules/shared/components/ui/navigation-menu';
import { LucideShoppingCart, Heart, User, RainbowIcon } from 'lucide-react';
import { NAVBAR_LINKS } from '../../constants/navbar.const';

export default function Navbar() {
	return (
		<header className='w-full'>
			<nav className='flex items-center justify-between p-5 sm:px-20 lg:px-30'>
				<Link
					href='/'
					className=' flex items-center gap-2'>
					<RainbowIcon className='size-10' />
					<span className='text-2xl font-anton'>URBNVOID</span>
				</Link>
				<NavigationMenu className='hidden lg:flex font-antonio'>
					<NavigationMenuList className='gap-6'>
						{NAVBAR_LINKS.map((link) => (
							<NavigationMenuItem key={link.href}>
								<NavigationMenuLink
									className='text-xl uppercase'
									asChild>
									<Link href={link.href}>{link.label}</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>

				<div className='flex items-center gap-4'>
					<Link
						href='/'
						aria-label='Ver Carrito'>
						<LucideShoppingCart className='h-6 w-6' />
					</Link>

					<Link
						href='/'
						aria-label='Ver Favoritos'>
						<Heart className='h-6 w-6' />
					</Link>

					<Link
						href='/login'
						aria-label='Ver Usuario'>
						<User className='h-6 w-6' />
					</Link>
				</div>
			</nav>
		</header>
	);
}
