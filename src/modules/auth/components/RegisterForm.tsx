"use client";

import Link from "next/link";
import { FormProvider } from "react-hook-form";
import {
	AUTH_FIELD_CLASS,
	AUTH_ROUTES,
	AUTH_SUBMIT_CLASS,
} from "@/modules/auth/constants/auth.const";
import { useRegisterForm } from "@/modules/auth/hooks/useRegisterForm";
import { FormInput } from "@/modules/shared/components/forms/FormInput";
import { AuthHeader } from "./AuthHeader";

export const RegisterForm = () => {
	const { form, handleSubmit } = useRegisterForm();

	return (
		<FormProvider {...form}>
			<AuthHeader
				title="Crear cuenta"
				description="Completa tus datos para registrarte"
			/>

			<form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
					<FormInput
						control={form.control}
						name="firstName"
						label="Nombre"
						type="text"
						id="firstName"
						autoComplete="given-name"
						className={AUTH_FIELD_CLASS}
						placeholder="Juan"
					/>

					<FormInput
						control={form.control}
						name="lastName"
						label="Apellido"
						type="text"
						id="lastName"
						autoComplete="family-name"
						className={AUTH_FIELD_CLASS}
						placeholder="Perez"
					/>
				</div>

				<FormInput
					control={form.control}
					name="email"
					label="Correo electronico"
					type="email"
					id="email"
					autoComplete="email"
					className={AUTH_FIELD_CLASS}
					placeholder="tu@correo.com"
				/>

				<FormInput
					control={form.control}
					id="password"
					name="password"
					label="Contraseña"
					type="password"
					autoComplete="new-password"
					className={AUTH_FIELD_CLASS}
					placeholder="Minimo 8 caracteres"
				/>

				<FormInput
					control={form.control}
					id="confirmPassword"
					name="confirmPassword"
					label="Confirmar contraseña"
					type="password"
					autoComplete="new-password"
					className={AUTH_FIELD_CLASS}
					placeholder="Repite tu contraseña"
				/>

				<button type="submit" className={AUTH_SUBMIT_CLASS}>
					Crear cuenta
				</button>
			</form>

			<p className="mt-8 text-center text-sm text-muted-foreground">
				¿Ya tienes una cuenta?{" "}
				<Link
					href={AUTH_ROUTES.login}
					className="font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-80"
				>
					Inicia sesion
				</Link>
			</p>
		</FormProvider>
	);
};
