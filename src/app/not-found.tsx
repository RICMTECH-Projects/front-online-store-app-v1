import Link from "next/link";

export default function NotFoundPage() {
	return (
		<main className="flex min-h-screen items-center justify-center bg-white px-5 text-zinc-950">
			<section className="max-w-lg text-center">
				<p className="font-anton text-8xl leading-none">404</p>
				<p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
					Pagina no encontrada
				</p>
				<h1 className="mt-3 font-antonio text-3xl font-semibold uppercase sm:text-4xl">
					Esta ruta no existe
				</h1>
				<p className="mt-4 text-sm leading-6 text-zinc-600">
					La pagina que intentas abrir fue movida, eliminada o nunca existio.
				</p>
				<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
					<Link
						href="/"
						className="inline-flex h-11 items-center justify-center bg-zinc-950 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
					>
						Volver al inicio
					</Link>
					<Link
						href="/catalogo"
						className="inline-flex h-11 items-center justify-center border border-zinc-200 px-5 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-50"
					>
						Ver catalogo
					</Link>
				</div>
			</section>
		</main>
	);
}
