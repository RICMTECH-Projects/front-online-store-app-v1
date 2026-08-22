"use client";

import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { FormProvider } from "react-hook-form";
import {
	AUTH_FIELD_CLASS,
	AUTH_ROUTES,
	AUTH_SUBMIT_CLASS,
} from "@/modules/auth/constants/auth.const";
import { useResetPasswordForm } from "@/modules/auth/hooks/useResetPasswordForm";
import { FormInput } from "@/modules/shared/components/forms/FormInput";
import { AuthHeader } from "./AuthHeader";

type ResetPasswordFormProps = {
	token?: string;
};

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
	const { form, handleSubmit, isCompleted, isPending } =
		useResetPasswordForm(token);

	if (isCompleted) {
		return (
			<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
				<div className="flex flex-col items-center text-center">
					<div className="mb-6 rounded-full bg-primary/10 p-4">
						<CheckCircle2 className="size-10 text-foreground" />
					</div>
					<h1 className="mb-3 font-anton text-2xl uppercase tracking-wide">
						Contraseña actualizada
					</h1>
					<p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
						Tu nueva contraseña ya está activa. Puedes iniciar sesión con ella.
					</p>
					<Link
						href={AUTH_ROUTES.login}
						className={`${AUTH_SUBMIT_CLASS} mt-8 flex items-center justify-center`}
					>
						Iniciar sesion
					</Link>
				</div>
			</div>
		);
	}

	return (
		<>
			<Link
				href={AUTH_ROUTES.login}
				className="group mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
			>
				<ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
				Volver a iniciar sesion
			</Link>

			<FormProvider {...form}>
				<AuthHeader
					title="Crear nueva contraseña"
					description="Usa una contraseña de al menos 8 caracteres que no hayas usado antes."
				/>

				<form
					className="flex flex-col gap-5"
					onSubmit={handleSubmit}
					noValidate
				>
					<FormInput
						control={form.control}
						name="password"
						label="Nueva contraseña"
						type="password"
						autoComplete="new-password"
						className={AUTH_FIELD_CLASS}
						placeholder="Minimo 8 caracteres"
					/>

					<FormInput
						control={form.control}
						name="confirmPassword"
						label="Confirmar nueva contraseña"
						type="password"
						autoComplete="new-password"
						className={AUTH_FIELD_CLASS}
						placeholder="Repite tu nueva contraseña"
					/>

					{form.formState.errors.root?.message && (
						<p className="text-sm text-destructive">
							{form.formState.errors.root.message}
						</p>
					)}

					<button
						type="submit"
						disabled={isPending}
						className={AUTH_SUBMIT_CLASS}
					>
						{isPending ? "Actualizando..." : "Actualizar contraseña"}
					</button>
				</form>
			</FormProvider>
		</>
	);
};
