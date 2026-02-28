'use client';

import { CONTACT_ITEMS } from '@/modules/public/modules/contact/constants/contact.const';
import Image from 'next/image';

const ContactPage = () => {
	return (
		<main className="w-full font-inter pb-16">
			<div className="relative w-full aspect-[21/9] sm:aspect-[4/1] overflow-hidden">
				<Image
					src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2000&auto=format&fit=crop"
					alt="Contacto"
					fill
					priority
					className="object-cover object-center"
				/>
				<div className="absolute inset-0 bg-black/60" />

				<div className="relative z-10 flex h-full flex-col items-center justify-center text-center p-4">
					<h1 className="text-3xl sm:text-5xl lg:text-6xl font-anton text-white tracking-wide animate-in fade-in slide-in-from-bottom-4 duration-700">
						CONTACTO
					</h1>
					<p className="mt-4 sm:max-w-xl mx-auto text-sm sm:text-base text-white/90 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-forwards opacity-0">
						¿Dudas, pedidos especiales o colaboraciones? Estamos listos para ayudarte. Escríbenos y te responderemos lo antes posible.
					</p>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-20 mt-12 sm:mt-16">
				<div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
					
					<div className="lg:col-span-2 flex flex-col gap-8">
						<div className="grid gap-4">
							{CONTACT_ITEMS.map((item) => {
								const Icon = item.icon;
								return (
									<div
										key={item.id}
										className="group flex items-center p-6 gap-6 rounded-2xl bg-muted/30 border border-border hover:border-foreground transition-all duration-300 hover:shadow-md"
									>
										{Icon && (
											<div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300 shrink-0">
												<Icon className="size-6" />
											</div>
										)}
										<div className="flex flex-col">
											<span className="font-anton tracking-wide text-sm text-muted-foreground uppercase">
												{item.label}
											</span>
											<span className="font-medium text-foreground mt-1">
												{item.label === 'WhatsApp' ? '+51 987 654 321' : 
                                                 item.label === 'Correo' ? 'soporte@tienda.com' : 
                                                 'Avenida Siempre Viva 123'}
											</span>
										</div>
									</div>
								);
							})}
						</div>

						<div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-border shadow-sm">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15613.275128802245!2d-77.0682714371588!3d-11.95241681243181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105d1d56067e44d%3A0x928f4c1ead15d0cf!2sVilla%20Sol%2C%20Comas%2015311!5e0!3m2!1ses-419!2spe!4v1771216773839!5m2!1ses-419!2spe"
								allowFullScreen={true}
								className="w-full h-full"
								loading="lazy"
							></iframe>
						</div>
					</div>

					<div className="lg:col-span-3 bg-card border border-border sm:p-10 p-6 flex flex-col justify-center">
						<div className="mb-8">
							<h2 className="text-3xl font-anton tracking-wide">ENVÍANOS UN MENSAJE</h2>
							<p className="text-muted-foreground mt-2 text-sm sm:text-base font-inter">
								Escríbenos y te responderemos lo antes posible.
							</p>
						</div>

						<form className="flex flex-col gap-6 font-inter">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
								<div className="flex flex-col gap-2">
									<label htmlFor="name" className="text-sm font-medium text-foreground">Nombre completo</label>
									<input 
										type="text" 
										id="name" 
										className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
										placeholder="Juan Pérez"
									/>
								</div>

								<div className="flex flex-col gap-2">
									<label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
									<input 
										type="email" 
										id="email" 
										className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
										placeholder="juan@ejemplo.com"
									/>
								</div>
							</div>
							
							<div className="flex flex-col gap-2">
								<label htmlFor="subject" className="text-sm font-medium text-foreground">Asunto</label>
								<input 
									type="text" 
									id="subject" 
									className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
									placeholder="¿En qué te podemos ayudar?"
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label htmlFor="message" className="text-sm font-medium text-foreground">Mensaje</label>
								<textarea 
									id="message" 
									rows={5}
									className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50 resize-none"
									placeholder="Escribe tu mensaje aquí..."
								></textarea>
							</div>

							<button 
								type="button"
								className="mt-4 px-8 py-3 bg-foreground text-background font-medium hover:opacity-90 transition-opacity w-full sm:w-auto self-start"
							>
								Enviar mensaje
							</button>
						</form>
					</div>
					
				</div>
			</div>
		</main>
	);
};

export default ContactPage;
