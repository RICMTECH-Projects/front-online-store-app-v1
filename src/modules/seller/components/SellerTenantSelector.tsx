"use client";

import { ArrowRight, Store } from "lucide-react";
import Link from "next/link";
import { eyebrow, title } from "../constants/seller-ui.constants";
import { useSellerTenantSelector } from "../hooks/use-seller-tenant-selector";
import { Loading } from "./Loading";
import { Problem } from "./Problem";

export function SellerTenantSelector() {
	const { tenants, selectionMessage, selectTenant, retry } =
		useSellerTenantSelector();
	if (tenants.isPending) return <Loading label="Buscando tus tiendas" />;
	if (tenants.isError)
		return (
			<Problem
				message="No pudimos consultar las tiendas vinculadas a tu cuenta."
				retry={retry}
			/>
		);
	if (tenants.data.length === 1) return <Loading label="Abriendo tu tienda" />;
	return (
		<section className="mx-auto w-full max-w-4xl py-12 sm:py-16">
			<p className={eyebrow}>URBNVOID · Portal vendedor</p>
			<h1 className={`${title} mt-3`}>Elige tu tienda</h1>
			<p className="mt-4 max-w-xl leading-7 text-zinc-600">
				Selecciona el catálogo que quieres administrar. Cada tienda mantiene sus
				propios datos y productos.
			</p>
			{selectionMessage && (
				<p
					className="mt-5 border-l-2 border-zinc-900 bg-zinc-100 p-3 text-sm text-zinc-700"
					role="status"
				>
					Tu acceso a la tienda anterior cambió. Elige una tienda autorizada
					para continuar.
				</p>
			)}
			{tenants.data.length === 0 ? (
				<div className="mt-9 border border-dashed border-zinc-300 p-8">
					<Store className="size-6 text-zinc-500" aria-hidden="true" />
					<h2 className="mt-4 text-lg font-semibold">
						No hay tiendas vinculadas
					</h2>
					<p className="mt-2 text-sm leading-6 text-zinc-600">
						Tu cuenta aún no tiene una membresía de vendedor activa. Solicita al
						administrador que te vincule a una tienda.
					</p>
					<Link
						className="mt-6 inline-flex min-h-11 items-center underline underline-offset-4"
						href="/"
					>
						Volver a la tienda
					</Link>
				</div>
			) : (
				<div className="mt-8 grid gap-4 md:grid-cols-2">
					{tenants.data.map((tenant) => (
						<button
							key={tenant.sellerId}
							type="button"
							onClick={() => void selectTenant(tenant.sellerId)}
							className="group flex min-h-32 flex-col items-start border border-zinc-300 bg-white p-5 text-left transition hover:border-zinc-950 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950"
						>
							<span className="flex w-full items-center justify-between">
								<span className="text-xs uppercase tracking-widest text-zinc-500">
									Tienda #{tenant.sellerId}
								</span>
								<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
							</span>
							<span className="mt-4 text-lg font-semibold text-zinc-950">
								{tenant.legalName}
							</span>
							<span className="mt-2 text-xs text-zinc-500">
								{tenant.owner ? "Propietario" : "Miembro autorizado"} ·{" "}
								{tenant.status === "ACTIVE"
									? "Activa"
									: "Inactiva · solo lectura"}
							</span>
						</button>
					))}
				</div>
			)}
		</section>
	);
}
