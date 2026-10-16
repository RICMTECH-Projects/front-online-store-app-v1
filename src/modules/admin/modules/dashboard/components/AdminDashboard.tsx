"use client";

import Link from "next/link";
import { useAdminDashboard } from "../hooks/use-admin-dashboard";

export const AdminDashboard = () => {
	const { cards, busy, failed, retry } = useAdminDashboard();

	return (
		<main className="mx-auto max-w-360 px-4 py-8 sm:px-6 lg:px-10">
			<p className="text-xs font-semibold uppercase tracking-label text-zinc-500">
				Panel operativo
			</p>
			<h1 className="mt-2 font-antonio text-3xl font-semibold uppercase sm:text-4xl">
				Centro de control
			</h1>
			<p className="mt-2 text-sm text-zinc-600">
				Resumen de recursos disponibles en el backend. No incluye métricas
				comerciales ni ventas, porque no existe contrato para esas cifras.
			</p>
			{failed && (
				<p
					role="alert"
					className="mt-5 border border-red-200 bg-white p-4 text-sm text-red-800"
				>
					No se pudieron cargar algunos conteos.{" "}
					<button type="button" onClick={retry} className="underline">
						Reintentar
					</button>
				</p>
			)}
			<section className="mt-8 grid grid-cols-1 gap-px border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
				{cards.map(({ label, value, href, icon: Icon, query }) => (
					<Link
						key={label}
						href={href}
						className="min-h-36 bg-white p-5 transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-950"
					>
						<Icon className="size-5 text-zinc-500" aria-hidden="true" />
						<p className="mt-8 text-3xl font-semibold">
							{query.isLoading || (busy && value === undefined)
								? "…"
								: (value ?? "—")}
						</p>
						<p className="mt-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
							{label}
						</p>
					</Link>
				))}
			</section>
			{failed && (
				<p className="mt-3 text-xs text-zinc-500">
					Cada total refleja el listado completo devuelto por su operación; el
					catálogo de productos cuenta solo activos.
				</p>
			)}
			<section className="mt-8 border border-zinc-200 bg-white p-6">
				<h2 className="font-antonio text-xl font-semibold uppercase">
					Accesos rápidos
				</h2>
				<div className="mt-4 flex flex-wrap gap-3">
					{[
						["Usuarios", "/usuarios"],
						["Roles", "/roles"],
						["Vendedores", "/vendedores"],
						["Productos", "/productos"],
						["Marcas", "/marcas"],
						["Categorías", "/categorias"],
						["Cupones", "/cupones"],
					].map(([label, href]) => (
						<Link
							key={href}
							href={href}
							className="min-h-10 border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-50"
						>
							{label}
						</Link>
					))}
				</div>
				<p className="mt-5 text-xs text-zinc-500">
					El backend no expone ventas, ingresos, tendencias ni pedidos recientes
					para el dashboard.
				</p>
			</section>
		</main>
	);
};
