import { CustomerAddresses } from "@/modules/public/modules/account/components/CustomerAddresses";

export default function CustomerAddressesPage() {
	return (
		<section className="mx-auto w-full max-w-6xl py-10 sm:py-14">
			<p className="text-xs font-semibold uppercase tracking-label text-zinc-500">
				Cuenta · Entregas
			</p>
			<h1 className="mt-2 font-antonio text-3xl font-semibold uppercase sm:text-4xl">
				Mis direcciones
			</h1>
			<p className="mt-2 text-sm text-zinc-600">
				Administra los destinos asociados a tu cuenta.
			</p>
			<CustomerAddresses />
		</section>
	);
}
