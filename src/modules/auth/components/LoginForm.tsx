"use client";

import Link from "next/link";
import { FormProvider } from "react-hook-form";
import {
	AUTH_FIELD_CLASS,
	AUTH_ROUTES,
	AUTH_SUBMIT_CLASS,
} from "@/modules/auth/constants/auth.const";
import { useLoginForm } from "@/modules/auth/hooks/useLoginForm";
import { FormInput } from "@/modules/shared/components/forms/FormInput";
import { AuthHeader } from "./AuthHeader";

export const LoginForm = () => {
	const { form, handleSubmit } = useLoginForm();

	return (
		<FormProvider {...form}>
			<AuthHeader
				title="Iniciar sesion"
				description="Ingresa tus credenciales para acceder a tu cuenta"
			/>

			<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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
					autoComplete="current-password"
					className={AUTH_FIELD_CLASS}
					placeholder="••••••••"
				/>

				<div className="flex justify-end">
					<Link
						href={AUTH_ROUTES.recoverPassword}
						className="text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
					>
						¿Olvidaste tu contraseña?
					</Link>
				</div>

				<button type="submit" className={`${AUTH_SUBMIT_CLASS} mt-1`}>
					Iniciar sesion
				</button>
			</form>

			<p className="mt-8 text-center text-sm text-muted-foreground">
				¿No tienes una cuenta?{" "}
				<Link
					href={AUTH_ROUTES.register}
					className="font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-80"
				>
					Registrate
				</Link>
			</p>
		</FormProvider>
	);
};
