"use client";

import { LoaderCircle, Save, UserRound } from "lucide-react";
import { FormInput } from "@/modules/shared/components/forms/FormInput";
import { Input } from "@/modules/shared/components/ui/input";
import { useAdminProfileForm } from "../hooks/useAdminProfileForm";

export const AdminProfileForm = () => {
	const { form, isPending, onSubmit, user } = useAdminProfileForm();

	if (!user) {
		return (
			<section
				aria-busy="true"
				aria-label="Cargando perfil"
				className="mt-8 min-h-72 max-w-3xl animate-pulse border border-zinc-200 bg-white p-6"
			>
				<div className="size-12 rounded-full bg-zinc-200" />
				<div className="mt-6 h-5 w-48 bg-zinc-200" />
				<div className="mt-4 h-11 bg-zinc-100" />
			</section>
		);
	}

	return (
		<section className="mt-8 max-w-3xl border border-zinc-200 bg-white">
			<div className="flex items-center gap-4 border-b border-zinc-200 p-6">
				<div className="inline-flex size-11 items-center justify-center rounded-full bg-zinc-950 text-white">
					<UserRound className="size-5" aria-hidden="true" />
				</div>
				<div className="min-w-0">
					<h2 className="font-antonio text-xl font-semibold uppercase">
						Informacion personal
					</h2>
					<p className="truncate text-sm text-zinc-500">{user.email}</p>
				</div>
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
							htmlFor="admin-profile-email"
							className="text-sm font-medium text-foreground"
						>
							Correo electronico
						</label>
						<Input
							id="admin-profile-email"
							type="email"
							value={user.email}
							readOnly
							aria-readonly="true"
							className="h-11 border-zinc-200 bg-zinc-50 text-zinc-500 shadow-none focus-visible:ring-0"
						/>
					</div>
				</div>

				<div className="flex justify-end border-t border-zinc-200 bg-zinc-50/70 p-6">
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
	);
};
