"use client";

import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import Link from "next/link";
import { FormProvider } from "react-hook-form";
import {
	AUTH_FIELD_CLASS,
	AUTH_ROUTES,
	AUTH_SUBMIT_CLASS,
} from "@/modules/auth/constants/auth.const";
import { usePasswordRecoveryForm } from "@/modules/auth/hooks/usePasswordRecoveryForm";
import { FormInput } from "@/modules/shared/components/forms/FormInput";
import { AuthHeader } from "./AuthHeader";

export const PasswordRecoveryForm = () => {
	const { form, retry, submittedEmail, handleSubmit, isPending } =
		usePasswordRecoveryForm();

	return (
		<>
			<Link
				href={AUTH_ROUTES.login}
				className="group mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
			>
				<ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
				Volver a iniciar sesion
			</Link>

			{!submittedEmail ? (
				<FormProvider {...form}>
					<AuthHeader
						title="Recuperar contraseña"
						description="Ingresa tu correo electrónico para registrar una solicitud de recuperación."
					/>

					<form
						className="flex flex-col gap-5"
						onSubmit={handleSubmit}
						noValidate
					>
						<FormInput
							control={form.control}
							name="email"
							label="Correo electronico"
							type="email"
							id="email"
							autoComplete="email"
							className={`${AUTH_FIELD_CLASS} pl-11`}
							placeholder="tu@correo.com"
							endAdornment={
								<Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
							}
						/>

						{form.formState.errors.root?.message && (
							<p role="alert" className="text-sm text-destructive">
								{form.formState.errors.root.message}
							</p>
						)}

						<button
							type="submit"
							disabled={isPending}
							className={`${AUTH_SUBMIT_CLASS} disabled:cursor-not-allowed disabled:opacity-50`}
						>
							{isPending ? "Enviando solicitud..." : "Solicitar recuperación"}
						</button>
					</form>
				</FormProvider>
			) : (
				<div
					role="status"
					aria-live="polite"
					className="animate-in fade-in slide-in-from-bottom-4 duration-500"
				>
					<div className="flex flex-col items-center text-center">
						<div className="mb-6 rounded-full bg-primary/10 p-4">
							<CheckCircle2 className="size-10 text-foreground" />
						</div>
						<h2 className="mb-3 font-anton text-2xl uppercase tracking-wide">
							Solicitud recibida
						</h2>
						<p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
							Registramos la solicitud para{" "}
							<span className="font-medium text-foreground">
								{submittedEmail}
							</span>
							. El backend todavía no tiene configurado el envío de correos, así
							que no llegará un enlace. Contacta a soporte para recuperar el
							acceso.
						</p>
						<p className="mt-4 text-xs text-muted-foreground/70">
							¿Necesitas ingresar otro correo?{" "}
							<button
								type="button"
								onClick={retry}
								aria-label="Ingresar otro correo electrónico"
								className="text-foreground underline underline-offset-4 transition-opacity hover:opacity-80"
							>
								Ingresar otro
							</button>
						</p>
					</div>
				</div>
			)}

			<p className="mt-10 text-center text-sm text-muted-foreground">
				¿No tienes una cuenta?{" "}
				<Link
					href={AUTH_ROUTES.register}
					className="font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-80"
				>
					Registrate
				</Link>
			</p>
		</>
	);
};
