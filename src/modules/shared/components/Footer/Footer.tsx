'use client'

import { Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
	return (
		<footer className="w-full bg-[#0a0a0a] text-white pt-16 pb-8 border-t border-white/10 mt-16 mt-auto">
			<div className="max-w-7xl mx-auto px-5 lg:px-20 font-inter">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
					
					<div className="flex flex-col gap-6">
						<div>
							<h2 className="text-3xl font-anton tracking-wider uppercase mb-2">URBN<span className="text-white/50">VOID</span></h2>
							<p className="text-sm text-white/60 leading-relaxed max-w-xs">
								Colecciones limitadas para los que dictan las reglas del juego. Viste el mañana, hoy.
							</p>
						</div>
						<div className="flex items-center gap-4">
							<a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/20 transition-colors group">
								<Instagram className="size-5 text-white/70 group-hover:text-white transition-colors" />
							</a>
							<a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/20 transition-colors group">
								<Twitter className="size-5 text-white/70 group-hover:text-white transition-colors" />
							</a>
							<a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/20 transition-colors group">
								<Facebook className="size-5 text-white/70 group-hover:text-white transition-colors" />
							</a>
						</div>
					</div>

					<div className="flex flex-col gap-4">
						<h3 className="text-sm font-semibold tracking-wider uppercase text-white/90 mb-2">Navegación</h3>
						<ul className="flex flex-col gap-3">
							<li>
								<Link href="/catalogo" className="text-sm text-white/60 hover:text-white transition-colors relative group inline-block">
									<span>Catálogo</span>
									<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
								</Link>
							</li>
							<li>
								<Link href="/sobre-nosotros" className="text-sm text-white/60 hover:text-white transition-colors relative group inline-block">
									<span>Sobre Nosotros</span>
									<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
								</Link>
							</li>
							<li>
								<Link href="/contacto" className="text-sm text-white/60 hover:text-white transition-colors relative group inline-block">
									<span>Contacto</span>
									<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
								</Link>
							</li>
						</ul>
					</div>

					<div className="flex flex-col gap-4">
						<h3 className="text-sm font-semibold tracking-wider uppercase text-white/90 mb-2">Soporte</h3>
						<ul className="flex flex-col gap-3">
							<li>
								<Link href="#" className="text-sm text-white/60 hover:text-white transition-colors relative group inline-block">
									<span>Envíos y Devoluciones</span>
									<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
								</Link>
							</li>
							<li>
								<Link href="#" className="text-sm text-white/60 hover:text-white transition-colors relative group inline-block">
									<span>FAQ</span>
									<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
								</Link>
							</li>
							<li>
								<Link href="#" className="text-sm text-white/60 hover:text-white transition-colors relative group inline-block">
									<span>Términos y Condiciones</span>
									<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
								</Link>
							</li>
							<li>
								<Link href="#" className="text-sm text-white/60 hover:text-white transition-colors relative group inline-block">
									<span>Políticas de Privacidad</span>
									<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
								</Link>
							</li>
						</ul>
					</div>

					<div className="flex flex-col gap-4">
						<h3 className="text-sm font-semibold tracking-wider uppercase text-white/90 mb-2">Únete al Underground</h3>
						<p className="text-sm text-white/60">
							Suscríbete para recibir accesos anticipados y lanzamientos limitados antes que nadie.
						</p>
						<form className="mt-2 flex relative" onSubmit={(e) => e.preventDefault()}>
							<input 
								type="email" 
								placeholder="Tu correo electrónico" 
								className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-5 pr-12 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors"
							/>
							<button 
								type="submit" 
								className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
								aria-label="Suscribirse"
							>
								<ArrowRight size={16} className="text-black" />
							</button>
						</form>
					</div>
					
				</div>

				<div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-4">
					<p className="text-xs text-white/50 text-center md:text-left">
						&copy; {new Date().getFullYear()} URBN VOID. Todos los derechos reservados.
					</p>
					<div className="flex items-center gap-4">
						<div className="h-6 w-10 bg-white/10 rounded overflow-hidden flex items-center justify-center">
							<span className="text-[8px] font-bold text-white/50">VISA</span>
						</div>
						<div className="h-6 w-10 bg-white/10 rounded overflow-hidden flex items-center justify-center">
							<span className="text-[8px] font-bold text-white/50">MC</span>
						</div>
						<div className="h-6 w-10 bg-white/10 rounded overflow-hidden flex items-center justify-center">
							<span className="text-[8px] font-bold text-white/50">AMEX</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
