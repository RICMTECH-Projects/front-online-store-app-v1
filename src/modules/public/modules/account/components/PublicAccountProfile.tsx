"use client";

import { LoaderCircle, LogOut, Save } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { useLogout } from "@/modules/auth/hooks/use-logout";
import { FormInput } from "@/modules/shared/components/forms/FormInput";
import { Input } from "@/modules/shared/components/ui/input";
import { useCustomerProfileForm } from "../hooks/useCustomerProfileForm";

export const PublicAccountProfile = () => {
	const { form, isPending, onSubmit, user } = useCustomerProfileForm();
	const logout = useLogout();

	if (!user) {
		return (
			<section
				aria-busy="true"
				aria-label="Cargando perfil"
				className="mt-8 min-h-64 animate-pulse border border-zinc-200 bg-white p-6"
			>
				<div className="size-16 rounded-full bg-zinc-200" />
				<div className="mt-6 h-6 w-48 bg-zinc-200" />
				<div className="mt-3 h-4 w-64 max-w-full bg-zinc-100" />
			</section>
		);
	}

	const initial = (user.firstName || user.email).trim().charAt(0).toUpperCase();
	const fullName = `${user.firstName} ${user.lastName}`.trim();

	return (
		<FormProvider {...form}>
			<section className="mt-8 border border-zinc-200 bg-white">
			<div className="flex flex-col gap-5 border-b border-zinc-200 p-6 sm:flex-row sm:items-center">
				<div className="inline-flex size-16 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-2xl font-semibold text-white">
					{initial}
				</div>
				<div className="min-w-0">
					<h2 className="truncate font-antonio text-2xl font-semibold uppercase">
						{fullName || "Usuario"}
					</h2>
					<p className="mt-1 truncate text-sm text-zinc-600">{user.email}</p>
				</div>
				<span className="w-fit border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-medium uppercase text-emerald-800 sm:ml-auto">
					{user.status}
				</span>
			</div>

			<form onSubmit={onSubmit} noValidate>
				<div className="grid gap-5 p-6 sm:grid-cols-2">
					<FormInput
						control={form.control}
						name="firstName"
						label="Nombre"
						autoComplete="given-name"
						className="h-11 border-zinc-300 bg-white focus-visible:border-zinc-950 focus-visible:ring-zinc-950/10"
					/>
					<FormInput
						control={form.control}
						name="lastName"
						label="Apellido"
						autoComplete="family-name"
						className="h-11 border-zinc-300 bg-white focus-visible:border-zinc-950 focus-visible:ring-zinc-950/10"
					/>
					<div className="flex flex-col gap-2 sm:col-span-2">
						<label
							htmlFor="profile-email"
							className="text-sm font-medium text-foreground"
						>
							Correo electronico
						</label>
						<Input
							id="profile-email"
							type="email"
							value={user.email}
							readOnly
							aria-readonly="true"
							className="h-11 border-zinc-200 bg-zinc-50 text-zinc-500 shadow-none focus-visible:ring-0"
						/>
					</div>
				</div>

				<div className="flex flex-col-reverse gap-3 border-t border-zinc-200 bg-zinc-50/70 p-6 sm:flex-row sm:items-center sm:justify-between">
					<button
						type="button"
						onClick={() => logout()}
						className="inline-flex h-10 items-center justify-center gap-2 border border-zinc-300 bg-white px-4 text-sm font-medium text-zinc-700 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700"
					>
						<LogOut className="size-4" aria-hidden="true" />
						Cerrar sesion
					</button>
					<button
						type="submit"
						disabled={isPending || !form.formState.isDirty}
						className="inline-flex h-10 items-center justify-center gap-2 bg-zinc-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{isPending ? (
							<LoaderCircle
								className="size-4 animate-spin"
								aria-hidden="true"
							/>
						) : (
							<Save className="size-4" aria-hidden="true" />
						)}
						Guardar cambios
					</button>
				</div>
			</form>
			</section>
		</FormProvider>
	);
};
