import { UserRound } from "lucide-react";

export default function AdminProfilePage() {
	return (
		<main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
			<p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
				Cuenta
			</p>
			<h1 className="mt-2 font-antonio text-3xl font-semibold uppercase sm:text-4xl">
				Perfil y configuracion
			</h1>
			<section className="mt-8 max-w-2xl border border-zinc-200 bg-white p-6">
				<UserRound className="size-6 text-zinc-600" aria-hidden="true" />
				<h2 className="mt-5 font-antonio text-xl font-semibold uppercase">
					Preferencias de cuenta
				</h2>
				<p className="mt-2 text-sm leading-6 text-zinc-600">
					Las opciones de perfil estarán disponibles al incorporar el recurso de
					cuenta administrativa en el API.
				</p>
			</section>
		</main>
	);
}
