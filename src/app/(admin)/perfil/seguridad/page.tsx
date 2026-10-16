import Link from "next/link";
import { ChangePasswordForm } from "@/modules/auth";
import { AUTH_ROUTES } from "@/modules/auth/constants/auth.const";

export default function AdminSecurityPage() {
	return (
		<main className="mx-auto max-w-360 px-4 py-8 sm:px-6 lg:px-10">
			<Link
				href={AUTH_ROUTES.adminProfile}
				className="text-sm text-zinc-600 underline underline-offset-4 transition-colors hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-4"
			>
				Volver al perfil
			</Link>
			<p className="mt-8 text-xs font-semibold uppercase tracking-label text-zinc-500">
				Seguridad
			</p>
			<h1 className="mt-2 font-antonio text-3xl font-semibold uppercase sm:text-4xl">
				Contraseña
			</h1>
			<p className="mt-2 text-sm text-zinc-600">
				Actualiza la contraseña de acceso a tu cuenta administrativa.
			</p>
			<ChangePasswordForm />
		</main>
	);
}
