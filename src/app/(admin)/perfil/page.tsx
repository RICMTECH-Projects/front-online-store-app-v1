import Link from "next/link";
import { AdminProfileForm } from "@/modules/admin/modules/profile/components/AdminProfileForm";
import { AUTH_ROUTES } from "@/modules/auth/constants/auth.const";

export default function AdminProfilePage() {
	return (
		<main className="mx-auto max-w-360 px-4 py-8 sm:px-6 lg:px-10">
			<p className="text-xs font-semibold uppercase tracking-label text-zinc-500">
				Cuenta
			</p>
			<h1 className="mt-2 font-antonio text-3xl font-semibold uppercase sm:text-4xl">
				Perfil y configuracion
			</h1>
			<div className="flex flex-wrap items-center justify-between gap-3">
				<p className="mt-2 text-sm text-zinc-600">
					Consulta y actualiza la información asociada a tu cuenta.
				</p>
				<Link
					href={AUTH_ROUTES.adminSecurity}
					className="inline-flex min-h-11 items-center border border-zinc-300 bg-white px-4 text-sm font-medium text-zinc-800 transition-colors hover:border-zinc-950 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
				>
					Seguridad de la cuenta
				</Link>
			</div>
			<AdminProfileForm />
		</main>
	);
}
