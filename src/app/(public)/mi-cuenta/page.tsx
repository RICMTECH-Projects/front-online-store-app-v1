import { PublicAccountProfile } from "@/modules/public/modules/account/components/PublicAccountProfile";

export default function PublicAccountPage() {
	return (
		<div className="mx-auto w-full max-w-4xl py-10 sm:py-14">
			<p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
				Cuenta
			</p>
			<h1 className="mt-2 font-antonio text-3xl font-semibold uppercase sm:text-4xl">
				Mi perfil
			</h1>
			<p className="mt-2 text-sm text-zinc-600">
				Consulta y actualiza la informacion personal de tu cuenta.
			</p>
			<PublicAccountProfile />
		</div>
	);
}
