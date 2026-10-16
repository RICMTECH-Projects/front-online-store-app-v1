"use client";

import Link from "next/link";

export function Footer() {
	return (
		<footer className="w-full bg-brand-black text-white pt-16 pb-8 border-t border-white/10 mt-16 mt-auto">
			<div className="max-w-7xl mx-auto px-5 lg:px-20 font-inter">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 mb-16">
					<div className="flex flex-col gap-6">
						<div>
							<h2 className="text-3xl font-anton tracking-wider uppercase mb-2">
								URBN<span className="text-white/50">VOID</span>
							</h2>
							<p className="text-sm text-white/60 leading-relaxed max-w-xs">
								Colecciones limitadas para los que dictan las reglas del juego.
								Viste el mañana, hoy.
							</p>
						</div>
					</div>

					<div className="flex flex-col gap-4">
						<h3 className="text-sm font-semibold tracking-wider uppercase text-white/90 mb-2">
							Navegación
						</h3>
						<ul className="flex flex-col gap-3">
							<li>
								<Link
									href="/catalogo"
									className="text-sm text-white/60 hover:text-white transition-colors relative group inline-block"
								>
									<span>Catálogo</span>
									<span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
								</Link>
							</li>
							<li>
								<Link
									href="/sobre-nosotros"
									className="text-sm text-white/60 hover:text-white transition-colors relative group inline-block"
								>
									<span>Sobre Nosotros</span>
									<span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
								</Link>
							</li>
							<li>
								<Link
									href="/contacto"
									className="text-sm text-white/60 hover:text-white transition-colors relative group inline-block"
								>
									<span>Contacto</span>
									<span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
								</Link>
							</li>
						</ul>
					</div>

					<div className="flex flex-col gap-4">
						<h3 className="text-sm font-semibold tracking-wider uppercase text-white/90 mb-2">
							Soporte
						</h3>
						<ul className="flex flex-col gap-3">
							<li>
								<Link
									href="/servicio-no-disponible"
									className="text-sm text-white/60 hover:text-white transition-colors relative group inline-block"
								>
									<span>Envíos y Devoluciones</span>
									<span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
								</Link>
							</li>
							<li>
								<Link
									href="/servicio-no-disponible"
									className="text-sm text-white/60 hover:text-white transition-colors relative group inline-block"
								>
									<span>FAQ</span>
									<span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
								</Link>
							</li>
							<li>
								<Link
									href="/servicio-no-disponible"
									className="text-sm text-white/60 hover:text-white transition-colors relative group inline-block"
								>
									<span>Términos y Condiciones</span>
									<span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
								</Link>
							</li>
							<li>
								<Link
									href="/servicio-no-disponible"
									className="text-sm text-white/60 hover:text-white transition-colors relative group inline-block"
								>
									<span>Políticas de Privacidad</span>
									<span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-4">
					<p className="text-xs text-white/50 text-center md:text-left">
						&copy; {new Date().getFullYear()} URBN VOID. Todos los derechos
						reservados.
					</p>
				</div>
			</div>
		</footer>
	);
}
