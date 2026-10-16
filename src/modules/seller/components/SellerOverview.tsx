"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { eyebrow } from "../constants/seller-ui.constants";
import type { useSellerProfile } from "../hooks/use-seller-portal";

export function SellerOverview({
	profile,
	base,
}: {
	profile: NonNullable<ReturnType<typeof useSellerProfile>["data"]>;
	base: string;
}) {
	return (
		<div className="grid gap-4 md:grid-cols-2">
			<Link
				href={`${base}/productos`}
				className="border border-zinc-200 p-6 transition hover:border-zinc-950"
			>
				<p className={eyebrow}>Catálogo</p>
				<h2 className="mt-3 text-xl font-semibold">Gestiona tus productos</h2>
				<p className="mt-2 text-sm text-zinc-600">
					Consulta estados, imágenes y disponibilidad de publicación.
				</p>
				<span className="mt-5 inline-flex items-center gap-2 text-sm font-medium">
					Abrir catálogo <ArrowRight className="size-4" />
				</span>
			</Link>
			<Link
				href={`${base}/ordenes`}
				className="border border-zinc-200 p-6 transition hover:border-zinc-950"
			>
				<p className={eyebrow}>Fulfillment · OPE-06…08</p>
				<h2 className="mt-3 text-xl font-semibold">Prepara tus pedidos</h2>
				<p className="mt-2 text-sm text-zinc-600">
					Consulta tus líneas de venta y actualiza el estado de preparación y
					despacho.
				</p>
				<span className="mt-5 inline-flex items-center gap-2 text-sm font-medium">
					Ver órdenes <ArrowRight className="size-4" />
				</span>
			</Link>
			<Link
				href={`${base}/perfil`}
				className="border border-zinc-200 p-6 transition hover:border-zinc-950"
			>
				<p className={eyebrow}>Datos comerciales</p>
				<h2 className="mt-3 text-xl font-semibold">{profile.legalName}</h2>
				<p className="mt-2 text-sm text-zinc-600">
					RUC {profile.taxId} · {profile.email}
				</p>
				<span className="mt-5 inline-flex items-center gap-2 text-sm font-medium">
					Ver perfil <ArrowRight className="size-4" />
				</span>
			</Link>
		</div>
	);
}
