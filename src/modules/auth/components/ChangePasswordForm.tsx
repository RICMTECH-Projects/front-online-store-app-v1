"use client";

import { LoaderCircle, ShieldCheck } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { FormInput } from "@/modules/shared/components/forms/FormInput";
import { useChangePasswordForm } from "../hooks/useChangePasswordForm";

export const ChangePasswordForm = () => {
	const { form, isPending, onSubmit } = useChangePasswordForm();

	return (
		<FormProvider {...form}>
			<section className="mt-8 max-w-3xl border border-zinc-200 bg-white">
				<div className="flex items-center gap-4 border-b border-zinc-200 p-6">
					<div className="inline-flex size-11 items-center justify-center rounded-full bg-zinc-950 text-white">
						<ShieldCheck className="size-5" aria-hidden="true" />
					</div>
					<div>
						<h2 className="font-antonio text-xl font-semibold uppercase">
							Actualizar contraseña
						</h2>
						<p className="text-sm text-zinc-600">
							Usa tu contraseña actual para confirmar el cambio.
						</p>
					</div>
				</div>

				<form onSubmit={onSubmit} noValidate>
					<div className="grid gap-5 p-6">
						<FormInput
							control={form.control}
							id="current-password"
							name="currentPassword"
							label="Contraseña actual"
							type="password"
							autoComplete="current-password"
							className="h-11 border-zinc-300 bg-white focus-visible:border-zinc-950 focus-visible:ring-zinc-950/10"
						/>
						<FormInput
							control={form.control}
							id="new-password"
							name="newPassword"
							label="Nueva contraseña"
							type="password"
							autoComplete="new-password"
							className="h-11 border-zinc-300 bg-white focus-visible:border-zinc-950 focus-visible:ring-zinc-950/10"
						/>
						<FormInput
							control={form.control}
							id="confirm-new-password"
							name="confirmPassword"
							label="Confirmar nueva contraseña"
							type="password"
							autoComplete="new-password"
							className="h-11 border-zinc-300 bg-white focus-visible:border-zinc-950 focus-visible:ring-zinc-950/10"
						/>
						<p className="text-xs text-zinc-500">
							La contraseña debe tener entre 8 y 128 caracteres.
						</p>
						{form.formState.errors.root?.message && (
							<p role="alert" className="text-sm text-destructive">
								{form.formState.errors.root.message}
							</p>
						)}
					</div>

					<div className="flex justify-end border-t border-zinc-200 bg-zinc-50/70 p-6">
						<button
							type="submit"
							disabled={isPending}
							className="inline-flex min-h-11 items-center justify-center gap-2 bg-zinc-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						>
							{isPending && (
								<LoaderCircle
									className="size-4 animate-spin"
									aria-hidden="true"
								/>
							)}
							{isPending ? "Actualizando..." : "Actualizar contraseña"}
						</button>
					</div>
				</form>
			</section>
		</FormProvider>
	);
};
