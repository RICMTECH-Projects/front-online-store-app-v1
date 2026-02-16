'use client';

import { CustomInput } from '@/modules/shared/components/CustomInput/CustomInput';
import { CustomTextArea } from '@/modules/shared/components/CustomTextArea/CustomTextArea';
import { Button } from '@/modules/shared/components/ui/button';
import { FieldGroup } from '@/modules/shared/components/ui/field';
import { Separator } from '@/modules/shared/components/ui/separator';
import { useContactForm } from '../hooks/useContactForm';

export const ContactForm = () => {
	const { control, handleSubmit, isValid } = useContactForm();

	return (
		<form
			className='font-inter space-y-6'
			onSubmit={handleSubmit}>
			<header className='space-y-2'>
				<h2 className='text-3xl font-bold font-antonio'>Contáctanos</h2>
				<p className='text-sm text-muted-foreground'>
					Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.
					Estamos aquí para ayudarte.
				</p>
			</header>

			<Separator />

			<FieldGroup className='gap-4'>
				<CustomInput
					label='Nombre:'
					name='name'
					placeholder='Ingresa tu nombre'
					control={control}
				/>

				<CustomInput
					label='Email:'
					name='email'
					type='email'
					placeholder='Ingresa tu correo electrónico'
					control={control}
				/>

				<CustomInput
					label='Razón:'
					name='reason'
					placeholder='¿Cuál es el motivo de tu contacto?'
					control={control}
				/>

				<CustomTextArea
					control={control}
					label='Mensaje:'
					name='message'
					placeholder='Escribe tu mensaje aquí...'
				/>

				<Button
					type='submit'
					className='w-full h-12 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors cursor-pointer  disabled:cursor-not-allowed'
					disabled={!isValid}>
					Enviar
				</Button>
			</FieldGroup>
		</form>
	);
};
