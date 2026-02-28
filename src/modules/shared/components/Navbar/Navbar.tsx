'use client';

import Link from 'next/link';
import { NAVBAR_LINKS } from '../../constants/navbar.const';
import { LucideShoppingCart, Heart, User, Search, Menu } from 'lucide-react';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/modules/shared/components/ui/sheet';

export default function Navbar() {
	return (
		<header className='sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40 transition-all duration-300'>
			<nav className='max-w-7xl mx-auto flex items-center justify-between px-5 py-4 lg:px-20 h-20'>
				
				<div className='flex items-center gap-4 lg:w-1/3'>
					<div className='lg:hidden'>
						<Sheet>
							<SheetTrigger asChild>
								<button className='p-2 -ml-2 text-foreground/80 hover:text-foreground transition-colors' aria-label="Abrir menú">
									<Menu className='size-6' />
								</button>
							</SheetTrigger>
							<SheetContent side='left' className='w-[300px] sm:w-[400px]'>
								<SheetHeader>
									<SheetTitle className='text-left font-antonio text-3xl tracking-wider uppercase'>URBNVOID</SheetTitle>
								</SheetHeader>
								<div className='flex flex-col gap-6 mt-12 px-4'>
									{NAVBAR_LINKS.map((link) => (
										<Link
											key={link.href}
											href={link.href}
											className='text-2xl font-antonio tracking-wide uppercase text-foreground/80 hover:text-foreground transition-all duration-300 transform hover:translate-x-2'
										>
											{link.label}
										</Link>
									))}
								</div>
								<div className="mt-auto absolute bottom-8 left-6 flex flex-col gap-4 text-muted-foreground font-inter text-sm font-medium">
									<Link href="/login" className="hover:text-foreground transition-colors flex items-center gap-2">
										<User className="size-4" /> Mi Cuenta
									</Link>
									<Link href="/" className="hover:text-foreground transition-colors flex items-center gap-2">
										<Heart className="size-4" /> Wishlist
									</Link>
								</div>
							</SheetContent>
						</Sheet>
					</div>

					<div className='hidden lg:flex items-center gap-8 font-antonio'>
						{NAVBAR_LINKS.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className='text-[15px] uppercase tracking-widest text-foreground/70 hover:text-foreground transition-colors relative group py-2'
							>
								<span>{link.label}</span>
								<span className='absolute bottom-0 left-0 w-0 h-[2px] bg-foreground transition-all duration-300 ease-out group-hover:w-full'></span>
							</Link>
						))}
					</div>
				</div>

				<div className='flex justify-center lg:w-1/3'>
					<Link
						href='/'
						className='flex items-center group'>
						<span className='text-3xl sm:text-4xl font-anton tracking-widest uppercase transition-transform group-hover:scale-105 duration-300'>URBNVOID</span>
					</Link>
				</div>

				<div className='flex items-center justify-end gap-1 sm:gap-3 lg:w-1/3'>
					<button 
						className='p-2 sm:p-2.5 text-foreground/80 hover:text-foreground hover:bg-muted/50 rounded-full transition-all'
						aria-label="Buscar"
					>
						<Search className='size-5' />
					</button>

					<Link
						href='/login'
						className='p-2 sm:p-2.5 text-foreground/80 hover:text-foreground hover:bg-muted/50 rounded-full transition-all hidden sm:flex'
						aria-label='Mi Cuenta'
					>
						<User className='size-5' />
					</Link>

					<Link
						href='/'
						className='p-2 sm:p-2.5 text-foreground/80 hover:text-foreground hover:bg-muted/50 rounded-full transition-all hidden sm:flex'
						aria-label='Mis Favoritos'
					>
						<Heart className='size-5' />
					</Link>

					<Link
						href='/'
						className='p-2 sm:p-2.5 text-foreground/80 hover:text-foreground hover:bg-muted/50 rounded-full transition-all relative group'
						aria-label='Ver Carrito'
					>
						<LucideShoppingCart className='size-5 group-hover:scale-110 transition-transform' />
						<span className='absolute top-1 right-1 flex size-2.5'>
							<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75'></span>
							<span className='relative inline-flex rounded-full size-2.5 bg-primary'></span>
						</span>
					</Link>
				</div>
				
			</nav>
		</header>
	);
}
