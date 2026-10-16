"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SellerOrderDetail, SellerOrdersList } from "@/modules/fulfillment";
import { eyebrow } from "../constants/seller-ui.constants";
import { useSellerWorkspace } from "../hooks/use-seller-workspace";
import { Loading } from "./Loading";
import { Problem } from "./Problem";
import { SellerOverview } from "./SellerOverview";
import { SellerProductDetail } from "./SellerProductDetail";
import { SellerProductForm } from "./SellerProductForm";
import { SellerProductList } from "./SellerProductList";
import { SellerProfileForm } from "./SellerProfileForm";
import { WorkspaceLink } from "./WorkspaceLink";

export function SellerWorkspace({
	section = "overview",
}: {
	section?:
		| "overview"
		| "profile"
		| "products"
		| "orders"
		| "order"
		| "new-product"
		| "product";
}) {
	const {
		switchTenant,
		onCreated,
		retryProfile,
		owner,
		sellerId,
		productId,
		orderId,
		profile,
		writable,
		base,
	} = useSellerWorkspace();
	if (!Number.isInteger(sellerId) || sellerId < 1)
		return (
			<section className="py-12">
				<Problem message="El identificador de tienda no es válido." />
				<Link className="mt-5 inline-block underline" href="/vendedor">
					Volver a seleccionar tienda
				</Link>
			</section>
		);
	if (profile.isPending)
		return <Loading label="Validando acceso a la tienda" />;
	if (profile.isError || !profile.data)
		return (
			<section className="py-12">
				<Problem
					message="No pudimos abrir esta tienda. Puede que ya no tengas acceso."
					retry={retryProfile}
				/>
				<Link
					className="mt-5 inline-flex min-h-11 items-center gap-2 underline underline-offset-4"
					href="/vendedor"
				>
					<ArrowLeft className="size-4" />
					Elegir otra tienda
				</Link>
			</section>
		);

	return (
		<section className="mx-auto w-full max-w-6xl py-8 sm:py-12">
			<div className="flex flex-col gap-5 border-b border-zinc-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<button
						type="button"
						onClick={() => void switchTenant()}
						className="mb-5 inline-flex min-h-10 items-center gap-2 text-sm text-zinc-600 hover:text-zinc-950"
					>
						<ArrowLeft className="size-4" />
						Cambiar de tienda
					</button>
					<p className={eyebrow}>Portal vendedor · Tienda #{sellerId}</p>
					<h1 className="mt-2 font-antonio text-3xl font-semibold uppercase sm:text-4xl">
						{profile.data.legalName}
					</h1>
					<p className="mt-2 text-sm text-zinc-600">
						{owner ? "Propietario" : "Miembro autorizado"} ·{" "}
						{writable ? "Tienda activa" : "Tienda inactiva"}
					</p>
				</div>
				<nav
					aria-label="Secciones de vendedor"
					className="flex flex-wrap gap-2 text-sm"
				>
					<WorkspaceLink href={base} active={section === "overview"}>
						Resumen
					</WorkspaceLink>
					<WorkspaceLink
						href={`${base}/productos`}
						active={section === "products" || section === "product"}
					>
						Productos
					</WorkspaceLink>
					<WorkspaceLink
						href={`${base}/ordenes`}
						active={section === "orders" || section === "order"}
					>
						Órdenes
					</WorkspaceLink>
					<WorkspaceLink href={`${base}/perfil`} active={section === "profile"}>
						Perfil comercial
					</WorkspaceLink>
				</nav>
			</div>
			{!writable && (
				<p
					className="mt-6 border-l-2 border-amber-500 bg-amber-50 p-4 text-sm text-amber-950"
					role="status"
				>
					La tienda está inactiva. Puedes consultar su información, pero el
					backend rechazará cambios de catálogo hasta que sea activada.
				</p>
			)}
			<div className="pt-8">
				{section === "profile" && (
					<SellerProfileForm
						sellerId={sellerId}
						profile={profile.data}
						writable={writable}
					/>
				)}
				{section === "products" && <SellerProductList sellerId={sellerId} />}
				{section === "orders" && <SellerOrdersList sellerId={sellerId} />}
				{section === "order" && (
					<SellerOrderDetail sellerId={sellerId} orderId={orderId} />
				)}
				{section === "new-product" && (
					<SellerProductForm
						sellerId={sellerId}
						writable={writable}
						onCreated={onCreated}
					/>
				)}
				{section === "product" && (
					<SellerProductDetail
						sellerId={sellerId}
						productId={productId}
						writable={writable}
					/>
				)}
				{section === "overview" && (
					<SellerOverview profile={profile.data} base={base} />
				)}
			</div>
		</section>
	);
}
