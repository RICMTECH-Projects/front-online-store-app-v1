"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FormInput } from "@/modules/shared/components/forms/FormInput";
import { FormSelect } from "@/modules/shared/components/forms/FormSelect";
import { FormTextarea } from "@/modules/shared/components/forms/FormTextarea";
import { Button } from "@/modules/shared/components/ui/button";
import { eyebrow } from "../constants/seller-ui.constants";
import { useSellerProductForm } from "../hooks/use-seller-product-form";

export function SellerProductForm({
	sellerId,
	writable,
	onCreated,
}: {
	sellerId: number;
	writable: boolean;
	onCreated: (productId: number) => void;
}) {
	const {
		mutation,
		form,
		categories,
		onSubmit,
		categoryOptions,
		brandOptions,
	} = useSellerProductForm(sellerId, onCreated);
	return (
		<div className="max-w-3xl">
			<Link
				href={`/vendedor/${sellerId}/productos`}
				className="inline-flex min-h-10 items-center gap-2 text-sm underline underline-offset-4"
			>
				<ArrowLeft className="size-4" />
				Volver al catálogo
			</Link>
			<p className={`${eyebrow} mt-6`}>Nuevo producto</p>
			<h2 className="mt-2 text-3xl font-semibold">Prepara tu publicación</h2>
			<p className="mt-2 text-sm leading-6 text-zinc-600">
				El producto se guardará como borrador. No se crea inventario. SKU y slug
				deben ser únicos en todo el marketplace.
			</p>
			{categories.length === 0 && (
				<div className="mt-6 border-l-2 border-amber-500 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
					No hay categorías activas configuradas. El equipo debe cargar
					referencias reales para este entorno antes de habilitar el alta.
				</div>
			)}
			<form
				className="mt-7 grid gap-5 sm:grid-cols-2"
				onSubmit={onSubmit}
				noValidate
			>
				<div className="sm:col-span-2">
					<FormInput
						control={form.control}
						name="name"
						label="Nombre"
						disabled={!writable || mutation.isPending}
					/>
				</div>
				<FormInput
					control={form.control}
					name="sku"
					label="SKU"
					disabled={!writable || mutation.isPending}
				/>
				<FormInput
					control={form.control}
					name="slug"
					label="Slug de URL"
					disabled={!writable || mutation.isPending}
				/>
				<FormInput
					control={form.control}
					name="price"
					label="Precio (PEN)"
					type="number"
					min="0.01"
					step="0.01"
					disabled={!writable || mutation.isPending}
				/>
				<FormSelect
					control={form.control}
					name="categoryId"
					label="Categoría"
					disabled={!writable || mutation.isPending || categories.length === 0}
					options={categoryOptions}
					placeholder="Selecciona categoría"
				/>
				<FormSelect
					control={form.control}
					name="brandId"
					label="Marca (opcional)"
					disabled={!writable || mutation.isPending}
					emptyValue=""
					options={brandOptions}
					placeholder="Sin marca"
				/>
				<div className="sm:col-span-2">
					<FormTextarea
						control={form.control}
						name="description"
						label="Descripción (opcional)"
						rows={4}
						disabled={!writable || mutation.isPending}
					/>
				</div>
				<div className="sm:col-span-2">
					<FormInput
						control={form.control}
						name="imageUrl"
						label="URL de imagen principal (opcional)"
						type="url"
						placeholder="https://…"
						disabled={!writable || mutation.isPending}
					/>
				</div>
				<div className="sm:col-span-2">
					<Button
						type="submit"
						className="min-h-11"
						disabled={
							!writable || mutation.isPending || categories.length === 0
						}
					>
						{mutation.isPending ? "Guardando borrador…" : "Crear borrador"}
					</Button>
					<p className="mt-3 text-xs text-zinc-500">
						Después podrás activar la publicación desde su ficha. El stock se
						configura por separado.
					</p>
				</div>
			</form>
		</div>
	);
}
