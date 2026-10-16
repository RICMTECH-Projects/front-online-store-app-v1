import Link from "next/link";

export default function SessionUnavailablePage() {
	return (
		<main className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col justify-center px-5 py-12 lg:px-0">
			<p className="text-xs font-semibold uppercase tracking-label text-zinc-500">
				URBNVOID · Cuenta
			</p>
			<h1 className="mt-3 font-antonio text-3xl font-semibold uppercase sm:text-4xl">
				No podemos validar tu sesión ahora
			</h1>
			<p className="mt-4 max-w-xl text-sm leading-6 text-zinc-600">
				El servicio de autenticación no respondió. Tu sesión se conserva; vuelve
				a intentarlo cuando el servicio esté disponible.
			</p>
			<Link
				href="/login"
				className="mt-8 inline-flex min-h-11 w-fit items-center bg-zinc-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
			>
				Volver a intentar
			</Link>
		</main>
	);
}
