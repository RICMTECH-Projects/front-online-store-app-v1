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
	const { form, retry, submittedEmail, handleSubmit } =
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
						description="Ingresa tu correo electronico y te enviaremos un enlace para restablecer tu contraseña."
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

						<button type="submit" className={AUTH_SUBMIT_CLASS}>
							Enviar enlace de recuperacion
						</button>
					</form>
				</FormProvider>
			) : (
				<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
					<div className="flex flex-col items-center text-center">
						<div className="mb-6 rounded-full bg-primary/10 p-4">
							<CheckCircle2 className="size-10 text-foreground" />
						</div>
						<h2 className="mb-3 font-anton text-2xl uppercase tracking-wide">
							Correo enviado
						</h2>
						<p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
							Hemos enviado un enlace de recuperacion a{" "}
							<span className="font-medium text-foreground">
								{submittedEmail}
							</span>
							. Revisa tu bandeja de entrada y sigue las instrucciones.
						</p>
						<p className="mt-4 text-xs text-muted-foreground/70">
							¿No recibiste el correo? Revisa tu carpeta de spam o{" "}
							<button
								type="button"
								onClick={retry}
								className="text-foreground underline underline-offset-4 transition-opacity hover:opacity-80"
							>
								intenta de nuevo
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
