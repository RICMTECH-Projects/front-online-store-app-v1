import Link from "next/link";
import { AUTH_ROUTES } from "@/modules/auth/constants/auth.const";
import { PublicAccountProfile } from "@/modules/public/modules/account/components/PublicAccountProfile";

export default function PublicAccountPage() {
	return (
		<div className="mx-auto w-full max-w-4xl py-10 sm:py-14">
			<p className="text-xs font-semibold uppercase tracking-label text-zinc-500">
				Cuenta
			</p>
			<h1 className="mt-2 font-antonio text-3xl font-semibold uppercase sm:text-4xl">
				Mi perfil
			</h1>
			<p className="mt-2 text-sm text-zinc-600">
				Consulta y actualiza la informacion personal de tu cuenta.
			</p>
			<div className="mt-6 flex flex-wrap items-center justify-between gap-3">
				<p className="text-sm text-zinc-600">
					Mantén segura tu cuenta cambiando tu contraseña.
				</p>
				<Link
					href={AUTH_ROUTES.accountSecurity}
					className="inline-flex min-h-11 items-center border border-zinc-300 bg-white px-4 text-sm font-medium text-zinc-800 transition-colors hover:border-zinc-950 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
				>
					Seguridad de la cuenta
				</Link>
				<Link
					href="/mi-cuenta/direcciones"
					className="inline-flex min-h-11 items-center border border-zinc-300 bg-white px-4 text-sm font-medium text-zinc-800 transition-colors hover:border-zinc-950 hover:text-zinc-950"
				>
					Mis direcciones
				</Link>
			</div>
			<PublicAccountProfile />
		</div>
	);
}
