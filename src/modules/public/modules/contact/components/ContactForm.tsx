'use client';

import { Button } from '@/modules/shared/components/ui/button';
import { useContactForm } from '../hooks/useContactForm';
import { CheckCircle2Icon, SendIcon } from 'lucide-react';

const inputClassName =
	'w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground shadow-xs transition-colors placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none focus:ring-4 focus:ring-foreground/10';

export const ContactForm = () => {
	const { handleSubmit, resetSubmission, submitted } = useContactForm();

	return (
		<div className='rounded-lg border border-border bg-card p-5 shadow-sm sm:p-8 lg:p-10'>
			<div className='mb-8 max-w-2xl'>
				<p className='text-sm font-semibold uppercase tracking-widest text-muted-foreground'>
					Formulario
				</p>
				<h2 className='mt-3 font-anton text-3xl uppercase tracking-wide sm:text-4xl'>
					Envianos un mensaje
				</h2>
				<p className='mt-3 text-sm leading-6 text-muted-foreground sm:text-base'>
					Cuentanos que necesitas y agrega datos utiles como numero de pedido, talla o
					producto. Asi podremos responder con mayor precision.
				</p>
			</div>

			{submitted ? (
				<div className='rounded-lg border border-border bg-muted/40 p-6'>
					<div className='flex gap-4'>
						<div className='flex size-11 shrink-0 items-center justify-center rounded-lg bg-foreground text-background'>
							<CheckCircle2Icon className='size-5' aria-hidden='true' />
						</div>
						<div>
							<h3 className='text-base font-semibold text-foreground'>Mensaje recibido</h3>
							<p className='mt-2 text-sm leading-6 text-muted-foreground'>
								Gracias por escribirnos. El equipo de soporte revisara tu solicitud y
								respondera al correo indicado.
							</p>
							<button
								type='button'
								onClick={resetSubmission}
								className='mt-4 text-sm font-semibold text-foreground underline underline-offset-4'
							>
								Enviar otro mensaje
							</button>
						</div>
					</div>
				</div>
			) : (
				<form className='grid gap-6' onSubmit={handleSubmit}>
					<div className='grid gap-5 sm:grid-cols-2'>
						<div className='grid gap-2'>
							<label htmlFor='name' className='text-sm font-semibold text-foreground'>
								Nombre completo
							</label>
							<input
								type='text'
								id='name'
								name='name'
								autoComplete='name'
								className={inputClassName}
								placeholder='Juan Perez'
							/>
						</div>

						<div className='grid gap-2'>
							<label htmlFor='email' className='text-sm font-semibold text-foreground'>
								Email
							</label>
							<input
								type='email'
								id='email'
								name='email'
								autoComplete='email'
								className={inputClassName}
								placeholder='juan@ejemplo.com'
							/>
						</div>
					</div>

					<div className='grid gap-2'>
						<label htmlFor='subject' className='text-sm font-semibold text-foreground'>
							Asunto
						</label>
						<input
							type='text'
							id='subject'
							name='subject'
							className={inputClassName}
							placeholder='Cambio de talla, pedido especial, colaboracion...'
						/>
					</div>

					<div className='grid gap-2'>
						<label htmlFor='message' className='text-sm font-semibold text-foreground'>
							Mensaje
						</label>
						<textarea
							id='message'
							name='message'
							rows={6}
							className={`${inputClassName} resize-y`}
							placeholder='Escribe el detalle de tu consulta aqui.'
						/>
						<p className='text-xs leading-5 text-muted-foreground'>
							No compartas contrasenas ni datos completos de tarjeta por este formulario.
						</p>
					</div>

					<div className='flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between'>
						<p className='max-w-md text-sm leading-6 text-muted-foreground'>
							Al enviar, el equipo de soporte revisara tu solicitud y respondera al correo
							indicado.
						</p>
						<Button
							type='submit'
							size='lg'
							className='h-12 rounded-lg px-6 font-semibold uppercase tracking-wide'
						>
							<SendIcon className='size-4' aria-hidden='true' />
							Enviar mensaje
						</Button>
					</div>
				</form>
			)}
		</div>
	);
};
