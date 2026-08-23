import { AdminProfileForm } from "@/modules/admin/modules/profile/components/AdminProfileForm";

export default function AdminProfilePage() {
	return (
		<main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
			<p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
				Cuenta
			</p>
			<h1 className="mt-2 font-antonio text-3xl font-semibold uppercase sm:text-4xl">
				Perfil y configuracion
			</h1>
			<p className="mt-2 text-sm text-zinc-600">
				Consulta y actualiza la informacion asociada a tu cuenta.
			</p>
			<AdminProfileForm />
		</main>
	);
}
