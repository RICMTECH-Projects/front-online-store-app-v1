"use client";

import { AdminModuleHeader } from "@/modules/admin/components/header/AdminModuleHeader";
import { Button } from "@/modules/shared/components/ui/button";
import { Input } from "@/modules/shared/components/ui/input";

import { useShipmentsPage } from "../hooks/use-shipments-page";
import { ShipmentDetail } from "./ShipmentDetail";

export const ShipmentsPage = () => {
	const {
		changeSearch,
		retry,
		rawOrderId,
		orderId,
		invalidOrderId,
		shipment,
		searchValue,
		search,
	} = useShipmentsPage();

	return (
		<main className="mx-auto max-w-360 px-4 py-8 sm:px-6 lg:px-10">
			<AdminModuleHeader
				title="Envíos"
				description="Consulta y administra tracking global de una orden conocida. El checkout crea el envío automáticamente."
				actionLabel="Nuevo envío"
				showAction={false}
			/>
			<form
				onSubmit={search}
				className="grid gap-3 border border-zinc-200 bg-white p-4 sm:grid-cols-[minmax(0,24rem)_auto] sm:items-end"
			>
				<label htmlFor="shipment-order-id" className="text-sm font-medium">
					ID de orden
					<Input
						id="shipment-order-id"
						value={searchValue}
						onChange={changeSearch}
						type="number"
						min="1"
						step="1"
						placeholder="Ej. 81"
						className="mt-2 h-11 w-full border border-zinc-300 px-3"
					/>
				</label>
				<Button type="submit" className="min-h-11">
					Consultar envío
				</Button>
			</form>
			<p className="mt-3 text-xs leading-5 text-zinc-500">
				No existe API para listar todos los envíos ni buscar por número de
				orden. Usa el ID que recibiste en checkout o que aparece en fulfillment.
			</p>
			{invalidOrderId && (
				<p
					role="alert"
					className="mt-5 border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950"
				>
					Ingresa un ID de orden entero y positivo.
				</p>
			)}
			{!rawOrderId && (
				<div className="mt-6 border border-dashed border-zinc-300 p-8">
					<h2 className="font-semibold">Consulta pendiente</h2>
					<p className="mt-2 text-sm text-zinc-600">
						La API requiere el ID de una orden concreta.
					</p>
				</div>
			)}
			{orderId !== undefined && shipment.isPending && (
				<p role="status" className="mt-6 border bg-white p-6 text-sm">
					Consultando envío de orden #{orderId}…
				</p>
			)}
			{orderId !== undefined && shipment.isError && (
				<div
					role="alert"
					className="mt-6 border border-red-200 bg-white p-6 text-sm text-red-800"
				>
					No existe envío accesible para esa orden o falló la consulta.{" "}
					<button type="button" onClick={retry} className="underline">
						Reintentar
					</button>
				</div>
			)}
			{shipment.data && orderId !== undefined && (
				<ShipmentDetail
					key={shipment.data.id}
					orderId={orderId}
					shipment={shipment.data}
					refresh={() => void shipment.refetch()}
					refreshing={shipment.isFetching}
				/>
			)}
		</main>
	);
};
